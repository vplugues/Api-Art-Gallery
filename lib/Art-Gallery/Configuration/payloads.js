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
    email: Joi.string().required(),
    type: Joi.string().valid('collector', 'artist').required(),
    shippingAddress: Joi.object({
      street1: Joi.string().required(),
      street2: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
    }).required(),
  },
  postArtwork: {
    name: Joi.string().required(),
    genre: Joi.string().optional(),
    type: Joi.string().required(),
    price: Joi.number().required(),
    consigner: Joi.string().required(),
    status: Joi.string().required(),
    description: Joi.string().required(),
    shippingInfo: {
      weight: Joi.number().optional(),
      size: Joi.number().optional(),
      length: Joi.number().optional(),
      width: Joi.number().optional(),
      thickness: Joi.number().optional(),
    },
    buffer: Joi.binary().encoding('base64').required(),
  },
  purchaseArtwork: {
    userId: Joi.string().required(),
    pieces: Joi.array().items({
      id: Joi.string().required(),
      qty: Joi.number().required()
    }).min(1).required(),
    paymentInfo: Joi.object({
      type: Joi.string().valid('V', 'M', 'D', 'A').required(),
      cardNumber: Joi.number().required(),
      expDate: Joi.string().required(),
      cvv: Joi.string().required(),
    }),
  },
  shipArtwork: {
    userId: Joi.string().required(),
    pieces: Joi.array().items({
      id: Joi.string().required(),
      qty: Joi.number().required()
    }).min(1).required(),
    paymentInfo: Joi.object({
      type: Joi.string().valid('V', 'M', 'D', 'A').required(),
      cardNumber: Joi.number().required(),
      expDate: Joi.string().required(),
      cvv: Joi.string().required(),
    }),
  }
};
