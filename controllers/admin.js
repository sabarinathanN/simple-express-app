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
 Product.create({title:title,
   imageurl:image,
   price:price, 
   description:description,
  userId:req.user.id
  })
   .then(result =>{
    console.log(result)
    res.redirect('/products')
   })
   .catch(err =>{
    console.log(err)
   })
};
exports.getEditProduct = (req, res, next) => {
  //always the value of query params is string "true" like thiss
  const editMode = req.query.edit
  if(!editMode){
    return res.redirect('/')
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then(product =>{
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'edit Product',
      path: '/admin/edit-product',
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
  // const updatedProduct = new Product(prodId, updatedTitle, updatedImage, updatedPrice, updatedDescription);
Product.findByPk(prodId)
.then(product =>{
  product.title = updatedTitle;
  product.imageurl = updatedImage;
  product.price = updatedPrice;
  product.description = updatedDescription;
  return product.save();
})
.then(resulr =>{
  console.log("UPDATED PRODUCT");
  res.redirect('/admin/products')
})
.catch(err =>{
  console.log(err)
})
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products) => {
    res.render('admin/products', {
      prods: products,  
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err =>{
    console.log(err)
  })
};

exports.postDeleteProduct = (req,res,next) =>{
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product =>{
    return product.destroy();
  })
  .then(result =>{
    console.log(result);
    res.redirect('/admin/products');
  })
  .catch(err =>{
    console.log(err)
  })
}
