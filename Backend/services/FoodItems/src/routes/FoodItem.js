const express = require('express');
const foodRouter = express.Router();
const fetchDetails = require("../middleware/fetchdetails")
const { createFoodItem,updateFoodItem,deleteFoodItem,uploadFoodItemsBulk,getFoodItems,getCategory} = require('../controllers/FoodItemController');

foodRouter.post('/createfood',createFoodItem);
foodRouter.get('/getfooditem', getFoodItems);
foodRouter.get('/getcategory',getCategory);
foodRouter.put('/updatefood',updateFoodItem);
foodRouter.delete('/deletefood',deleteFoodItem);
foodRouter.post('/uploadbulk',uploadFoodItemsBulk);

module.exports = foodRouter;
