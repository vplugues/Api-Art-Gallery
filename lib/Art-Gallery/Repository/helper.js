'use strict';
const User = require('./User');

const helper = {

  validateUser(username, password) {
    return new Promise((resolve, reject) => {
      const user = new User(username, password);
      user.checkUserQuery().then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  },


  registerUser(username, password) {
    return new Promise((resolve, reject) => {
      const user = new User(username, password);
      user.registerUserInserting().then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  },
};

module.exports = helper;
