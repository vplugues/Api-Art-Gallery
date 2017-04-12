
require('dotenv').config();
const moment = require('moment');
const fs = require('fs');

module.exports = class Artwork {
  constructor(name, type, genre, consigner, status, price, shippingInfo, description) {
    this.name = name;
    this.type = type;
    this.consigner = consigner;
    this.status = status;
    this.price = price;
    this.genre = genre;
    this.shipping = this.shippingInfo;
    this.description = this.description;
    this.database = { table: 'artworkpractice'};
  }

  // Post Artwork
  postArtwork(buffer) {
    console.log('Post Artwork');
    return new Promise((resolve, reject) => {
      var MongoClient = require('mongodb').MongoClient
      const url = 'mongodb://localhost:27017/clear';
      const fileName = `${this.consigner}${this.name}${this.type}${this.genre}${moment().format('MMDDYYHHmmss')}.png`;
      this.fileName = fileName.replace(/\s/g,''); // removes all spaces
      this.artBuffer = buffer;

      this.saveArtworkLocally((err, res) => {
        if(err) return callback('Artwork Did Post Successfully');
        MongoClient.connect(url, (err, db) => {
          if(err) reject('Connection Error')
          else {
            const ArtworkTable = db.collection(this.database.table);
            const artwork = {consigner: this.consigner, name: this.name, 
              genre: this.genre, price: this.price, status: this.status,
              filename: this.fileName };

            ArtworkTable.insert(artwork, {w: 1}, (insertErr, insertRes) => {
              if(insertErr) reject('Artwork Did Post Successfully');
              else {
                console.log(insertRes);
                resolve('Artwork Inserted');
              }
            });
            db.close();
          }
        });
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
