const Contact = require("../models/Contact");
const { sendContactEmail } = require("../services/emailService");

// @desc Submit Contact Form
// @route POST /api/contact
// @access Public

const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error("Please fill in all fields.");
    }

    // Save message
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    // Send Email
    try {
      await sendContactEmail({
        name,
        email,
        message,
      });

      console.log("✅ Contact Email Sent");
    } catch (err) {
      console.error("Email Error:", err.message);
    }

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been transmitted successfully.",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get Contact Messages
// @route GET /api/contact
// @access Private/Admin

const getContactMessages = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// @desc Delete Contact Message
// @route DELETE /api/contact/:id
// @access Private/Admin

const deleteContactMessage = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error("Message not found");
    }

    await contact.deleteOne();

    res.json({
      message: "Message removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactMessage,
  getContactMessages,
  deleteContactMessage,
};