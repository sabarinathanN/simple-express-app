const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title,image,price,description);
  product.save();
  res.redirect('/');
};
exports.getEditProduct = (req, res, next) => {
  //always the value of query params is string "true" like thiss
  const editMode = req.query.edit
  if(!editMode){
    return res.redirect('/')
  }
  const prodId = req.params.productId;
  Product.findByID(prodId, product => {
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'edit Product',
      path: '/admin/edit-product',
      // formsCSS: true,
      // productCSS: true,
      // activeAddProduct: true
      editing:editMode,
      product:product
    });
  })
 
};

exports.postEditProduct = (req,res,next) =>{
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImage = req.body.image;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImage, updatedPrice, updatedDescription);
updatedProduct.save();
res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    console.log(products);
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postDelete = (req,res,next) =>{
  const prodId = req.body.productId;
  Product.deleteById(prodId);
   res.redirect('/admin/products');
}
