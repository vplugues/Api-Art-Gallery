
require('dotenv').config();

module.exports = class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.database = { table: 'practiceusers'};
  }

  // Checks If User has account with us ussing Mongo DB on my Local Machine
  checkUserQuery() {
    console.log('Check User');

    return new Promise((resolve, reject) => {
      var MongoClient = require('mongodb').MongoClient
      const url = 'mongodb://localhost:27017/clear';
      MongoClient.connect(url, (err, db) => {
        if(err) reject('Connection Error')
        else {
          const Users = db.collection(this.database.table);
          const user = { first: { $exists: true } };
          Users.find(user).toArray((err, docs) => {
            console.log(docs);
            if(err) reject(err);
            if(docs && docs.length > 0 ) resolve(docs);
            reject('Wrong Crentials');
          });
          db.close();
        }
      });
    });
  }

  // Registers User into Mongo DB on my Local Machine
  registerUserInserting() {
    console.log('Register User');
    return new Promise((resolve, reject) => {
      var MongoClient = require('mongodb').MongoClient
      const url = 'mongodb://localhost:27017/clear';
      MongoClient.connect(url, (err, db) => {
        if(err) reject('Connection Error')
        else {
          const Users = db.collection(this.database.table);
          const user = {username: this.username, password: this.password};
          Users.insert(user, {w: 1}, (insertErr, insertRes) => {
            if(insertErr) reject('There was an insert error');
            else {
              console.log(insertRes);
              resolve('User Inserted');
            }
          });
          db.close();
        }
      });
    });
  }
};
