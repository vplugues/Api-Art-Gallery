'use strict';

const Response = require('./../../response');
const Helper = require('./../Repository/helper');

module.exports = {
  
  
  createUserSessionHandler: (request, reply) => {
    const username = request.payload.username;
    const password = request.payload.password;
    Helper.validateUser(username, password).then(result => {
      return reply(result);
    }).catch(err => {
      return reply(Response.getErrorMessage(err)).code(200);
    });
  },


  registerUserSessionHandler: (request, reply) => {
    const username = request.payload.username;
    const password = request.payload.password;
    const firstName = request.payload.firstName;
    const lastName = request.payload.lastName;
    
    Helper.registerUser(username, password, firstName, lastName).then(result => {
      return reply(Response.getSuccessMessage(result)).code(200);
    }).catch(err => {
      return reply(Response.getErrorMessage(err)).code(200);
    });
  },
  
};
