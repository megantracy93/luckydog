const PropertiesReader = require('properties-reader');
const readFile = require('../../shared/js/readFile');
const HtmlBuidler = require('../../shared/js/htmlBuilder');
const EmailBuilder = require('../../shared/js/EmailBuilder');
const Papa = require('papaparse');

const RESOURCES_DIR = './pa-meet/resources';
const NUM_DOG_EVENTS = 2;
const CAT_ONLY_EVENT_INDEX = null;
const COMBINED_CAT_INDEX = 1;

function generateEmail() {
  return readFile('pa-meet', 'dogshere.csv', generateAttendanceTables)
    .then(dogAttendanceTables => readFile('pa-meet', 'catshere.csv', generateAttendanceTablesCatFn(dogAttendanceTables)))
    .then(allTables => readFile('pa-meet', 'eventTemplate.html', getGenerateEventInfoFn(allTables)))
    .then(eventInfo => readFile('pa-meet', 'emailTemplate.html', getGenerateEmailFn(eventInfo)));
}

function generateAttendanceTables(data) {
  const rawTable = Papa.parse(data.toString()).data;
  const thisthing = rawTable[0].indexOf('EVENT NOTES');
  console.log(thisthing);
  const indices = [thisthing+1, thisthing+4];
  const numEvents = NUM_DOG_EVENTS; //getNumEvents(indices);
  const dogAttendenceLists = [];
  for(i = 0; i < numEvents; i++) {
    dogAttendenceLists.push([rawTable[0][indices[0]+i]]);
  }
  rawTable.every((dog, i) => {
    if (i === 0) { // skip the header
      return true;
    }
    for (index = 0; index < numEvents; index++) {
      const rsvp = dog[indices[0]+index].trim();
      if (rsvp && rsvp.toLowerCase() !== 'no') {
        const name = dog[1];
        const nameSplitForPuppies = name.split(': ');
        const otherNameSplit = name.split(' + ');
        if (nameSplitForPuppies.length > 1) {
          const nameSplitForShots = nameSplitForPuppies[1].split(' (');
          const shots = '(' + (nameSplitForShots[1] || '2 shots)');
          const puppies = nameSplitForShots[0].split(', ');
          puppies.forEach(puppy => dogAttendenceLists[index].push({name: `${puppy} ${shots}`, linkToBio: 'puppy link'}));
        } else if (otherNameSplit.length > 1) {
          otherNameSplit.forEach(puppy => dogAttendenceLists[index].push({name: puppy, linkToBio: 'puppy link'}));
        } else {
          const linkToBioSplit = dog[0].split('\n');
          const linkToBio = linkToBioSplit[linkToBioSplit.length-1];
          dogAttendenceLists[index].push({name: name.split(' (HW)')[0], linkToBio});
        }
      }
    }
    return true;
  });
  return dogAttendenceLists.map((list, i) => buildTable('Dog', HtmlBuidler.new().table(), list));
}

function generateAttendanceTablesCatFn(dogTable) {
  return (data) => {
    if (!data) {
      const table = dogTable.map(table => table.endTable().build());
      return table;
    }
    const rawTable = Papa.parse(data.toString()).data;
    const numEvents = 1//getNumEvents(indices);
    const catAttendenceLists = [["Cat"]];
    rawTable.every((dog, i) => {
      if (i === 0) { // skip the header
        return true;
      }
      if (dog[0] == "RSVP NEEDED") { // stop traversing when we reach animals that can't come
        return false;
      }
      if (!dog[2]) { // skip rows with no animal info
        return true;
      }
      for (index = 0; index < numEvents; index++) {
        const name = dog[1];
        const nameSplitForPuppies = name.split(': ');
        const otherNameSplit = name.split(' + ');
        const otherotherNameSplit = name.split(' & ');
        if (nameSplitForPuppies.length > 1) {
          const nameSplitForShots = nameSplitForPuppies[1].split(' (');
          const shots = '(' + (nameSplitForShots[1] || '2 shots)');
          const puppies = nameSplitForShots[0].split(', ');
          puppies.forEach(puppy => catAttendenceLists[index].push({name: `${puppy} ${shots}`, linkToBio: 'puppy link'}));
        } else if (otherNameSplit.length > 1) {
          otherNameSplit.forEach(puppy => catAttendenceLists[index].push({name: puppy, linkToBio: 'puppy link'}));
        } else if (otherotherNameSplit.length > 1) {
          otherotherNameSplit.forEach(puppy => catAttendenceLists[index].push({name: puppy, linkToBio: 'puppy link'}));
        } else {
          const linkToBioSplit = dog[0].split('\n');
          const linkToBio = linkToBioSplit[linkToBioSplit.length-1];
          catAttendenceLists[index].push({name: name.split(' (HW)')[0], linkToBio});
        }
      }
      return true;
    });
    if (CAT_ONLY_EVENT_INDEX) {
      dogTable.splice(CAT_ONLY_EVENT_INDEX, 0, buildTable('Cat', HtmlBuidler.new().table(), catAttendenceLists[0]));
      return dogTable.map(table => table.endTable().build());
    } else {
      return dogTable.map((table, i) => {
        if (i === COMBINED_CAT_INDEX) {
          return buildTable('Cat', table, catAttendenceLists[0]).endTable().build()
        }
        return table.endTable().build();
      });
    }
  }
}

function getNumEvents(indices) {
  let num = 0;
  let i = indices[0];
  while(i < indices[indices.length-1]) {
    num++;
    i++;
  }
  return num;
}

function buildTable(label, htmlBuilder, dogAttendenceList) {
  htmlBuilder.tableHeader([label, 'Link to bio']);
  dogAttendenceList = dogAttendenceList.slice(1, dogAttendenceList.length); // first element is event key
  dogAttendenceList.sort((a, b) => {
    return ('' + a.name).localeCompare(b.name);
  });
  dogAttendenceList.forEach((value, i) => {
    const bio = value.linkToBio ? HtmlBuidler.new().link(value.linkToBio).build() : 'Bio not yet posted online';
    htmlBuilder.tableRow([value.name, bio]);
  });
  return htmlBuilder;
}

function getGenerateEventInfoFn(dogAttendanceTables) {
  const properties = PropertiesReader(`${RESOURCES_DIR}/events.properties`);
  return (data) => {
    return dogAttendanceTables.map((animalTable, i) => {
      let emailBuilder = EmailBuilder.new(data.toString());
      properties.each((key, value) => {
        const keyParts = key.split('.');
        if (keyParts[0] == i+1) {
          emailBuilder.replaceKey(keyParts[1], value);
          if (keyParts[1] === 'dayOfWeek') {
            emailBuilder.replaceKey('time', value == 'Saturday' ? '12-2pm' : '12-3pm');
          }
        }
        if (keyParts[0] == 'cat' && i == CAT_ONLY_EVENT_INDEX) {
          emailBuilder.replaceKey(keyParts[1], value);
          if (keyParts[1] === 'dayOfWeek') {
            emailBuilder.replaceKey('time', value == 'Saturday' ? '12-2pm' : '12-3pm');
          }
        }
      });
      emailBuilder.replaceKey('animalTable', animalTable);
      return emailBuilder.build();
    });
  }
}

function getGenerateEmailFn(eventInfo) {
  return (data) => {
    let emailBuilder = EmailBuilder.new(data.toString());
    emailBuilder.replaceKey('eventInfo', eventInfo);
    return emailBuilder.build();
  };
}

module.exports = generateEmail

