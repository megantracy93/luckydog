
var fs = require('fs');
var PropertiesReader = require('properties-reader');
var Q = require('q');
var { ecPhoneNumbers, boardingInfo } = require('./constants');

function generateEmail() {
  return getDogList()
    .then(dogInfo => getEmail(dogInfo));
}

function getDogList() {
  var deferred = Q.defer();
  fs.readFile('./src/resources/dogs.txt', function(err, data) {
    if(err) { deferred.reject('error reading dogs'); }
    const allLines = data.toString().split(/\r\n|\n/);
    let dogList = '';
    allLines.forEach((value, index) => {
      if (index % 2 === 0) {
        dogList = `${dogList}<li>${value}</li>`;
      } else {
        dogList = `${dogList}<a href="${value}">${value}</a><br>`;
      }
    });
    deferred.resolve(dogList);
  });
  return deferred.promise;
}

function getEmail(dogList) {
  var deferred = Q.defer();
  const properties = PropertiesReader('./src/resources/event.properties');
  fs.readFile('./src/resources/email.html', function(err, data) {
    if(err) { deferred.reject('error reading email'); }
    let template = data.toString();
    properties.each((key, value) => {
      const regex = new RegExp('\\$'+key, 'g');
      template = template.replace(regex, value);
    });
    const thisBoardingInfo = boardingInfo[properties.get('boardingKey')];
    Object.keys(thisBoardingInfo).forEach(function(key) {
      const regex = new RegExp('\\$'+key, 'g');
      template = template.replace(regex, thisBoardingInfo[key]);
    });
    template = template.replace(/\$ecPhoneNumber/g, ecPhoneNumbers[properties.get('ecName')]);
    template = template.replace(/\$dogList/g, dogList);
    deferred.resolve(template);
  });
  return deferred.promise;
}

module.exports = generateEmail

