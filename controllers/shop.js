const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProductId = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByID(productId, product => {
    res.render('shop/product-detail', {
      pageTitle: "product details",
      prods: product,
      path: '/products'
    })
  })

}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    })
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByID(prodId, (product) => {
    if (!product) {
      // Handle the case where the product is not found
      console.error('Product not found.');
      return res.redirect('/'); // Redirect to a suitable page or handle appropriately
    }

    const prod = product.price;
    Cart.addProduct(prodId, prod);
    res.redirect('/cart');
  });
};


exports.getOrder = (req, res, next) => {
  res.render('shop/order', {
    path: '/order',
    pageTitle: 'Your Order'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.postCartDeleteProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  Product.findByID(prodId,product => {
    Cart.deleteProduct(prodId,product.price);
    res.redirect('/cart')
  })
 
}