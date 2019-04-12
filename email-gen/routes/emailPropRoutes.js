const getDriverEmailProps = require('../services/events/driver/getDriverEmailProps');
const getMHEmailProps = require('../services/events/getMHEmailProps');
const getAllVolunteerEmailProps = require('../services/events/getAllVolunteerEmailProps');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/driver', requireLogin, async (req, res) => {
    const props = await getDriverEmailProps(req.body, req.user);
    res.send(props);
  });
  app.post('/api/mh', requireLogin, async (req, res) => {
    const props = await getMHEmailProps(req.body);
    res.send(props);
  });
  app.post('/api/allvolunteer', requireLogin, async (req, res) => {
    const props = await getAllVolunteerEmailProps(req.body);
    res.send(props);
  });
}