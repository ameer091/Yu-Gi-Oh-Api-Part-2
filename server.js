const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

let stringApp = 'mongodb+srv://ameersf0:Number909@cluster0.yr6lpn5.mongodb.net/yugiohapidatabase?retryWrites=true&w=majority'


MongoClient.connect(stringApp, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('yugiohapidatabase')
    const duelistCollection = db.collection('duelists')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
      })
    // app.post('/duelists', (req, res) => {//This was required to be commented out in order for all of the code to work
    //     console.log(req.body)
    //   })
    app.post('/duelists', (req, res) => {
        duelistCollection.insertOne(req.body)
          .then(result => {
            console.log(result)
          })
          .catch(error => console.error(error))
      })
    app.listen(3000, function() {
        console.log('listening on 3000')
      })
  })
  .catch(error => console.error(error))



// Make sure you place body-parser before your CRUD handlers!

// The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.

// You should be able to see values from the <form> element inside req.body now. Try doing a console.log and see what it is!
// app.use(bodyParser.urlencoded({ extended: true }))


// app.listen(3000, function() {
//   console.log('listening on 3000')
// })
//We normally abbreviate 'request' to 'req' and 'response' to 'res'.
// app.get('/', function (request, response) {
//   response.send('Hello World')
// })
// app.get('/', (req, res) => {
//   res.send('Hello World')
// I had to comment this out in order for the lower function to work
// })

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
//   // Note: __dirname is the current directory you're in. Try logging it and see what you get! Its shorthand for directory name
//   // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
// })
// app.post('/quotes', (req, res) => {
//   console.log('Hellooooooooooooooooo!')
// })
// app.post('/quotes', (req, res) => {
//   console.log(req.body)
// })