import React from 'react';
import CopyToClipboard from 'react-copy-html-to-clipboard';

class FosterEmailPreview extends React.Component {
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
      name,
      dogs,
      fosterName,
      fosterAddress,
      dayOfWeek,
      locationName,
      locationLink,
      locationAddress
    } = this.props;
    const dayInCaps = dayOfWeek && dayOfWeek.toUpperCase();
    const subject = `Driving Lucky Dog ${dogs} - THIS ${dayInCaps}`;
    const locationSplit = locationAddress && locationAddress.split(/\s+/);
    const locationShort = locationSplit && locationSplit.length > 2 && locationSplit[locationSplit.length-2];
    return (
      <div>
        <CopyToClipboard text={this.state.htmlText} options={{asHtml: true}}>
          <button className="teal btn-flat white-text right">Copy to Clipboard</button>
        </CopyToClipboard>
        <div id="boarding_email" ref={this.setEmailRef}>
          {subject}<br/>
          <font face="Sans-Serif" size={2}>
            Hi {fosterName} -<br/>
            <br/>
            {name}, cc'd here, will be able to drive {dogs} THIS {dayInCaps} to and from the adoption event in {locationShort}.  Please coordinate with {name} for pick up and drop off, please don't forget to send the Lucky Dog folder!<br/>
            <br/>
            <b>Foster Location:</b><br/>
            {fosterAddress}<br/>
            <br/>
            <b>Event Location:</b><br/>
            {locationName}<br/>
            <a className="email_link" href={locationLink} rel="noopener noreferrer" target="_blank">{locationAddress}</a><br/>
            <br/>
            {name} - Please plan to arrive at the event by 11:45 to get {dogs} checked in!<br/>
            <br/>
            Thank you!<br/>
            Megan
          </font>
        </div>
      </div>
    );
  }
}

export default FosterEmailPreview