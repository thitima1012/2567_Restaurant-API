const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");
const {authJwt} = require("../middlewares");

//Create a restaurant
//POST http://localhost:5000/api/v1/restaurants/
router.post("/",[authJwt.verifyToken, authJwt.isModOrAdmin], restaurantController.create);

//Get All restaurant
router.get("/", restaurantController.getAll);

//Get a restaurant by id
router.get("/:id",[authJwt.verifyToken], restaurantController.getById);

//Update a restaurant by Id
router.get("/:id",[authJwt.verifyToken, authJwt.isModOrAdmin], restaurantController.Update);

//Delete a restaurant by Id
router.get("/:id",[authJwt.verifyToken, authJwt.isAdmin], restaurantController.delete);

module.exports = router;
