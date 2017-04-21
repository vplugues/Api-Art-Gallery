'use strict';
const Artwork = require('./Artwork');

const helper = {

  postArtwork(artworkDetails) {
    console.log('Post Artwork');
    return new Promise((resolve, reject) => {
      const name =  artworkDetails.name;
      const genre = artworkDetails.genre;
      const type = artworkDetails.type;
      const price = artworkDetails.price;
      const consignerId = artworkDetails.consigner;
      const status = artworkDetails.status;
      const description = artworkDetails.description;
      const shippingInfo = artworkDetails.shippingInfo;
      const buffer = artworkDetails.buffer;
      const artwork = new Artwork(consignerId);

      artwork.postArtwork(name, type, genre, status, price, shippingInfo, description, buffer)
      .then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  },

  getArtwork(filter, value) {
    console.log('Get Artwork');
    return new Promise((resolve, reject) => {
      const artwork = new Artwork();

      artwork.getArtwork(filter, value).then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  },
};

module.exports = helper;
