'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const clientsObj = require('./data/clients');
const clients = clientsObj.clients;

const { handleClients, handleClientsId, handleNewClient, handleDeleteClient } = require('./handlers/clientHandlers');


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
  .get('/clients', handleClients)
  .get('/clients/:id', handleClientsId)
  .post('/clients/newclient', handleNewClient)
  .delete('/clients/:id', handleDeleteClient)
  .listen(8000, () => console.log(`Listening on port 8000`));
