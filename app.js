const path = require('path');
const sequelize = require('./util/dataBase');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

// db.execute('SELECT * FROM products').then(data =>{
//     console.log(data);
// }).catch();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
//adding new middleware for the user Model
app.use((req,res,next) =>{
User.findByPk(1)
.then(user =>{
    req.user = user;
    next()
})
.catch(err =>{
    console.log(err)
})
})

//making relation using sequelize
Product.belongsTo(User ,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product)

// sequelize.sync({force:true})
sequelize.sync()
.then(result =>{ 
    return User.findByPk(1);

})
.then(user =>{
    if(!user){
        return User.create({name:"sabari",email:"sabarinathan25052001@gmail.com"});
    }
    return user;
})
.then(user =>{
    app.listen(3000);
})
.catch(err =>{
    console.log(err);
});


