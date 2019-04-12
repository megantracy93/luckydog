const mongoose = require('mongoose');
const ecPhoneNumberSchema = require('../../models/PhoneNumbers');

async function getMHEmailProps(props) {
  const ecPhoneNumber = await getPhoneNumber(props['ecName']);
  const subjectDate = getSubjectDate();
  return {
    ...props,
    subjectDate,
    ecPhoneNumber
  };
}

async function getPhoneNumber(ecName) {
  const ecPhoneNumbers = mongoose.model('phone-numbers', ecPhoneNumberSchema);
  const ecsFound  = await ecPhoneNumbers.find({name: ecName});
  return ecsFound[0] ? ecsFound[0].phoneNumber : 'NO PHONE NUMBER FOUND';
}

function getSubjectDate() { // Ex: 3/23
  const today = new Date();
  const calculatedDate = today.getDate() + (7-today.getDay())%7;
  today.setDate(calculatedDate);
  const options = {month: 'numeric', day: 'numeric'};
  return today.toLocaleDateString('en-US', options);
}

module.exports = getMHEmailProps