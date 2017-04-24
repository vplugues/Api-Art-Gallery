
require('dotenv').config();
const Account = require('./../Account/Account');
const moment = require('moment');
const fs = require('fs');

module.exports = class Order {
  constructor(collectorId, items, paymentInfo) {
    this.collectorId = collectorId || 0;
    this.items = items || '';
    this.balance = 0;
    this.paymentInfo = paymentInfo || {};
    this.database = { table: 'orderpractice'};
  }

  createOrder() {
    console.log('Creating Order');
    return new Promise((resolve, reject) => {
      this.calculateBalance().then(result => {
        const account = new Account(this.collectorId, this.balance, this.paymentInfo)
        .openAccount().then(result => {
          const mongo = require('mongodb');
          var MongoClient = mongo.MongoClient
          const url = 'mongodb://localhost:27017/clear';

          MongoClient.connect(url, (err, db) => {
            const OrderTable = db.collection(this.database.table);
            const order = {collectorId: this.collectorId, dateCreated: moment().format('MMDDYYHHmmss'), status: 'closed',
              balance: this.balance, items: this.items};
            OrderTable.insert(order, {w: 1}, (insertErr, insertRes) => {
              if(insertErr) reject('Order did not submit correctly');
              this.shipOrder().then(shipResult => {
                resolve(shipResult);
              }, shipError => {
                console.log(shipError);
                reject(shipError);
              });
            });
          });
        }, accountError => {
          reject(`Calculate Balance Error: ${accountError}`);
        });
      }, balanceError => {
        reject(`Calculate Balance Error: ${balanceError}`);
      });
    });
  }

  calculateBalance() {
    console.log('Calculating Balance');
    return new Promise((resolve, reject) => {
      const mongo = require('mongodb');
      var MongoClient = mongo.MongoClient
      const url = 'mongodb://localhost:27017/clear';

      MongoClient.connect(url, (err, db) => {
        if(err) reject('Connection Error')
        else {
          let itemsProcessed = 0;
          const ArtworkTable = db.collection('artworkpractice');
          for(let i = 0; i < this.items.length; i++) {
            var o_id = new mongo.ObjectID(this.items[i].id);
            ArtworkTable.findOne({ _id: o_id }, { fields: { price: 1 }}, (err, doc) => {
              itemsProcessed++;
              if(err) reject(err);
              if(doc) {
                this.balance += Number.parseInt(this.items[i].qty, 10) * Number.parseFloat(doc.price);
              }
              if(itemsProcessed === this.items.length) {
                resolve(true);
              }
            });
          }
        }
      });
    });
  }

  shipOrder() {
    console.log('Shipping Order');
    return new Promise((resolve, reject) => {
      const mongo = require('mongodb');
      var MongoClient = mongo.MongoClient
      const url = 'mongodb://localhost:27017/clear';

      MongoClient.connect(url, (err, db) => {
        const OrderTable = db.collection(this.database.table);
        OrderTable.findOne({ collectorId: this.collectorId, status: 'closed'}, (err, doc) => {
          if(err) reject(err);
          else if(doc) {
            db.close();
            MongoClient.connect(url, (err, db) => {
              const UserTable = db.collection('practiceusers');
              const user = {_id: new mongo.ObjectID(this.collectorId)};
              UserTable.findOne(user, {fields: {shippingAddress: 1, firstName: 1, lastName: 1, email: 1}},
              (findErr, findRes) => {
                if(findErr) reject(`User Has Not Finished Paying Order`);
                const buyerInfo = {
                  Name: `${findRes.firstName} ${findRes.lastName}`,
                  Shipping_Address: findRes.shippingAddress || {},
                  Email: findRes.email || '',
                }
                resolve(buyerInfo);
              });
            });
            db.close();
          } else resolve(doc);
        });
      });
    });
  }
  
};
