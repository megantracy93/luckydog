export const SURVEY_FORM_NAME = 'emailForm';

const DAY_CHOICES = [
  {label: 'Saturday', key: 'Saturday'},
  {label: 'Sunday', key: 'Sunday'}
];

const EC_CHOCIES = [
  {label: 'Ashley', key: 'Ashley'},
  {label: 'Colleen', key: 'Colleen'},
  {label: 'Rachael', key: 'Rachael'},
  {label: 'Megan', key: 'Megan'},
  {label: 'Linda', key: 'Linda'},
  {label: 'Liz', key: 'Liz'},
  {label: 'Brittany', key: 'Brittany'},
  {label: 'Maaike', key: 'Maaike'},
  {label: 'Toria', key: 'Toria'},
  {label: 'Joan', key: 'Joan'},
  {label: 'Lauren', key: 'Lauren'},
  {label: 'Bailey', key: 'Bailey'},
];

const EVENT_TYPE_CHOICES = [
  {label: 'Cat', key: 'Cat'},
  {label: 'Dog', key: 'Dog'}
];

export const EVENT_PROPERTIES = [
  { label: 'Location Name',       name: 'locationName' },
  { label: 'Location Address',    name: 'locationAddress' },
  { label: 'Location Link',       name: 'locationLink' },
  { label: 'Day of the Week',     name: 'dayOfWeek',         type: 'dropdown', choices: DAY_CHOICES },
  { label: 'Event Cooridnator',   name: 'ecName',            type: 'dropdown', choices: EC_CHOCIES }
];

export const PA_PROPERTIES = [
  { label: 'Transport Sheet URL', name: 'transportSheetURL' }
]

export const MH_PROPERTIES = [
  { label: 'Master Handler POC',       name: 'MHPocName' },
  { label: 'POC Phone Numer',          name: 'MHPocPhoneNumber' }
];

export const ALL_VOLUNTEER_PROPERTIES = [
  { label: 'Type of Event',         name: 'eventType', type: 'dropdown', choices: EVENT_TYPE_CHOICES },
  { label: 'Parking Information',   name: 'parkingInfo' }
];

const BOARDING_CHOICES = [
  {label: 'Wagtime', key: 'wagtime'},
  {label: 'Wagtime Too', key: 'wagtimetoo'},
  {label: 'Dog-ma', key: 'dogma'},
  {label: `Patrick's`, key: 'patricks'},
  {label: 'Board Hound', key: 'boardhound'},
  {label: 'Ruff House', key: 'ruffhouse'}

];

export const DRIVER_PROPERTIES = [
  { label: 'Driver Name',         name: 'name' },
  { label: 'Boarding Facility',   name: 'boardingFacility', type: 'dropdown', choices: BOARDING_CHOICES },
  { label: 'Dogs',                name: 'dogs' }
];

export const FOSTER_PROPERTIES = [
  { label: 'Driver Name',         name: 'name' },
  { label: 'Dog/Cat Name',        name: 'dogs' },
  { label: 'Foster Name',         name: 'fosterName' },
  { label: 'Foster Address',      name: 'fosterAddress' }
];
