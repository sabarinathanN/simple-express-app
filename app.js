const path = require('path');
const sequelize = require('./util/dataBase');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-items');

const app = express();

// db.execute('SELECT * FROM products').then(data =>{
//     console.log(data);
// }).catch();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const product = require('./models/product');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



//adding new middleware for the user Model
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//making relation using sequelize between all tables
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(product,{through: CartItem});
Product.belongsToMany(Cart,{through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through: OrderItem});


// sequelize.sync({force:true})
sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {

    if (!user) {
      return User.create({ name: 'sabari', email: 'sabarinathan25052001@gmail.com' });
    }
    return user;
  })
  .then(user => {
    return user.createCart();
    
  })
  
  .then(cart =>{
app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });


