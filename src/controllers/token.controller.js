const Token = require('../models/token.model');

/* React.js → Store String */
exports.storeToken = async (req, res) => {
  try {
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ message: 'String required' });
    }

    await Token.create({ value });

    res.json({ success: true, message: 'String stored' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* Raspberry Pi → Verify String */
exports.verifyToken = async (req, res) => {
  try {
    const { value } = req.body;

    const token = await Token.findOne({ value });

    if (!token) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    // delete after match
    await Token.deleteOne({ value });

    res.json({ success: true, matched: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
