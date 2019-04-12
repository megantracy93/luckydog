const { google } = require('googleapis');
const keys = require('../../config/keys');
var URL = require('url').URL;

async function getTransportAnimals(transportSheetURL, currentUser) {
  const transportSheetId = getTransportSheetId(transportSheetURL);
  const auth = await getAuth(currentUser);
  const sheets = google.sheets({version: 'v4', auth});
  const {dogNames, catNames} = await getAnimalNames(sheets, transportSheetId);
  const dogs = await getDogNamesWithBios(sheets, dogNames);
  const cats = await getCatNamesWithBios(sheets, catNames);
  return {
    dogs,
    cats
  };
}

// Expected URL format: https://docs.google.com/spreadsheets/d/<desired_id>/etc
function getTransportSheetId(url) {
  const transportSheetURL = url && new URL(url);
  const transportSheetPath = transportSheetURL && transportSheetURL.pathname;
  const transportSheetPathParts = transportSheetPath && transportSheetPath.split('/');
  return transportSheetPathParts && transportSheetPathParts.length > 4 ? transportSheetPathParts[3] : null;
}

async function getAuth({accessToken, refreshToken}) {
  const oAuth2Client = new google.auth.OAuth2(
    keys.googleClientID, keys.googleClientSecret, keys.redirectDomain);
  // await oAuth2Client.getToken(currentUser.authCode).then(tokenResponse => {
  //   console.log(tokenResponse);
  //   oAuth2Client.setCredentials(tokenResponse.tokens);
  // }).catch(err => {
  //   console.log(err);
  // })
  oAuth2Client.setCredentials({accessToken, refresh_token: refreshToken});
  return oAuth2Client;
}

function getAnimalNames(sheets, transportSheetId) {
  return new Promise(
    (resolve, reject) => {
      sheets.spreadsheets.values.get({
        spreadsheetId: transportSheetId,
        range: `'Transport Sheet'!A4:D`,
      }, (err, res) => {
        if (err) return reject(err);
        const rows = res.data.values;
        if (rows.length) {
          // Grab all rows where the 2nd column has a name and the 1st column is an ID
          const validAnimals = rows.filter(row => row[1] && row[0].split('-').length > 2);
          // Grab all IDs for dogs (i.e. HERT-FD-1234, FLRN-MD-1234) that aren't adopted
          const dogNames = validAnimals.filter(row => {
            const isDog = row[0].split('-')[1].includes('D');
            const isAdopted = row[3] && row[3].includes('ADOPTED');
            return isDog && !isAdopted;
          }).map(row => row[1]);
          // Grab all IDs for cats (i.e. HERT-FC-1234, FLRN-MC-1234) that aren't adopted
          const catNames = validAnimals.filter(row => {
            const isCat = row[0].split('-')[1].includes('C');
            const isAdopted = row[3] && row[3].includes('ADOPTED');
            return isCat && !isAdopted;
          }).map(row => row[1]);
          resolve({dogNames, catNames});
        } else {
          console.log('No data found.');
          resolve({});
        }
      });
    }
  );
}

const DOG_LIST = {
  spreadsheetId: '1qaMlqIx-LoBovZLiJiwuGaLKDtZbHWlnAgHDswDZgOk',
  range: `'DOGS HERE'!A2:C`,
};

function getDogNamesWithBios(sheets, dogNames) {
  return getNamesWithBios(sheets, DOG_LIST, dogNames);
}

const CAT_LIST = {
  spreadsheetId: '15RJB173ecv--qlTJlVtDPUxzwMVrz7Y8Aq8QmTidgzU',
  range: `'CATS Here'!A2:C`,
};

function getCatNamesWithBios(sheets, catNames) {
  return getNamesWithBios(sheets, CAT_LIST, catNames);
}

function getNamesWithBios(sheets, sheetValue, names) {
  return new Promise(
    (resolve, reject) => {
      sheets.spreadsheets.values.get(sheetValue, (err, res) => {
        if (err) return reject(err);
        const rows = res.data.values;
        if (rows.length) {
          const namesWithBios = getNamesWithBiosFromRows(rows, names);
          namesWithBios.sort((a, b) => {
            return ('' + a[0]).localeCompare(b[0]);
          });
          resolve(namesWithBios);
        } else {
          console.log('No data found.');
          resolve({});
        }
      });
    }
  );
}

function getNamesWithBiosFromRows(rows, names) {
  const matches = rows.filter(row => row[0] && names.includes(row[0])).map(row => [row[0], row[2] || '']);
  const matchedNames = matches.map(match => match[0]);
  const missedMatches = names.filter(name => !matchedNames.includes(name)).map(name => [name, '']);
  if (missedMatches.length > 0) {
    matches.push(...missedMatches);
  }
  return matches;
}

module.exports = getTransportAnimals

