const router = require('express').Router();



router.get("/", (req, res) => {
    res.render("index")

});
router.get("/create", (req, res) => {
    res.render("form")

});


module.exports = router;