'use strict'

const
  express = require('express'),
  bodyParser = require('body-parser'),
  AWS = require('aws-sdk')

AWS.config.update({
  endpoint: "http://localhost:8000",
  region: "us-west-2"
})
AWS.config.credentials = new AWS.SharedIniFileCredentials()

const dynamoClient = new AWS.DynamoDB.DocumentClient()

let app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('www'))
app.use(express.static('.'))
let router = express.Router()

router.route('/events')
  .post((req, res) => {
    let params = {
      TableName: 'Events',
      Item: req.body
    }

    dynamoClient.put(params, (err, data) => {
      if (err)
      {
        res.status(500).json({message: 'error in database'})
        console.log('db error:', err)
      }
      else
      {
        res.status(200).json({message: 'success'})
      }
    })
  })
  .get((req, res) => {
    let params = {TableName: 'Events'}
    dynamoClient.scan(params, (err, data) => {
      if (err)
      {
        res.status(500).json({message: 'error in database'})
        console.log('db error:', err)
      }
      else
      {
        res.status(200).json(data)
      }
    })
  })

router.route('/events/:key')
  .get((req, res) => {
    let params = {
      TableName: 'Events',
      Key: {
        key: req.params.key
      }
    }
    dynamoClient.get(params, (err, data) => {
      if (err)
      {
        res.status(400).json({message: 'event not found'})
        console.log('db error:', err)
      }
      else
      {
        res.status(200).json(data)
      }
    });
  })

app.use('/api', router)

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log(`server listening on port ${PORT}`)
