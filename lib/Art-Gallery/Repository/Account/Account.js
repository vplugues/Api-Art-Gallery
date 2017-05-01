
require('dotenv').config();
const moment = require('moment');
const fs = require('fs');

module.exports = class Account {
  constructor(collectorId, balance, paymentInfo) {
    this.collectorId = collectorId || 0;
    this.type = paymentInfo.type || '';
    this.cardNumber = paymentInfo.cardNumber || 0;
    this.expDate =  paymentInfo.expDate || 0;
    this.cvv =  paymentInfo.cvv || 0;
    this.balance = balance;
    this.database = { table: 'accountpractice' };
  }

  openAccount() {
    console.log('Opening Account')
    return new Promise((resolve, reject) => {
      const mongo = require('mongodb');
      var MongoClient = mongo.MongoClient
      const url = 'mongodb://localhost:27017/clear';

      MongoClient.connect(url, (err, db) => {
        if(err) reject('Connection Error')
        else {
          const AccountTable = db.collection(this.database.table);
          let account = { _id: new mongo.ObjectID(this.collectorId)};
          const set = { type: this.type, cardNumber: this.cardNumber,
                      expDate: this.expDate, cvv: this.cvv, balance: this.balance };
          AccountTable.findOneAndUpdate(account, {$set: set }, (err, doc) => {
            if(err) reject(err);
            if(doc.value === null) {
              db.close();
              MongoClient.connect(url, (err, db) => {
                const AccountTable = db.collection(this.database.table);
                account = {_id: new mongo.ObjectID(this.collectorId), type: this.type, cardNumber: this.cardNumber,
                          expDate: this.expDate, cvv: this.cvv, balance: this.balance}
                AccountTable.insert(account, {w: 1}, (insertErr, insertRes) => {
                  if(insertErr) reject('Account Did Not Open Correctly');
                  resolve('Account Opened and Charged')
                });
              });
              db.close();
            } else resolve('Account Opened and Charged')
          });
          db.close();
        }
      });
    });
  }
};
