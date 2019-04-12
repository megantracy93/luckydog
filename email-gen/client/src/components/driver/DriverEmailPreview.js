import React from 'react';
import './DriverEmailPreview.css';
import CopyToClipboard from 'react-copy-html-to-clipboard';

class DriverEmailPreview extends React.Component {
  getEventTime = dayOfWeek => dayOfWeek === 'Sunday' ? '12-3pm' : '12-2pm'
  formatAge = age => {
    const ageSplit = age.split(' ');
    if (ageSplit[1] === 'months') {
      return ageSplit[0] + 'MO';
    } else {
      return ageSplit[0] + 'YO';
    }
  }
  formatWeight = weight => {
    return weight.trim().endsWith('lbs') ? weight : weight.trim() + 'lbs';
  }
  formatBreed = breed => {
    if (breed.endsWith('mix')) {
      return breed;
    } else {
      return breed + ' mix';
    }
  }
  renderDogsList = (dogsList) => {
    return dogsList.map(({name, url, age, weight, breed}) => {
      return (
        <li className="email_list_item" key={`dogList-${name}`}>{`${name} - ${this.formatAge(age)}, ${this.formatWeight(weight)}, ${this.formatBreed(breed)}`}<br/><a className="email_link" href={url} rel="noopener noreferrer" target="_blank">{url}</a></li>
      )
    })
  }
  renderTimeArriveNote = (dayOfWeek, boardingName, timeArriveNote) => {
    return dayOfWeek === 'Sunday' && boardingName === 'Dog-Ma Daycare & Boarding' ? (
      <span className="highlight">{timeArriveNote}</span>
    ) : timeArriveNote;
  }
  renderDogImages = (dogImages) => {
    return dogImages.map(({name, src}) => {
      return (
        <div key={`dogImages-${name}`}>
          {name}<br/>
          <img src={src} alt="" width="300"/>
        </div>
      )
    });
  }
  setEmailRef = (elem) => this.emailRef = elem
  render() {
    const {
      subject,
      name,
      dayOfWeek,
      date,
      locationName,
      locationLink,
      locationAddress,
      boardingName,
      boardingLink,
      boardingAddress,
      dogsList,
      ecName,
      ecPhoneNumber,
      boardingContact,
      timeCommitmentNote,
      timeArriveNote,
      boardingCaps,
      boardingNotes,
      dogImages
    } = this.props;
    // const {

    // } = this.props.emailProps;
    const renderedDogsList = this.renderDogsList(JSON.parse(dogsList));
    const renderedTimeArriveNote = this.renderTimeArriveNote(dayOfWeek, boardingName, timeArriveNote);
    const renderedDogImages = this.renderDogImages(dogImages);
    return (
      <div>
        <CopyToClipboard text={this.emailRef && this.emailRef.innerHTML} options={{asHtml: true}}>
          <button className="teal btn-flat white-text right">Copy to Clipboard</button>
        </CopyToClipboard>
        <div id="boarding_email" ref={this.setEmailRef}>
          {subject}<br/>
          <font face="Sans-Serif" size={2}>
            Hi {name} -
            <br/><br/>
            Thank you so much for offering to drive some of our Lucky Dogs to the adoption event this {dayOfWeek}, {date} from {this.getEventTime(dayOfWeek)} at the {locationName} (<a className="email_link" href={locationLink} rel="noopener noreferrer" target="_blank">{locationAddress}</a>). {renderedTimeArriveNote}
            <br/><br/>
            <b><i>Please make sure the dog that you are given match the photo I've included below as we've had instances of dog mix ups in the past!  Please do not bring any dogs except the dog(s) listed. :)</i></b>
            <br/><br/>
            <b><i><u>Your Dog Assignment</u></i></b>
            <br/><br/>
            <b><i>Boarding Location:</i></b> {boardingName} (<a className="email_link" href={boardingLink} rel="noopener noreferrer" target="_blank">{boardingAddress}</a>)
            <br/><br/>
            <b><i>Dogs:</i></b>
            <ul className="email_list">
            {renderedDogsList}
            </ul>
            <b><i>Driving Instructions:</i></b>
            <ul className="email_list">
              <li className="email_list_item">If you are driving just <b>one dog</b>, please go park and bring the dog to check in.</li>
              <li className="email_list_item">If you are driving more than one dog, please call {ecName} when you are close to the event ({ecPhoneNumber}).  We will send an Adoption Coordinator to meet you to help you unload. If you'd like, you can keep one dog in your car, while the AC takes the other(s).  Then please go park and come back to the event and sign in.  <b>Our insurance prohibits any one person walking more than one dog.</b>  It is critical that we respect this important rule.</li>
              <li className="email_list_item"><b>Please tie the dogs into the car during the trip.</b>  This will prevent the dogs from rough-housing with each other, climbing in your lap, or leaping out of the car when we try to unload.</li>
              {boardingContact ? (<li className="email_list_item">{boardingContact}</li>) : undefined}
              <li className="email_list_item">{timeCommitmentNote}  We recommend scheduling about 15 minutes to load when you pick the dogs up.</li>
            </ul>
            Please call {ecName} at <u>{ecPhoneNumber}</u> if you have any issues picking up the dogs.
            <br/><br/>
            Again, thank you so much for offering to drive our pups!  We're so LUCKY to have great volunteers like you!
            <br/><br/>
            Thank you!
            <br/>
            Megan
            <br/><br/>
            <b>Additional Information</b>
            <br/><br/>
            <span className="highlight">ATTACHED MATERIALS</span>
            <ul className="email_list">
              <li className="email_list_item">New Driver Release Form - If you are a new driver, please be sure to turn in a new driver release form.  We will have extra copies at the event.</li>
              <li className="email_list_item">Martingale Information - Please see the picture of what the collars should look like on the pup you pick up. Collars are KEY to the dogs safety, please check to see if the collars are on correctly.</li>
            </ul>
            <span className="highlight">***NOTES FOR {boardingCaps}***</span>
            <br/>
            <p id="boarding_notes">
              {boardingNotes}
            </p>
            {renderedDogImages}
          </font>
        </div>
      </div>
    );
  }
}

export default DriverEmailPreview