const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const Cart = require('./cart')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title,image,price,description) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.price = price;
    this.description = description;
  }

  save() {
  
    getProductsFromFile(products => {
      if(this.id){
          const existingProductsIndex = products.findIndex(prod => prod.id === this.id);
          const updatedProducts = [...products];
          updatedProducts[existingProductsIndex] = this;
          fs.writeFile(p, JSON.stringify(updatedProducts), err => {
            console.log(err);
          });
      }
      else{
        this.id = Math.random().toString()
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
      
    });
  }

  static deleteById(id) {
    getProductsFromFile(products =>{
      const UpdatedProduct = products.filter(p => p.id !== id)
      fs.writeFile(p,JSON.stringify(UpdatedProduct),err =>{
        if(!err){
          Cart.deleteProduct(id, product.price);
        }
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findByID(id,cb){
    getProductsFromFile(products =>{
      const product = products.find(p => p.id === id);
      cb(product)
    });
  }
};
