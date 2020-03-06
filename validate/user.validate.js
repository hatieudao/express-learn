module.exports.postCreate = (req, res, next) => {
    let errs = [];
    if (!req.body.name) {
        errs.push('Name is required!');
    }
    if (!req.body.phone) {
        errs.push('Phone is required!');
    }
    if (errs.length > 0) {
        res.render('users/create', {
            errs: errs,
            data: req.body
        });
        return;
    }
    next();
}