const express = require('express');
const router = express.Router();
const fetchDetails = require("../middleware/fetchdetails")
const { createFoodItem,updateFoodItem,deleteFoodItem,uploadFoodItemsBulk,getFoodItems,getCategory} = require('../controllers/FoodItemController');

router.post('/createfood',createFoodItem);
router.get('/getfooditem', getFoodItems);
router.get('/getcategory',getCategory);
router.put('/updatefood',updateFoodItem);
router.delete('/deletefood',deleteFoodItem);
router.post('/uploadbulk',uploadFoodItemsBulk);

module.exports = router;
