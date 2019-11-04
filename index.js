require('dotenv').config()
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const okta = require('@okta/okta-sdk-nodejs');
var cors = require('cors');
const router = express.Router();

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'https://account.examplydev.co.uk'
  }));

const client = new okta.Client({
  orgUrl: process.env.TENANT,
  token: process.env.TOKEN 
});

console.log(process.env.TOKEN)

axios.defaults.headers.common['Authorization'] = `SSWS `+process.env.TOKEN

var preAuthRouter = require('./routes/preAuth')(client)
var migrateRouter = require('./routes/migrate')(client)
app.use('/preAuth', preAuthRouter)
app.use('/migrate', migrateRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('app started on '+PORT));