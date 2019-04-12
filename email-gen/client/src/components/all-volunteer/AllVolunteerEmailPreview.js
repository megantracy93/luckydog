import React from 'react';
import CopyToClipboard from 'react-copy-html-to-clipboard';
import './AllVolunteerEmailPreview.css';

class AllVolunteerEmailPreview extends React.Component {
  getEventTime = dayOfWeek => dayOfWeek === 'Saturday' ? '12-2pm' : '12-3pm'
  getVolunteerArrivalInfo = (eventType, dayOfWeek) => {
    return eventType === 'Cat' ? (
      <ul className="email_list">
        <li className="email_list_item"><b>NEW and REPEAT volunteers</b> - <b>11:00 am</b> for orientation.</li>
        <li className="email_list_item"><b>Fosters/drivers and dogs</b> - <b>11:45 am</b> so we are ready for those early bird adopters.</li>
      </ul>
      ) : dayOfWeek === 'Saturday' ? (
        <ul className="email_list">
          <li className="email_list_item"><b>NEW and REPEAT volunteers</b> - <b>11:45 am</b> for orientation.</li>
          <li className="email_list_item"><b>Fosters/drivers and dogs</b> - <b>11:45 am</b> so we are ready for those early bird adopters. New volunteers who are driving should plan to arrive at 11:45 am.  Please find me for a quick orientation.</li>
        </ul>
      ) : (
        <ul className="email_list">
          <li className="email_list_item"><b>NEW volunteers</b> - if you have volunteered at 3 or fewer adoption events - <b>11:15 am so we can do volunteer orientation</b>. If you are new and are also driving dogs, please plan to arrive at 11:45 am.</li>
          <li className="email_list_item"><b>Repeat volunteers</b>- volunteered at more than 3 adoption events or more - <b>11:30 am</b></li>
          <li className="email_list_item"><b>Fosters/drivers and dogs</b> - <b>11:45 am</b> so we are ready for those early bird adopters. New volunteers who are driving should plan to arrive at 11:45 am.  Please find me for a quick orientation.</li>
          <li className="email_list_item"><b>Master handlers and drivers</b> - <b>11:30 am</b> so we can get your dogs checked in before all the others arrive (see follow up email if this applies to you)!</li>
        </ul>
    );
  }
  getDrivingInfo = (eventType, ecName, ecPhoneNumber) => {
    return eventType === 'Cat' ? [
      <b>DRIVING LUCKY CATS</b>,<br/>,
      <ul className="email_list">
        <li className="email_list_item"><b>Driving One Cat</b> - Please park your car and bring the cat to the table.</li>
        <li className="email_list_item"><b>Driving More than One Cat</b> - You are welcome to park and carry in your cat/kitten. If you are not comfortable, please pull into the parking lot and call {ecName} at {ecPhoneNumber} to help you unload the cats.</li>
      </ul>
    ] : [
      <b>DRIVING LUCKY DOGS</b>,<br/>,
      <ul className="email_list">
        <li className="email_list_item"><b>Driving One Dog</b> - Please park your car and bring the dog to the table.</li>
        <li className="email_list_item"><b>Driving More than One Dog</b> - Please pull into the garage and call your EC {ecName} at {ecPhoneNumber} to help you unload the dogs. If you'd like, you can keep one dog in your car, while a volunteer takes the other(s).  Then please go park and come back to the event and check in. <b>Our insurance prohibits any one person walking more than one dog.</b>  It is critical that we respect this important rule!</li>
      </ul>
    ];
  }
  getFosterCheckInTableName = dayOfWeek => dayOfWeek === 'Saturday' ? '' : 'FOSTER '
  getVolunteerCheckInTableName = dayOfWeek => dayOfWeek === 'Saturday' ? '' : 'VOLUNTEER '
  getCheckInInfo = (eventType, dayOfWeek, ecName, ecPhoneNumber) => {
    return eventType === 'Cat' ? (
      <ul className="email_list">
        <li className="email_list_item"><b>Volunteers with Cats</b> -  Check in at the TABLE, we will give you a name-tag. If you are a foster or driving a cat in foster, you MUST bring the cat's folder.  Please turn it in at the table.  If you are driving more than one cat, please CALL {ecName} at {ecPhoneNumber} to help you unload the cats. If you'd like, you can keep one cat in your car, while a volunteer takes the other(s).  Then please go park and come back to the event and check in.</li>
        <li className="email_list_item"><b>Volunteers without Cats</b> - Check in at the TABLE. If you are a new volunteer, we will do a quick orientation and have you sign a release form.  Once checked in, we will have you help set up and get all the cat crates ready for the cats/kittens to be places. During a cat event, there are some times where there won't be much to do because you won't be physically handling a cat.</li>
      </ul>
    ) : (
      <ul className="email_list">
        <li className="email_list_item"><b>Volunteers with Dogs</b> - Check in at the {this.getFosterCheckInTableName(dayOfWeek)}TABLE, we will give you a nametag, bio for your dog and bandana the dog.  If you are a foster or driving a dog in foster, you MUST bring the dog's folder.  Please turn it in at the table.  If you are driving more than one dog, please CALL {ecName} at {ecPhoneNumber} to help you unload the dogs. If you'd like, you can keep one dog in your car, while a volunteer takes the other(s).  Then please go park and come back to the event and check in. <b>Our insurance prohibits any one person walking more than one dog.</b>  It is critical that we respect this important rule!</li>
        <li className="email_list_item"><b>Volunteers without Dogs</b> - Check in at the {this.getVolunteerCheckInTableName(dayOfWeek)}TABLE.  If you are a new volunteer, we will do a quick orientation and have you sign a release form.  Once checked in, we will line you up for dog assignments.  You will get your dog and nametag as we check in dogs!  We sometimes need to pair volunteers to handle one dog depending on how many dogs are in attendance.  We do our best to make sure everyone has a dog but the dogs attending changes as dogs get adopted!</li>
      </ul>
    )
  }
  getNewVolunteerArrivalReminder = dayOfWeek => {
    return dayOfWeek === 'Saturday' ? (
      <li className="email_list_item">Remember you must arrive at <b>11:45 AM</b> for orientation.</li>
    ) : (
      <li className="email_list_item">Remember you must arrive at <b>11:15 AM</b> for orientation. If any new volunteers show up late, they will have to wait for their assignments until we have time to do a second orientation.</li>
    );
  }
  getNewVolunteerInformation = (eventType, dayOfWeek) => {
    return eventType === 'Cat' ? (
      <ul className="email_list">
        <li className="email_list_item">Remember you must arrive at <b>11:00 AM</b> for orientation and set up.</li>
        <li className="email_list_item">The main responsibilities of our fosters and volunteer handlers at adoption events are:</li>
        <ul className="email_list">
          <li className="email_list_item_sub">To help potential adopters get to know our cats</li>
          <li className="email_list_item_sub">To make sure the cat doesn't run away</li>
        </ul>
        <li className="email_list_item"><b><span className="highlight">Please NEVER take a cat or kitten out of the crate - they can get scared and jump out of your arms.</span></b></li>
      </ul>
    ) : [
      <ul className="email_list">
      {this.getNewVolunteerArrivalReminder(dayOfWeek)}
      <li className="email_list_item">The main responsibilities of our fosters and volunteer handlers at adoption events are:</li>
      <ul className="email_list">
        <li className="email_list_item_sub">To help potential adopters get to know our dogs</li>
        <li className="email_list_item_sub">To make sure the dog doesn't run away</li>
        <li className="email_list_item_sub">To make sure the dog doesn't get in a fight</li>
        <li className="email_list_item_sub">Dog fights are rare, but they do happen occasionally so you need to maintain a tight short leash and know where your dog is at all times. Please be aware that we do have some dogs with challenges and fears that they are working on. These dogs (and only these dogs) will be wearing red bandannas</li>
        <li className="email_list_item_sub">We ask that you be mindful of where your dog is and where they are at all times</li>
      </ul>
    </ul>,
    "Please review the attachments for further tips!",<br/>
    ];
  }
  getFosterReminders = eventType => {
    return eventType === 'Cat' ? (
      <ul className="email_list">
        <li className="email_list_item">Please remember to bring your foster cat's adoption folder with you to the event.</li>
        <li className="email_list_item">Please remember to avoid taking your cat/kitten out of the cat crate. While we understand you know & love your foster baby, they can be scared by other things in the environment, get out of your arms and injure themselves or others.</li>
        <li className="email_list_item">At the end of the event, don’t forget to report to the check-out table to collect your foster’s cat folder.</li>
      </ul>
      ) : (
      <ul className="email_list">
        <li className="email_list_item">Please remember to bring your foster dog’s adoption folder with you to the event.</li>
        <li className="email_list_item">Please leave the following at home:</li>
        <ul className="email_list">
          <li className="email_list_item_sub">retractable leashes</li>
          <li className="email_list_item_sub">high value treats (We don’t want a fight to break out over a ball, bone, or kong)</li>
          <li className="email_list_item_sub">your own dog(s); your dog already has a loving forever home - this is our LDAR dogs chance to shine!</li>
        </ul>
        <li className="email_list_item">At the end of the event, don’t forget to report to the check-out table to collect your foster’s dog folder and any meds he/she may need.</li>
      </ul>
    );
  }
  state ={
    htmlText: ''
  }
  setEmailRef = (elem) => this.emailRef = elem
  updateHtmlText = () => {
    if (this.state.htmlText !== this.emailRef.innerHTML) {
      this.setState({
        htmlText: this.emailRef.innerHTML
      });
    }
  }
  componentDidUpdate() {
    this.updateHtmlText();
  }
  render() {
    const {
      subject,
      date,
      ecName,
      ecPhoneNumber,
      parkingInfo,
      dayOfWeek,
      locationName,
      locationLink,
      locationAddress,
      eventType
    } = this.props;
    return (
      <div>
        <CopyToClipboard text={this.state.htmlText} options={{asHtml: true}}>
          <button className="teal btn-flat white-text right">Copy to Clipboard</button>
        </CopyToClipboard>
        <div id="boarding_email" ref={this.setEmailRef}>
          {subject}<br/>
          <font face="Sans-Serif" size={2}>
          Hi Lucky Dog Volunteers!<br/>
          <br/>
          Thanks again for signing up to volunteer at our adoption event THIS {dayOfWeek} ({date}) from {this.getEventTime(dayOfWeek)} at the {locationName} (<a className="email_link" href={locationLink} rel="noopener noreferrer" target="_blank">{locationAddress}</a>)!!<br/>
          <br/>
          {eventType === 'Cat' ? null : [<b>*Please note, you will be outside for the majority of this event. Please dress accordingly!</b>,<br/>,
          <br/>]}
          The Lucky {eventType}s are so grateful for your help!!  Please see the information below on:<br/>
          <ul className="email_list">
            <li className="email_list_item">Arrival Times</li>
            <li className="email_list_item">Driving Lucky {eventType}s</li>
            <li className="email_list_item">Parking</li>
            <li className="email_list_item">Check In</li>
            <li className="email_list_item">New Volunteer Information</li>
            <li className="email_list_item">Under 18 Volunteers</li>
            <li className="email_list_item">Foster Reminders</li>
          </ul>
          {eventType === 'Cat' ? null : ["Please also review the attached.  Let me know if you have any questions!",<br/>,
          <br/>]}
          Thanks,<br/>
          Megan<br/>
          <br/>
          <b>ARRIVAL TIMES</b><br/>
          {this.getVolunteerArrivalInfo(eventType, dayOfWeek)}
          {this.getDrivingInfo(eventType, ecName, ecPhoneNumber)}
          <b>PARKING</b><br/>
          <ul className="email_list">
            <li className="email_list_item">{parkingInfo}</li>
          </ul>
          <b>CHECK IN</b><br/>
          {this.getCheckInInfo(eventType, dayOfWeek, ecName, ecPhoneNumber)}
          <b>NEW VOLUNTEER INFORMATION</b><br/>
          {this.getNewVolunteerInformation(eventType, dayOfWeek)}
          <br/>
          <b>U-18 VOLUNTEERS</b><br/>
          <ul className="email_list">
            <li className="email_list_item">All volunteers must be at least 7 years old to attend the event</li>
            <li className="email_list_item">Anyone under 18 must have a parent present at all times {eventType === 'Cat' ? '' : '(and the parent will be responsible for holding the dog’s leash if assigned a dog to handle)'}.</li>
            <li className="email_list_item"><span className="highlight">Must be a 1:1 ratio between minor and parent/guardian.</span></li>
          </ul>
          <b>FOSTER REMINDERS</b><br/>
          {this.getFosterReminders(eventType)}
          Thanks!<br/>
          Megan
          </font>
        </div>
      </div>
    );
  }
}

export default AllVolunteerEmailPreview