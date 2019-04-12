import React from 'react';
import CopyToClipboard from 'react-copy-html-to-clipboard';
import './MasterHandlerPreview.css';

class MasterHandlerPreview extends React.Component {
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
      ecPhoneNumber
    } = this.props;
    const pocFirstName = MHPocName ? MHPocName.split(' ')[0] : '';
    return (
      <div>
        <CopyToClipboard text={this.state.htmlText} options={{asHtml: true}}>
          <button className="teal btn-flat white-text right">Copy to Clipboard</button>
        </CopyToClipboard>
        <div id="boarding_email" ref={this.setEmailRef}>
          Master Handler Dogs - This Sunday {subjectDate}<br/>
          <font face="Sans-Serif" size={2}>
          Hi Volunteers!<br/>
          <br/>
          You are all bringing or handling dogs who sometimes have reactions to the dogs gathered at check in.  These dogs are GREAT dogs, just can be barky or reactive with other dogs around.  I wanted to send over a few additional notes for you to review in advance of Sunday:<br/>
          <br/>
          ARRIVAL: Please CALL {MHPocName} ({MHPocPhoneNumber}) when you arrive.  Please go ahead and park your car, {pocFirstName} will come get you with the bandanna and the master handler - <b><u>DO NOT</u> approach the foster check-in table with your dog! Arrival time should be <span className="green_highlight">11:30 a.m.</span></b>!  This will give us enough time to get your dogs checked in before all the others arrive.<br/>
          <br/>
          DEPARTURE: Please do NOT come to the check out table. {pocFirstName} will bring the folders and anything you need for check out.  They will collect your bandannas at that time.<br/>
          <br/>
          {pocFirstName}'s cell number is {MHPocPhoneNumber}. If you can't get a hold of them, you can contact the event coordinator, {ecName}, as well ({ecPhoneNumber})!<br/>
          <br/>
          <span className="green_highlight"><b>BIG NEWS:</b></span> We’re going to be going back to our roots and starting up the <b><u>REPORT CARDS</u></b> again! During the event, please work with your dog on the tricks listed, as well as anything else you think is important (i.e. focus, quiet, etc.). After the event, <b>fill out this <a className="email_link" href="https://docs.google.com/forms/d/e/1FAIpQLSdCs0mKS8IwvxjGBf_piMjW0ODRi-MMzLL4vrg_mBUxm1bD4Q/viewform?fbzx=64728757621991011" rel="noopener noreferrer" target="_blank">link</a></b> and tell us how they did.<br/>
          <br/>
          Thanks!<br/>
          Megan
          </font>
        </div>
      </div>
    );
  }
}

export default MasterHandlerPreview