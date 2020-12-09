'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { handleClients, handleClientsId, handleNewClient, handleDeleteClient } = require('./handlers/clientHandlers');

const { handleWords, handleWordId, handleWord, handleGuess } = require('./handlers/hangmanHandlers');

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

  // endpoints Clients
  .get('/clients', handleClients)
  .get('/clients/:id', handleClientsId)
  .post('/clients/newclient', handleNewClient)
  .delete('/clients/:id', handleDeleteClient)

  // endpoints Hangman
  .get('/hangman/words', handleWords)
  .get('/hangman/word/:id', handleWordId)
  .get('/hangman/word', handleWord)
  .get('/hangman/word/:id/:letter', handleGuess)
  .listen(8000, () => console.log(`Listening on port 8000`));
