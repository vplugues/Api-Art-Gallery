
require('dotenv').config();
const moment = require('moment');
const fs = require('fs');

module.exports = class Artwork {
  constructor(consigner) {
    this.consigner = consigner || 0;
    this.database = { table: 'artworkpractice'};
  }

   // Post Artwork
  postArtwork(name, type, genre, status, price, shippingInfo, description, buffer) {
    console.log('Post Artwork');
    return new Promise((resolve, reject) => {
      var MongoClient = require('mongodb').MongoClient
      const url = 'mongodb://localhost:27017/clear';
      const fileName =
      `${this.consigner}${name}${type}${genre}${moment().format('MMDDYYHHmmss')}.png`;
      this.fileName = fileName.replace(/\s/g,''); // removes all spaces
      this.artBuffer = buffer;

      this.saveArtworkLocally((err, res) => {
        if(err) return callback('Artwork Did Post Successfully');
        MongoClient.connect(url, (err, db) => {
          if(err) reject('Connection Error')
          else {
            const ArtworkTable = db.collection(this.database.table);
            const artwork = {consigner: this.consigner, name, 
              genre, price, type, status, filename: this.fileName };

            ArtworkTable.insert(artwork, {w: 1}, (insertErr, insertRes) => {
              if(insertErr) reject('Artwork Did Post Successfully');
              else resolve('Artwork Inserted');
            });
            db.close();
          }
        });
      });
    });
  }
  // parameter filter can be genre,  status, 
  getArtwork(filter, value) {
    console.log('Finding Artwork');
    return new Promise((resolve, reject) => {
      var MongoClient = require('mongodb').MongoClient
      const url = 'mongodb://localhost:27017/clear';

      MongoClient.connect(url, (err, db) => {
        if(err) reject('Connection Error')
        else {
          const ArtworkTable = db.collection(this.database.table);
          let artwork = {};
          if(filter === 'genre') artwork = { genre: `${value}` };
          else if(filter === 'type') artwork = { type: `${value}` };
          ArtworkTable.find(artwork).toArray((err, docs) => {
            if(err) reject(err);
            if(docs && docs.length > 0 ) resolve(docs);
            reject('No Results Found');
          });
          db.close();
        }
      });
    });
  }
  saveArtworkLocally(callback) {
    console.log('Save and Update Artwork');

    fs.writeFile(`/artwork/${this.fileName}`, this.artBuffer, (error, data) => {
      if (error) return callback(error);
      return callback(null, 'Saved File');
    });
  }
};
