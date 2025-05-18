// routes/audioRoutes.js
const router = require("express").Router();
const { textToSpeech } = require("../services/audioService");

router.post("/speak", async (req, res) => {
  try {
    const { text } = req.body;
    const audio = await textToSpeech(text);
    res.json({ audio });
  } catch (err) {
    res.status(500).json({ message: "Audio generation failed." });
  }
});

module.exports = router;
