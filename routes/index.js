const express = require('express');
const router = express.Router();
const StoreRestaurantValidation = require('../validations/Restaurant/StoreRestaurantValidation')
const RestoController = require('../controllers/RestoController')

/* GET home page. */
router.get('/', RestoController.getRestaurants);
router.get('/create', RestoController.createRestaurant);
router.post('/', StoreRestaurantValidation, RestoController.storeRestaurant);
router.get('/edit/:id', RestoController.editRestaurant);
router.post('/update/:id', StoreRestaurantValidation, RestoController.updateRestaurant);
router.get('/delete/:id', RestoController.deleteRestaurant);

module.exports = router;
