const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");
const {auth,adminOnly} = require("../middleware/auth");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});
router.post("/create",auth, async (req, res) => {
  const { amount } = req.body;

  try {
    const donation = new Donation({
      user: req.user.id,
      amount
    });

    await donation.save();
    res.status(201).json({ message: "Donation created", donation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/my", auth, async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/update-status",auth, async (req, res) => {
  const { donationId, status } = req.body;

  try {
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    donation.status = status;
    await donation.save();

    res.json({ message: "Donation status updated", donation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/all",auth, adminOnly, async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/summary",auth,adminOnly, async (req, res) => {
  try {
    const result = await Donation.aggregate([
      { $match: { status: "SUCCESS" } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalDonations: { $sum: 1 }
        }
      }
    ]);

    res.json(result[0] || { totalAmount: 0, totalDonations: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/create-order", auth, async (req, res) => {
  const { amount } = req.body; // amount in INR

  const options = {
    amount: amount * 100, // convert to paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ message: "Order created", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating Razorpay order" });
  }
});
module.exports = router;
