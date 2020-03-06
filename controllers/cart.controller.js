const db = require('../db');

module.exports.addToCart = (req, res, next) => {
    let productId = req.params.productId;
    let sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/product');
        return;
    }
    let cnt = db.get('sessions').find({ id: sessionId }).get('cart.' + productId, 0).value();
    let total = db.get('sessions').find({ id: sessionId }).get('total', 0).value();
    db.get('sessions').find({ id: sessionId }).set('cart.' + productId, cnt + 1).write();
    db.get('sessions').find({ id: sessionId }).set('total', total + 1).write();
    //set local var
    res.locals.cartTotal = db.get('sessions').find({ id: sessionId }).value();

    let perPage = 9;
    let page = parseInt(req.query.page) || 1;
    let start = page * perPage;
    let end = start + perPage;
    let pageLink = [page - 1 > 0 ? page - 1 : 1, page, page + 1, page + 2, page + 3];
    let num = [page - 1 > 0 ? page - 1 : 1, page, page + 1, page + 2, page + 3];
    pageLink = pageLink.map(num => '?page=' + num);
    let product = db.get('products').value().slice(start, end);
    res.render('product/sell-Item', {
        product: product,
        pageLink: pageLink,
        num: num,
        total: total
    });
    // res.redirect('/product');
};