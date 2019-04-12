const requireLogin = require('../middlewares/requireLogin');
const getTransportAnimals = require('../services/pa/getTransportAnimals');

module.exports = app => {
  app.post('/api/transport', requireLogin, async (req, res) => {
    const { transportSheetURL } = req.body;
    const props = await getTransportAnimals(transportSheetURL, req.user);
    res.send(props);
  });
}