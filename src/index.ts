const express = require('express');
const { initializeRoutes } = require('./utils/initializeRoutes');

require('dotenv').config();

const app = express();
require('./db/connect')();

initializeRoutes(app)


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.clear();
    console.log(`Listening on port ${port}`)
});