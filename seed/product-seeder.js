const Product = require('../models/product');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user-data');

let products = [
  new Product({
    title: 'Pen',
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71yYPxpTP%2BL._SY355_.jpg',
    description: 'This is the pen',
    price: 10
  }),
  new Product({
    title: 'Watch',
    imagePath: 'https://cdn.shopify.com/s/files/1/0377/2037/products/WhiteGoldLeather.Front_large.jpg?v=1490307659',
    description: 'This is the watch',
    price: 11
  }),
  new Product({
    title: 'Book',
    imagePath: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/8552631/leather_book_preview.png',
    description: 'This is the book',
    price: 12
  }),
  new Product({
    title: 'Phone',
    imagePath: 'https://i5.walmartimages.com/dfw/4ff9c6c9-9356/k2-_c59a878c-3d51-4807-aabd-84b0410de921.v1.jpg',
    description: 'This is the phone',
    price: 13
  })
];

let done = 0;
products.map((product) => {
  product.save((err, result) => {
    done++;
    if(done === products.length) {
      exit();
    }
  });
});

function exit() {
  mongoose.disconnect();
}