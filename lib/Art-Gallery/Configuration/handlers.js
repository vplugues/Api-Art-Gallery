'use strict';

const Response = require('./../../response');
const UserHelper = require('./../Repository/User/helper');
const ArtworkHelper = require('./../Repository/Artwork/helper');

module.exports = {
  
  
  createUserSessionHandler: (request, reply) => {
    const username = request.payload.username;
    const password = request.payload.password;
    UserHelper.validateUser(username, password).then(result => {
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
    
    UserHelper.registerUser(username, password, firstName, lastName).then(result => {
      return reply(Response.getSuccessMessage(result)).code(200);
    }).catch(err => {
      return reply(Response.getErrorMessage(err)).code(200);
    });
  },

  postArtworkHandler: (request, reply) => {
    const artworkInfo = {
      name:  request.payload.name || '',
      genre: request.payload.genre || '',
      type: request.payload.type || '',
      price: request.payload.price || '',
      consigner: request.payload.consigner || '',
      status: request.payload.status || '',
      description: request.payload.description || '',
      shippingInfo: request.payload.shippingInfo || '',
      buffer:  request.payload.buffer || '',
    }

    ArtworkHelper.postArtwork(artworkInfo).then(result => {
      return reply(Response.getSuccessMessage(result)).code(200);
    }).catch(err => {
      return reply(Response.getErrorMessage(err)).code(200);
    });

  }
  
};
