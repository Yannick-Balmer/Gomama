
const { createScreens } = require('../controllers/api/api-screen/controller/api-screen.controller');
const router = require('express').Router();

router.get('/create', createScreens);


module.exports = router;