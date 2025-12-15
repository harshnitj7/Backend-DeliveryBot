const Token = require("../models/token.model");
const { sendEmail } = require("../utils/sendEmail");

/* React.js → Store String */
exports.storeToken = async (req, res) => {
  try {
    const { value, customerDetails } = req.body;
    const { name, location, email } = customerDetails;

    console.log(req.body)

    if (!value) {
      return res.status(400).json({ message: "String required" });
    }

    await Token.create({ value });

    // send mail
    await sendEmail(value, email);

    res.json({ success: true, message: "String stored" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/* Raspberry Pi → Verify String */
exports.verifyToken = async (req, res) => {
  try {
    const { value } = req.body;
    console.log(req.body);

    const token = await Token.findOne({ value });

    if (!token) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    // delete after match
    await Token.deleteOne({ value });

    res.json({ success: true, matched: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
