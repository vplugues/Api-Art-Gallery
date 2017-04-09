'use strict';

const Routes = require('./Configuration/routes');

exports.register = (server, options, next) => {
  server.route(Routes);
  next();
};

exports.register.attributes = { name: 'art-gallery', version: '0.0.1' };
