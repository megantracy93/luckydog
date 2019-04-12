import React from 'react';
import CopyToClipboard from 'react-copy-html-to-clipboard';
import './GroupDriverPreview.css';

class GroupDriverPreview extends React.Component {
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
      subjectDate,
      MHPocName,
      MHPocPhoneNumber,
      ecName,
      ecPhoneNumber,
      date,
      locationName,
      locationLink,
      locationAddress
    } = this.props;
    const pocFirstName = MHPocName ? MHPocName.split(' ')[0] : '';
    return (
      <div>
        <CopyToClipboard text={this.state.htmlText} options={{asHtml: true}}>
          <button className="teal btn-flat white-text right">Copy to Clipboard</button>
        </CopyToClipboard>
        <div id="boarding_email" ref={this.setEmailRef}>
          Driving Lucky Dogs - This Sunday {subjectDate}<br/>
          <font face="Sans-Serif" size={2}>
          Hi Lucky Dog Drivers,<br/>
          <br/>
          Thank you so much for offering to drive some of our Lucky Dogs to the adoption event this Sunday, {date} from 12-3pm at the {locationName} (<a className="email_link" href={locationLink} rel="noopener noreferrer" target="_blank">{locationAddress}</a>). Please plan to arrive at 11:45 am at the event with your dog(s)!<br/>
          <br/>
          We really appreciate that you offered to drive our pups who are already in the DC area and still looking for their new forever homes to the event!!<br/>
          <br/>
          Please plan to arrive at the event at 11:45am so our pups can be ready for adopters by 12pm. If you are driving a master handler dog (noted with an asterisk), please arrive at 11:30am!<br/>
          <br/>
          <b><u>INFO ABOUT PARKING AT THIS EVENT</u></b><br/>
          <br/>
          IF YOU ARE DRIVING MULTIPLE DOGS - pull up to the back, call {ecName} ({ecPhoneNumber}) and someone will be there to help you unload! Our insurance does NOT allow you to handle more than ONE dog at a time.<br/>
          <br/>
          IF YOU ARE DRIVING A MASTER HANDLER DOG* - please call {pocFirstName} at {MHPocPhoneNumber} when you arrive and {pocFirstName} will help you with bandannas and getting the dogs checked in! <b>Please <u>DO NOT</u> walk up to the Foster Check-in table.</b> {pocFirstName} will come to your car to check-in your dog WITH the master handler.<br/>
          <br/>
          If you are giving a dog a ride to the event, I am assuming you are giving that dog a ride back to the boarding facility after the event unless he/she is adopted at the event.<br/>
          <br/>
          After the event, please do not leave until you have checked out at the Foster Table.<br/>
          <br/>
          <b><u>DOGS YOU ARE DRIVING</u></b><br/>
          <br/>
          <b><u>WAGTIME</u></b> (1232 9th Street NW Washington, DC 20001)
          <ul className="email_list">
            <li className="email_list_item"></li>
          </ul>
          <b><u>WAGTIME TOO</u></b> (900 M. Street, SE, Washington, DC 20003)
          <ul className="email_list">
            <li className="email_list_item"></li>
          </ul>
          <b><u>PATRICK'S PET CARE</u></b> (3509 12th St NE Washington, DC 20017)
          <ul className="email_list">
            <li className="email_list_item"></li>
          </ul>
          <b><u>THE BOARD HOUND</u></b> (3520 S Four Mile Run Dr., Arlington, VA 22206)
          <ul className="email_list">
            <li className="email_list_item"></li>
          </ul>
          <b><u>DOG-MA DAYCARE</u></b> (816 L St SE, Washington, DC 20003)
          <ul className="email_list">
            <li className="email_list_item"></li>
          </ul>
          <b><u>JUAN & CAROLINA'S</u></b> (6602 Furman Crt. Riverdale, MD 20737)
          <ul className="email_list">
            <li className="email_list_item"></li>
          </ul>
          <b><u>FOSTER</u></b>
          <ul className="email_list">
            <li className="email_list_item"></li>
          </ul>
          <b><u>BACK UP</u></b>
          <ul className="email_list">
            <li className="email_list_item"></li>
          </ul>
          A couple of general tips on driving Lucky Dogs:<br/>
          <ul className="email_list">
            <li className="email_list_item">Tether or crate each of the dogs you are bringing. This will prevent them from interacting with each other, and from getting loose in an emergency.</li>
            <li className="email_list_item">If you tether and you are bringing multiple dogs, I strongly suggest using the different sections of your car (front seat, backseat, trunk section of an SUV or van) to your advantage - try to keep the dogs separate if possible.</li>
            <li className="email_list_item">Each dog should be wearing a Martingale, no-slip collar with a Lucky Dog ID tag. They should also come with a leash.</li>
            <li className="email_list_item">Volunteer handlers will arrive at 11:30am, so try to arrive at 11:45am so we can get them organized first.</li>
            <li className="email_list_item">If you need help unloading the dogs, please pull up in front of the store and someone will help you so you can then go park.</li>
            <li className="email_list_item">If you have any problems, please call the EC {ecName} cell right away ({ecPhoneNumber})</li>
          </ul>
          Finally, please make sure you are taking only the dogs you are assigned. We don't have the space or the handlers to take extra dogs at the event so make sure you know the name and breed of the dog(s) you are bringing. If they say the dogs you’re assigned are not there, please call me ASAP so we can figure out what happened.<br/>
          <br/>
          If you have any questions, just email me. Thanks again and we'll see you Sunday at 11:45am!!!<br/>
          <br/>
          Thanks!<br/>
          Megan
          </font>
        </div>
      </div>
    );
  }
}

export default GroupDriverPreview