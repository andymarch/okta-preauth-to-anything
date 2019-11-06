require('dotenv').config()
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
var cors = require('cors')

app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var allowedOrigins = process.env.CORS_WHITELIST.split(' ')
app.use(cors({
  origin: function(origin, callback){    
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true)
    
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    
    return callback(null, true)
  }
}));

const client = new okta.Client({
  orgUrl: process.env.TENANT,
  token: process.env.TOKEN 
});

axios.defaults.headers.common['Authorization'] = `SSWS `+process.env.TOKEN

var preAuthRouter = require('./routes/preAuth')(client)
var migrateRouter = require('./routes/migrate')(client)
app.use('/preAuth', preAuthRouter)
app.use('/migrate', migrateRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('app started on '+PORT))