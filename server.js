const express = require('express');
const morgan  = require('morgan')
const app = express();

const port = 80;

app.use(morgan('combined'));
app.use('/', express.static('./'));
app.set('port', port);
app.listen(app.get('port') || port, function() {
  console.log('Site started!');
});
