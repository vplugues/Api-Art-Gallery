'use strict';

const Joi = require('joi');

module.exports = {
  createUserSession: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
  registerUserSession: {
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  },
  postArtwork: {
    name: Joi.string().required(),
    genre: Joi.string().optional(),
    type: Joi.string().required(),
    price: Joi.string().required(),
    consigner: Joi.string().required(),
    status: Joi.string().required(),
    description: Joi.string().required(),
    shippingInfo: {
      weight: Joi.string().optional(),
      size: Joi.string().optional()
    },
    buffer: Joi.binary().encoding('base64').required(),
  },
};
