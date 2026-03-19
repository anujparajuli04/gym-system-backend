const User = require("../models/User");

// GET PROFILE (from DB)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User profile fetched successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
