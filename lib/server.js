'use strict';

const Hapi = require('hapi');
const Config = require('config').application;
const Inert = require('inert');
const Vision = require('vision');
const Swagger = require('hapi-swagger');
const AuthBearerToken = require('hapi-auth-bearer-token');
const pack = require('../package');

// require all configuration from .env files
require('dotenv').config();

const server = new Hapi.Server({
  debug: {
    request: ['error', 'uncaught'],
  },
});

server.connection({ port: Config.api.port, host: Config.api.host, routes: { cors: true } });

const plugins = [
  AuthBearerToken,
  Vision,
  Inert,
  require('./Art-Gallery'),
   {
    register: Swagger,
    options: {
      info: {
        title: 'Art Gallery API Documentation',
        version: pack.version,
      },
      jsonEditor: true,
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
      security: [{ Bearer: [] }],
      schemes: Config.schemes,
    },
  },
];

server.register(plugins, (error) => {
  if (error) {
    throw (error);
  }
  
  server.auth.strategy('token', 'bearer-access-token', {
    validateFunc: (token, callback) => {
      if (Config.api.tokens.indexOf(token) !== -1) {
        return callback(null, true, { token });
      }
      return callback(null, false, { token });
    },
  });

  server.auth.default('token');
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });
});

module.exports = server;
