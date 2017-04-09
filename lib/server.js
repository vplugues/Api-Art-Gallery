'use strict';

const Hapi = require('hapi');
const Config = require('config');

// require all configuration from .env files
require('dotenv').config();

const server = new Hapi.Server();
server.connection({ port: Config.application.api.port, host: Config.application.api.host, routes: { cors: true } });

const plugins = [
  require('./Art-Gallery'),
];

server.register(plugins, (error) => {
  if (error) {
    throw (error);
  }
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('class buyer');
    console.log(`Server running at: ${server.info.uri}`);
  });
});

module.exports = server;
