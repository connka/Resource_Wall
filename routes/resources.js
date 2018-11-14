const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resourcesController');

// Sets cookie and session globally
// Cookie is used strictly for testing
router.use(function(req, res, next) {
  global.cookie = 'cookie'; // cookie = 'cookie'
  global.session = req.session.userID;
  next();
});
// Get URLS page
router.get('/', resourcesController.render_urls);
// Get new URL page
router.get('/new', resourcesController.render_new);
// Get URLS id page
router.get('/:id', resourcesController.render_id);
// Post to URLS
router.post('/', resourcesController.post_new);
// Post to update ID
router.post('/:id/update', resourcesController.post_update);
// Post to delete ID
router.post('/:id/delete', resourcesController.post_delete);

module.exports = router;