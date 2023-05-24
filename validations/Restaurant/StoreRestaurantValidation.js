const { body } = require("express-validator");

const StoreRestaurantValidation = [
    body("name", "Name cannot be empty").notEmpty(),
    body("description", "Description cannot be empty").notEmpty(),
    body("address", "Address cannot be empty").notEmpty(),
];

module.exports = StoreRestaurantValidation;