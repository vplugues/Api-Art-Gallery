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
  }
};
