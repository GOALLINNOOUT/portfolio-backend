const express = require('express');
const router = express.Router();
const aboutAuthorController = require('../controllers/aboutAuthorController');
const auth = require('../middleware/auth');

router.get('/', aboutAuthorController.getAboutAuthor);
router.put('/', auth, aboutAuthorController.updateAboutAuthor);

module.exports = router;
