const categoryModel = require("../models/category");

class categorycontroller {
  static categoryInsert = async (req, res) => {
    try {
      const { name, icon, vacancy } = req.body;
      const Category = new categoryModel({
        name: name,
        icon: icon,
        vacancy: vacancy,
      });

      await Category.save();

      res.status(201).json({
        status: "success",
        message: "Insert success",
        Category,
      });

      // Removed res.redirect("/")
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while inserting the category",
        error: error.message,
      });
    }
  };

  static categoryDisplay = async (req, res) => {
    try {
      const Category = await categoryModel.find();
      res.status(200).json({
        status: "success",
        message: "Display success",
        Category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while displaying the categories",
        error: error.message,
      });
    }
  };

  static categoryDelete = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while deleting the category",
        error: error.message,
      });
    }
  };
}

module.exports = categorycontroller;
