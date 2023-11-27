const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv').config();
const cors = require('cors');

const indexRouter = require('./routes/index');
const healthRouter = require('./routes/health');
const eaRouter = require('./routes/ea');
const legacyRouter = require('./routes/legacy');
const steamRouter = require('./routes/steamid');

// legacy workaround for ssh on heroku
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

app.use('/', indexRouter);
app.use('/health', healthRouter);
app.use('/ea', eaRouter);
app.use('/legacy', legacyRouter);
app.use('/steamid', steamRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port);
console.log('App is listening on port ' + port);
