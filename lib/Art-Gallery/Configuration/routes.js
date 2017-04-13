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
];
