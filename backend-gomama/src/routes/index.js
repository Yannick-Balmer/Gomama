const apiScreenRoutes = require("./api-screen.routes");
const apiFirebaseRoutes = require("./api-firebase.routes");
const gomamaRoutes = require('./gomama.routes');
const router = require("express").Router();



router.use("/screen", apiScreenRoutes);
router.use("/firebase", apiFirebaseRoutes);
router.use("/gomama", gomamaRoutes);

router.get("/", (req, res) => res.redirect("/gomama/"));

module.exports = router;