// create a new router
const app = require("express").Router();

// import the models
const { Category } = require("../models/index");

// Route to add a new category
app.post("/", async (req, res) => {
  try {
    const { category_name } = req.body; /* Changed deconstructed variable value */
    const category = await Category.create({ category_name }); /* Changed variable name/deconstructed value */
    res.status(201).json(category);
  } catch (error) {
    console.log("Error adding category:", error); /* Added log function to fix error reporting to terminal */
    res.status(500).json({ message: "Error adding category", error: error });
  }
});

// Route to get all categories
app.get("/", async (req, res) => {
  try {
    console.log("Getting all categories");
    const categories = await Category.findAll();
    console.log(categories);
    res.json(categories);
  } catch (error) {
    console.log("Error retrieving categories:", error); /* Added log function to fix error reporting to terminal */
    res.status(500).json({ message: "Error adding categories", error: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id); /* Changed post to category to fix a reference error */
    res.json(category);
  } catch (error) {
    console.log("Error retrieving category:", error); /* Added log function to fix error reporting to terminal */
    res.status(500).json({ error: "Error retrieving category" });
  }
});

// Route to update a category
app.put("/:id", async (req, res) => {
  try {
    const { category_name } = req.body; /* Changed deconstructed variable value */
    const category = await Category.update( /* Changed variable name */
      { category_name }, /* Changed update deconstructed value */
      { where: { id: req.params.id } }
    );
    res.json(category); /* Changed resolve name */
  } catch (error) {
    console.log("Error updating category:", error); /* Added log function to fix error reporting to terminal */
    res.status(500).json({ error: "Error updating category" });
  }
});

// Route to delete a category by its id
app.delete("/:id", async (req, res) => { /* Fixed route typo (double slash returns an error) */
  try {
    const category = await Category.destroy({ where: { id: req.params.id } });
    res.json(category);
  } catch (error) {
    console.log("Error deleting category:", error); /* Added log function to fix error reporting to terminal */
    res.status(500).json({ error: "Error deleting category" });
  }
});

// export the router
module.exports = app;
