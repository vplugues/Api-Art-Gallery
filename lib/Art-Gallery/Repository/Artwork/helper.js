'use strict';
const Artwork = require('./Artwork');

const helper = {

  postArtwork(artworkDetails) {
    console.log('Handler Next');
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
      const artwork = new Artwork(name, type, genre, consignerId,
                          status, price, shippingInfo, description);

      artwork.postArtwork(buffer).then((result) => {
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  },
};

module.exports = helper;
