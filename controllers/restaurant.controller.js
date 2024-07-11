const { where } = require("sequelize");
const Restaurant = require("../models/restaurant.model");

//Create and Save a new restaurant
exports.create = async (req, res) => {
  const { name, type, imageUrl } = req.body;
  //Varidate data
  if (!name || !type || !imageUrl) {
    res.status(400).send({
      message: "Name, Type or ImageUrl can not be empty!",
    });
    return;
  }

  await Restaurant.findOne({ where: { name: name } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({
        message: "Restaurant aleady exists!",
      });
      return;
    }
    //create a restaurant
    const newRestaurant = {
      name: name,
      type: type,
      imageUrl: imageUrl,
    };
    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something error occured while creating the restaurant.",
        });
      });
  });
};

//Get all restaurant
exports.getAll = async (req, res) =>{
    await Restaurant.findAll().then((data)=>{
        res.send(data)
    })
    .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something error occured while creating the restaurant.",
        });
    });
};  

//Get By ID
exports.getById = async (req, res) => {
    const id = req.params.id;
    await Restaurant.findByPk(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "No found Restaurant with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something error occured while creating the restaurant.",
        });
      });
};

//Update a restaurant
exports.Update = async (req, res) =>{
    const id = req.params.id;
    console.log(id, req.body);
    await Restaurant.update(req.body, {
      where: {
        id: id,
      },
    })
      .then((num) => {
        console.log(num);
        if (num === 1) {
          res.send({ message: "Restaurant was update successfully" });
        } else {
          res.send({
            message:
              "Cannot update restaurant with id=" +
              id +
              ". Maybe restaurant was not found or req.body is empty!",
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something error occured while creating the restaurant.",
        });
      });
}

//delete a restaurant 
exports.delete = async (req, res) => {
    const id = req.params.id;
    console.log(id, req.body);
    await Restaurant.update(req.body, { where: {id: id,},})
      .then((num) => {
        console.log(num);
        if (num === 1) {
          res.send({ message: "Restaurant was deleted successfully" });
        } else {
          res.send({
            message:
              "Cannot delete restaurant with id=" + id +
              ".",
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something error occured while creating the restaurant.",
        });
      });
}
