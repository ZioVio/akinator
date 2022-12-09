const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { router } = require('./router');
const { run } = require('./aki');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const PORT = process.env.PORT || 6000;

run();

const server = app.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});