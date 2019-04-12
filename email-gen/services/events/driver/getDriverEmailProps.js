const mongoose = require('mongoose');
const { boardingInfo } = require('./constants');
const ecPhoneNumberSchema = require('../../../models/PhoneNumbers');
const { google } = require('googleapis');
const keys = require('../../../config/keys');
const getDogImageSource = require('../getDogImageSource');

async function getDriverEmailProps(props, currentUser) {
  const ecPhoneNumber = await getPhoneNumber(props['ecName']);
  const thisBoardingInfo = boardingInfo[props['boardingFacility']];
  const configurableBoaringInfo = {
    timeArriveNote: thisBoardingInfo['timeArriveNote'](props['dayOfWeek']),
    timeCommitmentNote: thisBoardingInfo['timeCommitmentNote'](props['dayOfWeek'])
  };
  const date = getDate(props['dayOfWeek']);
  const subject = getSubjectLine(props);
  const auth = await getAuth(currentUser);
  const dogsList = props['dogs'] ? await createDogsList(auth, props['dogs'].split('  ').map(name => name.toLowerCase())) : [];
  const dogImages = await getDogImages(dogsList);
  return {
    ...props,
    ...thisBoardingInfo,
    ...configurableBoaringInfo,
    date,
    ecPhoneNumber,
    subject,
    dogImages,
    dogsList: JSON.stringify(dogsList)
  };
}

function getDate(dayOfWeek) {
  const today = new Date();
  const desiredDay = dayOfWeek === 'Saturday' ? 6 : 0;
  const calculatedDate = today.getDate() + (desiredDay+(7-today.getDay()))%7;
  today.setDate(calculatedDate);
  const options = {month: 'long', day: 'numeric'};
  return today.toLocaleDateString('en-US', options) + getDateEnding(calculatedDate);
}

function getDateEnding(date) {
  switch (date) {
    case 1:
    case 21:
    case 31:
      return 'st';
    case 2:
    case 22:
      return 'nd';
    case 3:
    case 23:
      return 'rd';
    default:
      return 'th';
  }
}

async function getPhoneNumber(ecName) {
  const ecPhoneNumbers = mongoose.model('phone-numbers', ecPhoneNumberSchema);
  const ecsFound  = await ecPhoneNumbers.find({name: ecName});
  return ecsFound[0] ? ecsFound[0].phoneNumber : 'NO PHONE NUMBER FOUND';
}

function getSubjectLine(properties) {
  const dayOfWeek = properties['dayOfWeek'] ? properties['dayOfWeek'].toUpperCase() : '';
  const dogNames = properties['dogs'] ? getDogsFormatted(properties['dogs']) : '';
  const boardingDetails = boardingInfo[properties['boardingFacility']];
  return `Driving Lucky Dogs - THIS ${dayOfWeek} - ${boardingDetails ? boardingDetails.boardingCaps : ''} - ${dogNames}`;
}

function getDogsFormatted(dogs) {
  return dogs.split('  ').reduce((dogsSoFar, nextDog, i, src) => {
    if (i === src.length-1) {
      return dogsSoFar + nextDog;
    } else if (i === src.length-2) {
      return dogsSoFar + nextDog + " & ";
    } else {
      return dogsSoFar + nextDog + ', ';
    }
  }, '');
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

function createDogsList(auth, dogNames) {
  const sheets = google.sheets({version: 'v4', auth});
  return new Promise(
    (resolve, reject) => {
      sheets.spreadsheets.values.get({
        spreadsheetId: '1qaMlqIx-LoBovZLiJiwuGaLKDtZbHWlnAgHDswDZgOk',
        range: `'DOGS HERE'!A2:J`,
      }, (err, res) => {
        if (err) return reject(err);
        const rows = res.data.values;
        if (rows.length) {
          const dogMatches = rows.filter(row => row[0] && dogNames.includes(row[0].toLowerCase().split(' (')[0]));
          const dogsList = dogMatches.map(dogInfo => {
            return {
              name: dogInfo[0],
              url: dogInfo[2],
              age: dogInfo[7],
              weight: dogInfo[8],
              breed: dogInfo[9]
            }
          });
          resolve(dogsList);
        } else {
          console.log('No data found.');
          resolve([]);
        }
      });
    }
  );
}

async function getDogImages(dogsList) {
  let images = [];
  for (const dogInfo of dogsList) {
    const src = await getDogImageSource(dogInfo.url);
    images.push({name: dogInfo.name, src});
  }
  return images;
}

module.exports = getDriverEmailProps

