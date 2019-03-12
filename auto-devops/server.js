var express = require('express'),
    bodyParser = require('body-parser'),
    backend = require('./backend');

var app = express();

// ----- Parse JSON requests

app.use(bodyParser.json());

// ----- Allow CORS

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// ----- Static files for frontend

app.use(express.static('public'))

// ----- The API implementation

var todos = backend(process.env.DATABASE_URL);

function createCallback(res, onSuccess) {
  return function callback(err, data) {
    if (err || !data) {
      res.send(500, 'Something bad happened!');
      return;
    }

    onSuccess(data);
  }
}

function createTodo(req, data) {
  return {
    title: data.title,
    order: data.order,
    completed: data.completed || false,
    url: req.protocol + '://' + req.get('host') + '/api/' + data.id
  };
}

function getCreateTodo(req) {
  return function(data) {
    return createTodo(req, data);
  };
}

app.get('/api/', function(req, res) {
  todos.all(createCallback(res, function(todos) {
    res.send(todos.map(getCreateTodo(req)));
  }));
});

app.get('/api/:id', function(req, res) {
  todos.get(req.params.id, createCallback(res, function(todo) {
    res.send(createTodo(req, todo));
  }));
});

app.post('/api', function(req, res) {
  todos.create(req.body.title, req.body.order, createCallback(res, function(todo) {
    res.send(createTodo(req, todo));
  }));
});

app.patch('/api/:id', function(req, res) {
  todos.update(req.params.id, req.body, createCallback(res, function(todo) {
    res.send(createTodo(req, todo));
  }));
});

app.delete('/api/', function(req, res) {
  todos.clear(createCallback(res, function(todos) {
    res.send(todos.map(getCreateTodo(req)));
  }));
});

app.delete('/api/:id', function(req, res) {
  todos.delete(req.params.id, createCallback(res, function(todo) {
    res.send(createTodo(req, todo));
  }));
});

const port = Number(process.env.PORT || 5000);

console.log(`Todo service listening on port ${port}`);

app.listen(port);

module.exports = app;
