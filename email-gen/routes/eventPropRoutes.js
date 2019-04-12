const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');

const EventProperties = mongoose.model('event-properties');

module.exports = app => {
  app.post('/api/event', requireLogin, async (req, res) => {
    const { locationName, locationLink, locationAddress, dayOfWeek, ecName, eventId } = req.body;
    const existingEvent = await EventProperties.findOne({ _id: eventId });
    if (existingEvent) {
      existingEvent.locationName = locationName;
      existingEvent.locationLink = locationLink;
      existingEvent.locationAddress = locationAddress;
      existingEvent.dayOfWeek = dayOfWeek;
      existingEvent.lastEC = ecName;
      await existingEvent.save();
      res.send(existingEvent);
    } else {
      const newEventProp = await new EventProperties({
        locationName,
        locationLink,
        locationAddress,
        dayOfWeek,
        lastEC: ecName
      }).save();
      res.send(newEventProp);
    }
  });

  app.get('/api/events', requireLogin, async (req, res) => {
    const allEvents = await EventProperties.find({}, null, { sort: { dayOfWeek: -1} }, (err, props) => {
      return props;
    });
    res.send(allEvents);
  });
}