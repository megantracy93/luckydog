import React from 'react';
import CopyToClipboard from 'react-copy-html-to-clipboard';
import './TransportEmailPreview.css';

const NAME_ROW_WIDTH = 97;
const BIO_ROW_WIDTH = 382;

class TransportEmailPreview extends React.Component {
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
  renderAnimalTable = (headerLabel, animals) => {
    const rows = animals.map(animal => {
      const bio = animal[1] ?
        <a href={animal[1]} className="email_link" rel="noopener noreferrer" target="_blank">{animal[1]}</a> :
        'Bio not yet posted online';
      return (
        <tr>
          <td width={NAME_ROW_WIDTH} className="table-row"><b>{animal[0]}</b></td>
          <td width={BIO_ROW_WIDTH} className="table-row">{bio}</td>
        </tr>
      );
    });
    return [
      <tr className="table-header">
        <th width={NAME_ROW_WIDTH} className="table-row">{headerLabel}</th>
        <th width={BIO_ROW_WIDTH} className="table-row">Link to Bio</th>
      </tr>,
      rows
    ]
  }
  render() {
    const {
      dogs,
      cats
    } = this.props;
    const dogTable = this.renderAnimalTable('Dogs', dogs);
    const catTable = !cats || cats.length === 0 ?  undefined : this.renderAnimalTable('Cats', cats);
    return (
      <div>
        <CopyToClipboard text={this.state.htmlText} options={{asHtml: true}}>
          <button className="teal btn-flat white-text right">Copy to Clipboard</button>
        </CopyToClipboard>
        <div id="boarding_email" ref={this.setEmailRef}>
          Introducing Lucky Dog's New Arrivals!<br/>
          <font face = "Sans-Serif" size={2}>
            Hi Pre-approved adopter!
            <br/><br/>
            Thank you so much for your interest in adopting through Lucky Dog Animal Rescue. We are writing to let you know that we have many wonderful new dogs arriving this weekend for adoption - These pups are adorable and, as always, are looking for their forever homes!
            <br/><br/>
            Please remember per your conversation with the Adoption Coordinator during your screening call that for dogs pending arrival, you can request an Off Transport Adoption, an Off Transport Adoption (with a trial for adult dogs), or a Priority for this Sunday's event. Please note - puppies under 5 months are not eligible for priorities - so we encourage you to ask about our Off Transport adoptions! If you want more info on any of these options, please reach out to us ASAP.
            <br/><br/>
            *Note that this is pending you and the new dog are a good match!*
            <br/><br/>
            <i>If you are no longer looking to adopt PLEASE REPLY and let me know, so I can remove you from the list.  We need an accurate account of how many PAs we have waiting to adopt, so we can save as many lives as possible from high kill shelters.  This is really important, so we appreciate you letting us know.</i>
            <br/><br/>
            <div className="center">
              PICTURE
              <br/>
              <font className="highlight"><b><u>CAPTION</u></b></font>
              <br/><br/>
              <b>MEET OUR NEW ARRIVALS:</b>
              <br/>
              (Please note that transport lists are subject to change, and we cannot guarantee all these dogs will be at the event on Sunday.  Please reach out to your Adoption Coordinator if you are interested in meeting a particular dog/cat.)
              <br/><br/>
              <div align="center">
                <table cellspacing="0" cellpadding="0">
                  {dogTable}
                  {catTable}
                </table>
              </div>
              <br/>
              Thank you for your interest in saving a Lucky Dog or Cat - we hope to see you this weekend!
              <br/><br/>
            </div>
            Best,
            <br/>
            Megan
          </font>
        </div>
      </div>
    );
  }
}

export default TransportEmailPreview