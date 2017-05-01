'use strict';

const Joi = require('joi');
const Response = require('./../../response');
const Handlers = require('./handlers');
const Payloads = require('./payloads');

module.exports = [
  {
    method: 'POST',
    path: '/sessions/create',
    config: {
      cors: {
          origin: ['*'],
      },
      tags: ['api'],
      description: 'Creates Session if User Credentials Correct otherwise, does not. Prompts to Register',
      validate: {
        payload: Payloads.createUserSession,
        failAction: Response.invalidated,
      },
      handler: Handlers.createUserSessionHandler,
    },
  },

  {
    method: 'POST',
    path: '/sessions/register',
    config: {
      cors: {
          origin: ['*'],
      },
      tags: ['api'],
      description: 'Register New User by Inserting into Database the following Information',
      validate: {
        payload: Payloads.registerUserSession,
        failAction: Response.invalidated,
      },
      handler: Handlers.registerUserSessionHandler,
    },
  },

  {
    method: 'POST',
    path: '/artwork/upload',
    config: {
      cors: {
          origin: ['*'],
      },
      tags: ['api'],
      description: 'uploads artwork',
      validate: {
        payload: Payloads.postArtwork,
        failAction: Response.invalidated,
      },
      handler: Handlers.postArtworkHandler,
    },
  },

  {
    method: 'GET',
    path: '/artwork/find',
    config: {
      cors: {
          origin: ['*'],
      },
      tags: ['api'],
      description: 'finds artwork',
      validate: {
        query: {
          filter: Joi.string().valid('genre', 'type').required(),
          value: Joi.string().required()
        },
        failAction: Response.invalidated,
      },
      handler: Handlers.getArtworkHandler,
    },
  },
  {
    method: 'POST',
    path: '/artwork/purchase',
    config: {
      cors: {
          origin: ['*'],
      },
      tags: ['api'],
      description: 'Purchases A Piece of Art',
      validate: {
        payload: Payloads.purchaseArtwork, 
        failAction: Response.invalidated,
      },
      handler: Handlers.purchaseArtHandler,
    },
  },
  {
    method: 'POST',
    path: '/artwork/ship',
    config: {
      cors: {
          origin: ['*'],
      },
      tags: ['api'],
      description: 'Ships a piece of Art',
      validate: {
        payload: Payloads.shipArtwork, 
        failAction: Response.invalidated,
      },
      handler: Handlers.shipArtworkHandler,
    },
  },
];
