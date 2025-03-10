const FoodItem = require('../models/FoodItem');
const FoodCategory = require('../models/FoodCategory');


const getFoodItems = async (req, res) => {
  try {
   const items = await FoodItem.find().populate('category','name');
   res.json(items);
  } catch (error) {
    console.error('Error fetching food items:', error.message);
    res.status(500).send('Server Error');
  }
};

const createFoodItem = async (req, res) => {
  try {
    const { name, categoryId, img, options, description } = req.body;

    const category = await FoodCategory.findById(categoryId);
    if (!category) return res.status(400).json({ error: 'Invalid category ID' });

    const newItem = new FoodItem({
      name,
      category: categoryId,
      img,
      options,
      description
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating food item:', error.message);
    res.status(500).send('Server Error');
  }
};

const updateFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, img, options, description } = req.body;

    const updatedItem = await FoodItem.findByIdAndUpdate(
      id,
      { name, category: categoryId, img, options, description },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ error: 'Food item not found' });

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating food item:', error.message);
    res.status(500).send('Server Error');
  }
};




const deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await FoodItem.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ error: 'Food item not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting food item:', error.message);
    res.status(500).send('Server Error');
  }
};

const getCategory = async(req,res)=>{
  try{
    const category = await FoodCategory.find();
    if(!category) return res.status(404).json({error:"Cannot find any category"});
     res.status(201).json(category);

  }
  catch(error){
    console.log("Error searchinf Category",error.message);
    res.status(500).send('Server Error');
  }
}

const uploadFoodItemsBulk = async (req, res) => {
  try {
    const foodItems = req.body;

    if (!Array.isArray(foodItems) || foodItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No food items provided' });
    }

    const categoryCache = {}; // cache to avoid multiple DB calls

    const operations = await Promise.all(foodItems.map(async (item) => {
      const category = item.category?.trim();
      if (!category) throw new Error(`Missing category in item: ${item.name}`);

      // Check if category already fetched
      let categoryId = categoryCache[category];

      // If not cached, find or create category
      if (!categoryId) {
       let categoryDoc = await FoodCategory.findOneAndUpdate(
  { name: category },
  { $setOnInsert: { name: category } },
  { new: true, upsert: true }
);


        if (!categoryDoc) {
          categoryDoc = await FoodCategory.create({ name: category });
        }

        categoryId = categoryDoc._id;
        categoryCache[category] = categoryId;
      }

      return {
        updateOne: {
          filter: { name: item.name, category: categoryId },
          update: {
            $set: {
              name: item.name,
              img: item.img,
              options: item.options,
              description: item.description,
              category: categoryId,
            },
          },
          upsert: true,
        },
      };
    }));

    const result = await FoodItem.bulkWrite(operations);

    return res.status(200).json({
      success: true,
      message: 'Food items uploaded successfully',
      inserted: result.upsertedCount,
      modified: result.modifiedCount,
    });
  } catch (error) {
    console.error('Error uploading food items in bulk:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};



module.exports = {
  createFoodItem,
  getFoodItems,
  uploadFoodItemsBulk,
  deleteFoodItem,
  updateFoodItem,
  getCategory


};
