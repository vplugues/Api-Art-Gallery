
require('dotenv').config();

module.exports = class User {
  constructor(username, password, firstName, lastName, type, email, shipping) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.type = type || '';
    this.email = email || '';
    this.shippingAddress = shipping || '';
    this.database = { table: 'practiceusers'};
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
          const user = { username: this.username, password: this.password, 
                        firstName: this.firstName, lastName: this.lastName,
                        email: this.email, shippingAddress: this.shippingAddress};
          Users.insert(user, {w: 1}, (insertErr, insertRes) => {
            console.log(insertRes);
            if(insertErr) reject('There was an insert error');
            else resolve('User Inserted');
          });
          db.close();
        }
      });
    });
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
          const user = { username: this.username, password: this.password, type: this.type };
         
          Users.find(user).toArray((err, docs) => {
            console.log('Records Found: ', docs);
            if(err) reject(err);
            if(docs && docs.length > 0 ) resolve(docs);
            reject('Wrong Crentials');
          });
          db.close();
        }
      });
    });
  }
};
