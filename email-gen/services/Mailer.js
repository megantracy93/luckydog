const sendGrid = require('sendgrid');
const keys = require('../config/keys');

const helper = sendGrid.mail;

class Mailer extends helper.Mail {
  constructor({subject, recipients}, body) {
    super();
    this.sgApi = sendGrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;

    this.addContent(new helper.Content('text/html', body));
    this.addRecipients(recipients);

    this.addClickTracking();
  }
  addRecipients(recipients) {
    const personalize = new helper.Personalization();
    this.formatAddresses(recipients).forEach(r => personalize.addTo(r));
    this.addPersonalization(personalize);
  }
  formatAddresses(recipients) {
    return recipients.map(({email}) => new helper.Email(email));
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    return await this.sgApi.API(request);
  }
}

module.exports = Mailer;