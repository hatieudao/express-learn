const db = require('../db');
const shortid = require('shortid');
module.exports.index = (req, res) => res.render('users/index', { users: db.get('users').value() });
module.exports.search = (req, res) => {
    let q = req.query.q;
    const users = db.get('users').value();
    let resultSearchUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    res.render('users/index', { users: resultSearchUsers, querry: q });
};
module.exports.create = (req, res) => {
    res.render('users/create')
};
module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    db.get('users').push(req.body).write();
    res.redirect('/users');
};
module.exports.get = (req, res) => {
    let id = req.params.userId;
    const user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    });
};