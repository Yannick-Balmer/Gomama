
const { createIds } = require('../controllers/api/api-firebase/controller/api-firebase.controller.js');
const router = require('express').Router();

router.get('/create', createIds);


module.exports = router;