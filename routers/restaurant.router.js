const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");

//Create a restaurant
//POST http://localhost:5000/api/v1/restaurants/
router.post("/", restaurantController.create);

//Get All restaurant
router.get("/", restaurantController.getAll);

//Get a restaurant by id
router.get("/:id", restaurantController.getById);

//Update a restaurant by Id
router.get("/:id", restaurantController.getById);

//Delete a restaurant by Id
router.get("/:id", restaurantController.getById);

module.exports = router;
