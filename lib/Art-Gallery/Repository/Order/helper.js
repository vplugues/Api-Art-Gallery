'use strict';
const Order = require('./Order');

const helper = {

  createOrder(collector, items, paymentInfo) {
    console.log('Create Order');
    return new Promise((resolve, reject) => {
      const order = new Order(collector, items, paymentInfo);

      order.createOrder().then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  },

  shipOrder(collector, items, paymentInfo) {
    console.log('Ship Order');
    return new Promise((resolve, reject) => {
      const order = new Order(collector);

      order.shipOrder().then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  }
};

module.exports = helper;
