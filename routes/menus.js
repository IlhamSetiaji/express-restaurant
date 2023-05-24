const express = require('express');
const router = express.Router();
const StoreMenuValidation = require('../validations/Menu/StoreMenuValidation');
const MenuController = require('../controllers/MenuController');

router.get('/:id', MenuController.getMenusByRestaurant);
router.get('/create/:id', MenuController.createMenu);
router.post('/store/:id', StoreMenuValidation, MenuController.storeMenu);
router.get('/edit/:id/:menuId', MenuController.editMenu);
router.post('/update/:id/:menuId', StoreMenuValidation, MenuController.updateMenu);
router.get('/delete/:id/:menuId', MenuController.deleteMenu);

module.exports = router;