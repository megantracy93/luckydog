
const passport = require('passport');

module.exports = app => {
  app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email', 'https://www.googleapis.com/auth/spreadsheets.readonly'],
        accessType: 'offline',
        prompt: 'consent'
    })
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/google/callback',
    passport.authenticate('google'),
    async (req, res) => {
      req.user.authCode = req.query.code;
      await req.user.save();
      res.redirect('/')
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};