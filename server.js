const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const Clarifai = require('clarifai');

const register = require('./controllers/register');

const app = new Clarifai.App({apiKey: '10d3b6cad7784da888c80248fa4f2bca'});


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgresqlpassword',
    database : 'smartbrain'
  }
});


const app = express();
const saltRounds = 10;


app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} );

app.get('/profile', (req, res) =>
{
  console.log(database);
  res.json(database)
})

app.post('/signin', (req, res)=> {
  const {email,  password} = req.body;
  if(!email || !password)
    return res.status(400).json('incorrect form submission');
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data=>{
      bcrypt.compare(password, data[0].hash, function(err, resCompare){
        if(resCompare == true)
        {
          return db.select('*').from('users')
            .where('email', '=', email)
            .then(user=>{res.json(user[0])
            })
            .then(res.status(400).json('unable to get user'));
        }
        else{
          res.status(400).json('email or password wrong');
        }
    })
  })
  .catch(err => res.status(400).json('email or password wrong'))
});

app.get('/profile/:id', (req, res)=>{
  const {id} = req.params;
  let user = getUser(database, id);
  if(user)
    res.json(user)
  else
    res.status(404).json("Error user not found")
})

app.put('/image',(req, res) => {
  const {id} = req.body
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
      res.json(entries[0])
    })
    .catch(res.status(400).json('unable to get entries'))
})

app.post('/imageurl', (req, res => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body)
    .then( data => {
      res.json(data);
    })
    .catch( err => res.status(400).json('unable to work with API'))

app.listen(3000);
