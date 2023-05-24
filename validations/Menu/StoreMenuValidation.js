const { body } = require("express-validator");

const StoreMenuValidation = [
    body("name", "Name cannot be empty").notEmpty(),
    body("description", "Description cannot be empty").notEmpty(),
    body("price", "Price cannot be empty").notEmpty()
];

module.exports = StoreMenuValidation;