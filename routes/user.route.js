const express = require('express');
var multer = require('multer');
const authMiddleware = require('../middlewares/auth.middleware');
const db = require('../db');
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const router = express.Router();
router.get('/', authMiddleware.requireAuth, controller.index);
// router.get('/cookie', (req, res, next) => {
//     res.cookie('user-id', 12345);
//     res.send('hello');
// });
var upload = multer({ dest: './public/uploads/' });
//CREATE
router.get('/create', controller.create);
router.post('/create', upload.single('avatar'),
    validate.postCreate,
    controller.postCreate);
//VIEW
router.get('/seemore/:userId', controller.get);
//SEARCH
router.get('/search', controller.search);

module.exports = router;