'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const clientsObj = require('./data/clients');
const clients = clientsObj.clients;

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get('/clients', (req, res) => {
    // console.log(clientsObj.clients[0].id);
    // console.log(clients);
    res.json({ status: 200, data: clients});
  })
  .get('/clients/:id', (req, res) => {
    const clientId = req.params.id;
    let clientInfo = clients.filter((client) => client.id == clientId);

    res.json({ status: 200, data: clientInfo});
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
