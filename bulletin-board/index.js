var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.static('style.css' + '/public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function (req, res) {
  pg.connect('postgres://postgres:shadow123@localhost:5432/bulletinboard',function(err,client, done){
    client.query('select * from messages',function(err, result){
      res.render('posts', {data:result.rows});
      done();
      pg.end();
    })
  })
})

app.get('/:id', function(req, res){
  pg.connect('postgres://postgres:shadow123@localhost:5432/bulletinboard', function(err, client,done){
    client.query(`select * from messages where id ='${req.params.id}'`, function(err, result){
     // console.log(req.params.id);
      res.render('review', {blog:result.rows[0]})
      done();
      pg.end();
    })
  })
})

app.post('/', function (req,res) {
  pg.connect('postgres://postgres:shadow123@localhost:5432/bulletinboard', function(err, client, done){
    console.log(req.body.title);
    client.query(`insert into messages(title, body) values ('${req.body.title}','${req.body.messages}')`,function(err,result){
      console.log(`insert into messages(title, body) values ('${req.body.title}','${req.body.messages}')`);
      res.redirect('/');
      done();
      pg.end();
    })
  })
})



app.listen('3000', function(){
  console.log("Now listening to port no 3000.......");
})
