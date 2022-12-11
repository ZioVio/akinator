const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { router } = require('./akinatorRouter');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});