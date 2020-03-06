var Product = require('../models/product.model');
// const db = require('../db');
module.exports.index = async function(req, res, next) {
    // let perPage = 9;
    // let page = parseInt(req.query.page) || 1;
    // let start = page * perPage;
    // let end = start + perPage;
    // let pageLink = [page - 1 > 0 ? page - 1 : 1, page, page + 1, page + 2, page + 3];
    // let num = [page - 1 > 0 ? page - 1 : 1, page, page + 1, page + 2, page + 3];
    // pageLink = pageLink.map(num => '?page=' + num);
    // let product = db.get('products').value().slice(start, end);
    // res.render('product/sell-Item', {
    //     product: product,
    //     pageLink: pageLink,
    //     num: num
    // });

    var products = await Product.find();
    res.render('product/sell-Item', {
        product: products
    });

};