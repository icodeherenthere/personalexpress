const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;
// url for your database
const url = 'mongodb+srv://malikcgdev:iamcoding@feeling.85tofas.mongodb.net/demo?retryWrites=true&w=majority';
const dbName = "demo";

//this grab
app.listen(7856, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('feelings').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {feelings: result}) // gives you info you need to get
  })
})

app.post('/feelings', (req, res) => {
  db.collection('feelings').insertOne({emotion: req.body.emotion, vent: req.body.vent}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/feelings/emotion', (req, res) => {
  db.collection('feelings')
  .findOneAndUpdate({emotion: req.body.emotion, vent: req.body.vent}, {
    $set: {
      
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/feelings', (req, res) => {
  db.collection('feelings').findOneAndDelete({emotion: req.body.emotion, vent: req.body.vent}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
