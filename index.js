const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');

const sessionMiddleWare = require('./middlewares/session.middleware');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const cartRoute = require('./routes/cart.route');
const productRoute = require('./routes/product.route');
const app = express();

//BODY-PARSER
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SECRET_STR));
//LOWDB
const port = 3000;
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(sessionMiddleWare);


app.get('/', (req, res) => res.render('index', {
    name: 'Hoang_Anh'
}));
const db = require('./db');
//const controller = require('../controllers/user.controller');

const router = express.Router();

app.use('/users', userRoute);
app.use('/auth', authRoute);
// app.get('/product', (req, res) => {

//     // let perPage = 9;
//     // let page = parseInt(req.query.page) || 1;
//     // let start = page * perPage;
//     // let end = start + perPage;
//     // let pageLink = [page - 1 > 0 ? page - 1 : 1, page, page + 1, page + 2, page + 3];
//     // let num = [page - 1 > 0 ? page - 1 : 1, page, page + 1, page + 2, page + 3];
//     // pageLink = pageLink.map(num => '?page=' + num);
//     // let product = db.get('products').value().slice(start, end);
//     // res.render('product/sell-Item', {
//     //     product: product,
//     //     pageLink: pageLink,
//     //     num: num
//     // });
// });
app.use('/cart', cartRoute);
app.use('/product', productRoute);
app.use(csurf({ cookie: true }));
app.listen(port, () => console.log('Server listenong on port ' + port));