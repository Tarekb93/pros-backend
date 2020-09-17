const express = require("express");
const router = express.Router();

const auth = require("./auth");
const error = require("./error");
const authC = require("../middlewares/authCheck");
const workersController = require("./workers");
const professionController = require("./profession");

// add home route

router.get("/login", auth.loginPage);
router.get("/workers/location/:name", workersController.fetchWorkerLocation);
router.get(
  "/workers/profession/:name",
  workersController.fetchProfessionalName
);

router.get("/professions", professionController.fetchProfessionals);
router.get("/workers", workersController.fetchWorkers);
router.get("/register", auth.registerPage);
router.post("/authenticate", auth.authenticate);
router.post("/addUser", auth.addUser);
router.get("/logout", auth.logout);
router.use(error.client);
router.use(error.server);

module.exports = router;
