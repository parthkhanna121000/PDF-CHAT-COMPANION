const login = async (req, res) => {
  console.log("🔥 Login Controller Hit"); // ADD
  console.log("📩 Body Received:", req.body); // ADD

  const { email, password } = req.body;

  console.log("👉 Email:", email); // ADD
  console.log("👉 Password:", password); // ADD

  if (!email || !password) {
    console.log("❌ Missing email or password"); // ADD
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email });
    console.log("🟦 User Found:", user); // ADD

    if (!user) {
      console.log("❌ No user found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔐 Password match:", isMatch); // ADD

    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // JWT SECRET CHECK
    if (!process.env.JWT_SECRET) {
      console.log("❌ JWT_SECRET missing from .env"); // ADD
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Token Generated:", token); // ADD

    res.json({ token });
  } catch (err) {
    console.error("🔥 Login Error:", err); // ADD
    res.status(500).json({ message: "Server error" });
  }
};
