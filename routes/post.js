// create a new router
const app = require("express").Router();

// import the models
const { Post } = require("../models/index");

// import the auth middleware
const { authMiddleware } = require("../utils/auth");

// Route to add a new post
// authMiddleware runs first preventing non authorized users from creating posts
app.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, postedBy, categoryId } = req.body; /* Added an extra deconstructed field */
    const post = await Post.create({
        title, 
        content, 
        postedBy,
        categoryId,
        userId: req.user.id, /* Comes from the verified token */
    });
    res.status(201).json(post);
  } catch (error) {
    console.log("Error adding post:", error); /* Added log line so it outputs to terminal */
    res.status(500).json({ error: "Error adding post" });
  }
});

// Route to get all posts
app.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.json(posts);
  } catch (error) {
    console.log("Error retrieving posts:", error); /* Added log line so it outputs to terminal */
    res.status(500).json({ error: "Error retrieving posts", error });
  }
});

// Route to get all posts within a specific category
app.get("/category/:categoryId", async (req, res) => {
    try {
        const posts = await Post.findAll({ where: { categoryId: req.params.categoryId },
        });
        res.json(posts);
    } catch (error) {
      console.log("Error retrieving posts by category:", error);
      res.status(500).json({ error: "Error retrieving posts by category" });
    }
});

app.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.json(post);
  } catch (error) {
    console.log("Error retrieving post:", error); /* Added log line so it outputs to terminal */
    res.status(500).json({ error: "Error retrieving post" });
  }
});

// Route to update a post
// Auth confirms who is logged in and check the user owns the post
app.put("/:id", authMiddleware, async (req, res) => {
  try {
    const existingPost = await Post.findByPk(req.params.id);

    if (!existingPost) { 
        return res.status(404).json({ error: "Post not found" }); /* Returns error if post does not exist or cannot be found */
    }
    // Deny access to anyone who is not post's Author
    if (existingPost.userId !== req.user.id) {
        return res.status(403).json({ error: "You can only edit your own posts" });
    }

    const { title, content, postedBy, categoryId } = req.body;
    const post = await Post.update(
      { title, content, postedBy, categoryId },
      { where: { id: req.params.id } }
    );
    res.json(post);
  } catch (error) {
    console.log("Error updating post:", error); /* Added log line so it outputs to terminal */
    res.status(500).json({ error: "Error updating post" });
  }
});

// Route to delete a post
app.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const existingPost = await Post.findByPk(req.params.id);

    if (!existingPost) {
        return res.status(404).json({ error: "Post not found" });
    }
    if (existingPost.userId !== req.user.id) {
        return res.status(403).json({ error: "You can only delete your own posts" });
    }

    const post = await Post.destroy({ where: { id: req.params.id } });
    res.json(post);
  } catch (error) {
    console.log("Error deleting post:", error); /* Added log line so it outputs to terminal */
    res.status(500).json({ error: "Error deleting post" });
  }
});

// export the router
module.exports = app;
