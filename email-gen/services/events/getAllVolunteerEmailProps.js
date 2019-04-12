const mongoose = require('mongoose');
const ecPhoneNumberSchema = require('../../models/PhoneNumbers');

async function getAllVolunteerEmailProps(props) {
  const ecPhoneNumber = await getPhoneNumber(props['ecName']);
  const date = getDate(props['dayOfWeek']);
  const subject = getSubjectLine(props);
  return {
    ...props,
    date,
    ecPhoneNumber,
    subject
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
  const dayOfWeek = properties['dayOfWeek'];
  return `Volunteering this ${dayOfWeek} - ${properties['locationName']} - ${getDateForSubject(dayOfWeek)}`;
}

function getDateForSubject(dayOfWeek) {
  const today = new Date();
  const desiredDay = dayOfWeek === 'Saturday' ? 6 : 0;
  const calculatedDate = today.getDate() + (desiredDay+(7-today.getDay()))%7;
  today.setDate(calculatedDate);
  const options = {month: 'numeric', day: 'numeric'};
  return today.toLocaleDateString('en-US', options);
}

module.exports = getAllVolunteerEmailProps

