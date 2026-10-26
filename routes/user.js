const router = require("express").Router();
const { User } = require("../models");
const { signToken, authMiddleware } = require("../utils/auth");

// Get current authenticated user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); /* Added find by Primary key to fix 500 error */
    if (!user) return res.status(401).json({ message: "Token expired" });

    const { password, ...safeUser } = user.toJSON();
    return res.status(200).json({ user: safeUser });
  } catch (err) {
    console.log("Error fetching current user:", err);
    res.status(500).json(err);
  }
});

// GET the single User record by id
router.get("/:id", async (req, res) => {
  console.log("looking for user", req.params.id);
  try {
    const userData = await User.findByPk(req.params.id); /* Replaced getOne with findByPk as it does not exist */

    if (!userData) {
      res.status(404).json({ message: "No User found with this id" });
      return;
    }

    const { password, ...safeUser } = userData.toJSON(); /* Stripped password before sending */
    res.status(200).json(safeUser);
  } catch (err) {
    console.log("Error fetching user by id:", err); /* Added log so it outputs to terminal */
    res.status(500).json(err);
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll();
    // Strip password out of every user in the list
    const safeUsers = users.map((u) => {
        const { password, ...safeUser } = u.toJSON();
        return safeUser;
    });
    res.status(200).json(safeUsers);
  } catch (err) {
    console.log("Error fetching all users:", err); /* Adding log for showing output to terminal */
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    const token = signToken(userData);
    const { password, ...safeUser } = userData.toJSON(); /* Destructing password into its own variable */
    res.status(200).json({ token, userData: safeUser });
  } catch (err) {
    console.log("Error registering user:", err); /* Adding log for showing output to terminal */
    res.status(400).json(err);
  }
});

// UDPATE the User record
// authMiddleware confirms who is logged in and what they can update
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    // Refuse anyone trying to update an account that is not their own
    if (req.user.id !== parseInt(req.params.id)) { /* Checks if the id is the same from your verified token */
        return res.status(403).json({ message: "You can only update your own account" });
    }

    const [rowsUpdated] = await User.update(req.body, {
        where: { id: req.params.id },
    });

    if (rowsUpdated === 0) {
        return res.status(404).json({ message: "No User found with this id" });
    }

    const updatedUser = await User.findByPk(req.params.id);
    const { password, ...safeUser } = updatedUser.toJSON();
    res.status(200).json(safeUser);
  } catch (err) {
    console.log("Error updating user:", err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      return res.status(400).json({ message: "Incorrect email or password, please try again" }); /* Compacted code for better visibility */
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect email or password, please try again" }); /* Compacted code for better visibility */
    }

    const token = signToken(userData);
    const { password, ...safeUser } = userData.toJSON();
    res.status(200).json({ token, userData: safeUser });
  } catch (err) {
    console.log("Error logging in:", err);
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  res.status(204).end();
});

module.exports = router;
