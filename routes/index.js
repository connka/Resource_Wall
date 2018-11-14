const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.use(function(req, res, next) {
    global.cookie = 'cookie'; // cookie = 'cookie'
    global.session = req.session.userID;
    next();
});

  /* GET */
// Get home page
router.get('/', indexController.render_homepage);
// Get resources
router.get('/resources', indexController.render_resources);
// Get register
router.get('/register', indexController.render_register);
// Get user page
router.get('/user/:id', indexController.render_user);

  /* POST */
// Post to login
router.post('/login', indexController.post_login);
// Post to register
router.post('/register', indexController.post_register);
// Post to logout
router.post('/logout', indexController.post_logout);
// Post to edit user
router.post('/user/:id', indexController.post_user);
// Post to resouces
router.post('/resources', indexController.render_resources);

  /* ERROR HANDLERS */

// Get error handler login err
router.get('/loginErr', indexController.render_loginErr);
// Get error handler bad request
router.get('/badReq', indexController.render_badreq);


module.exports = router;