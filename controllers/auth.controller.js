const db = require('../db');
const md5 = require('md5');
module.exports.login = (req, res) => {

    res.render('auth/login');
};
module.exports.postLogin = (req, res) => {
    let email = req.body.email;
    let pass = md5(req.body.password);
    let user = db.get('users').find({ email: email }).value();
    if (!user) {
        res.render('auth/login', {
            errs: [
                'User does not exist!'
            ],
            data: req.body
        });
        return;
    };
    if (user.password !== pass) {
        res.render('auth/login', {
            errs: [
                'Wrong password!'
            ],
            data: req.body
        });
        return;
    };
    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect('/users');

};