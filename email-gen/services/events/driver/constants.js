const defaultTimeArriveNote = () => 'Please plan to arrive at 11:45 am at the event with your dog(s)!'
const defaultTimeCommitmentNote = date => date === 'Saturday' ?
  'Please plan to arrive at the event no later than 11:45 and plan to leave between 2:30 and 2:45.'
  : 'Please plan to arrive at the event no later than 11:45 and plan to leave between 3:30 and 3:45.';

const boardingInfo = {
  wagtime: {
    boardingName: 'Wagtime',
    boardingCaps: 'WAGTIME',
    boardingAddress: '1232 9th Street NW, Washington DC 20001',
    boardingLink: 'https://www.google.com/maps/place/Wagtime/@38.9065656,-77.0265917,17z/data=!4m13!1m7!3m6!1s0x89b7b7ed195993c1:0x6c48cfc32f3dcd83!2s1232+9th+St+NW,+Washington,+DC+20001!3b1!8m2!3d38.9065614!4d-77.024403!3m4!1s0x89b7b7ed1a1a265b:0x9241a364dec99a52!8m2!3d38.9065672!4d-77.0241273',
    boardingContact: 'Please call Wagtime at 202-789-0870 when you return so they can help you unload. If they are not available to help, please unload your car- ONE DOG AT A TIME- as carefully as possible.',
    boardingNotes: `When they bring the dogs out to you, make sure they are wearing one of our no slip collars and that it is sized correctly (remember you shouldn\'t be able to get more than 2 fingers under it).` +
    `\n\nIf they do not have their Lucky Dog no slip collars on, please ask that they put one on the dog(s).` +
    `\n\nAlso, Wagtime has assured us that the missing leash issue is now solved and all of our dogs will have leashes when you pick them up. However, if you have a spare leash or two, we recommend you bring them with you just in case (we will switch it out with one of ours as soon as you get to the event).`,
    timeArriveNote: defaultTimeArriveNote,
    timeCommitmentNote: defaultTimeCommitmentNote
  },
  wagtimetoo: {
    boardingName: 'Wagtime Too',
    boardingCaps: 'WAGTIME TOO',
    boardingAddress: '900 M St SE, Washington DC 20003',
    boardingLink: 'https://www.google.com/maps/place/Wagtime+Too/@38.8766031,-76.9954827,17z/data=!4m5!3m4!1s0x89b7b9cc0e9ba06f:0x37163988e633e7e4!8m2!3d38.8765989!4d-76.993294?shorturl=1',
    boardingContact: 'Please call Wagtime Too at (202) 629-2765 when you return so they can help you unload.  Please do not try to unload you car alone, even one dog at a time, as we had a dog recently escape a driver\'s car and almost get away from us.',
    boardingNotes: `When they bring the dogs out to you, make sure they are wearing one of our no slip collars and that it is sized correctly (remember you shouldn\'t be able to get more than 2 fingers under it).` +
    `\n\nIf they do not have their Lucky Dog no slip collars on, please ask that they put one on the dog(s).` +
    `\n\nAlso, Wagtime has assured us that the missing leash issue is now solved and all of our dogs will have leashes when you pick them up. However, if you have a spare leash or two, we recommend you bring them with you just in case (we will switch it out with one of ours as soon as you get to the event).`,
    timeArriveNote: defaultTimeArriveNote,
    timeCommitmentNote: defaultTimeCommitmentNote
  },
  boardhound: {
    boardingName: 'Board Hound',
    boardingCaps: 'BOARD HOUND',
    boardingAddress: '3520 S Four Mile Run Dr., Arlington, VA 22206',
    boardingLink: 'https://www.google.com/maps/place/The+Board+Hound/@38.8440023,-77.0886714,17z/data=!3m1!4b1!4m5!3m4!1s0x89b7b14ebfaf97cd:0x3f908a28c6f1d916!8m2!3d38.8440023!4d-77.0864827',
    boardingContact: 'Please call the Board Hound at 703-382-9143 when you return so they can help you unload. If they are not available to help, please unload your car- ONE DOG AT A TIME- as carefully as possible.',
    boardingNotes: `Please make sure that the dogs are wearing a no slip collar and that it is sized correctly (remember you shouldn’t be able to get more than 2 fingers under it).` +
   `\n\nThere is a nice parking area behind BH accessible from 27th Street which is off S Shirlington Rd- safer for loading and ramp to rear door of BH makes it very easy. If you know where Dogma is then S Arlington Mill Dr runs into S Shirlington at the light make a left across small bridge and 27th is first left.`,
    timeArriveNote: defaultTimeArriveNote,
    timeCommitmentNote: defaultTimeCommitmentNote
  },
  ruffhouse: {
    boardingName: 'Ruff House',
    boardingCaps: 'RUFF HOUSE',
    boardingAddress: '12264 Wilkins Ave suite G, Rockville, MD 20852',
    boardingLink: 'https://www.google.com/maps/place/The+Ruff+House+Doggy+Day+Camp/@39.055201,-77.1131907,17z/data=!4m13!1m7!3m6!1s0x89b7cc2db26aa363:0xea73bf2f98a661da!2s12264+Wilkins+Ave+suite+G,+Rockville,+MD+20852!3b1!8m2!3d39.0551969!4d-77.111002!3m4!1s0x89b7cc2c4d33ab45:0x1dce255b77f0655f!8m2!3d39.055055!4d-77.111109',
    boardingContact: 'Please call the Ruff House at (240) 621-7256 when you return so they can help you unload. If they are not available to help, please unload your car- ONE DOG AT A TIME- as carefully as possible.',
    boardingNotes: 'Please make sure that the dogs are wearing a no slip collar and that it is sized correctly (remember you shouldn’t be able to get more than 2 fingers under it).' +
    '\n\nIf you need to contact the Ruff House, please call (240) 621-7256.',
    timeArriveNote: defaultTimeArriveNote,
    timeCommitmentNote: defaultTimeCommitmentNote
  },
  dogma: {
    boardingName: 'Dog-Ma Daycare & Boarding',
    boardingCaps: 'DOG-MA',
    boardingAddress: '816 L St SE, Washington, DC 20003',
    boardingLink: 'https://www.google.com/maps/place/Dog-Ma/@38.877693,-76.9962805,17z/data=!4m13!1m7!3m6!1s0x89b7b9cc6f15e003:0x630982c042aa25f9!2s816+L+St+SE,+Washington,+DC+20003!3b1!8m2!3d38.877693!4d-76.9940918!3m4!1s0x89b7b9cc6f342d03:0x774bbfdcde39827b!8m2!3d38.877693!4d-76.9940918',
    boardingContact: 'Please call Dog-Ma at 202-543-7805 if you have any questions',
    boardingNotes: 'Please pull up to the stop sign at the last entry gate, introduce yourself to the greeter and ask for the dogs you need. You shouldn’t pass the stop sign unless directed to do so.' +
    '\n\nAll Lucky Dogs will have a martingale collar and tag on. Dog-Ma should be prepared to give you a LDAR leash. Please do not take more than 1 dog to your car at a time while loading and unloading.',
    timeArriveNote: date => date === 'Saturday' ? defaultTimeArriveNote(date) : 'Dog-Ma does not open until noon on Sunday. Please plan to pick them up right at noon so you are not too late to the event!',
    timeCommitmentNote: date => date === 'Saturday' ? defaultTimeCommitmentNote(date) : 'Please plan to pick up the dogs right at noon and plan to leave between 3:30 and 3:45.'
  },
  patricks: {
    boardingName: 'Patrick\'s Pet Care',
    boardingCaps: 'PATRICKS',
    boardingAddress: '3509 12th St NE Washington, DC 20017',
    boardingLink: `https://www.google.com/maps/place/Patrick's+Pet+Care+-+Brookland/@38.9328631,-76.99299,17z/data=!4m13!1m7!3m6!1s0x89b7c7ed9a4bd57b:0xa901018ae8ccbe6c!2s3509+12th+St+NE,+Washington,+DC+20017!3b1!8m2!3d38.9328631!4d-76.9908013!3m4!1s0x89b7c7ed9a49f073:0xaae15684b9975ff4!8m2!3d38.9328631!4d-76.9908013`,
    boardingContact: 'Call Patrick\'s at 202-630-7387 if you have any questions',
    boardingNotes: `When they bring the dogs out to you, make sure they are wearing one of our no slip collars with a LDAR tag and that the collar is sized correctly (remember you shouldn't be able to get more than 2 fingers under it).` +
    `\n\nPlease ask for a leash to attach to the dogs before leaving the premises. You should only take one dog to the car at a time and make sure they're secured before bringing out another!`,
    timeArriveNote: defaultTimeArriveNote,
    timeCommitmentNote: defaultTimeCommitmentNote
  }
}

module.exports = { boardingInfo };