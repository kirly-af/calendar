'use strict'

const
  express = require('express'),
  bodyParser = require('body-parser')
  // aws = require('aws')

let app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('www'))
let router = express.Router()

router.get('/events', (res, req) => {
  res.json({message: 'not implemented'})
});

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log(`server listening on port ${PORT}`)
