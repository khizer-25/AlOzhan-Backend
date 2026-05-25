const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// @desc    Submit a contact query/message
// @route   POST /api/contact
// @access  Public
const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error('Please fill in all fields (name, email, message)');
    }

    // Save contact message to database
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    // Send email notification to raheembaig856@gmail.com
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'raheembaig856@gmail.com',
        pass: process.env.GMAIL_PASS || 'YOUR_GMAIL_APP_PASSWORD_HERE',
      },
    });

    const mailOptions = {
      from: email || (process.env.GMAIL_USER || 'no-reply@example.com'),
      to: 'raheembaig856@gmail.com',
      subject: `New Customer Query from ${name || 'Anonymous'} via Orvélia Parfums`,
      text: `You have received a new message from the Orvélia Parfums contact form:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}\n\n` +
            `This message has also been saved to the Admin Control Panel.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #261c16; border-bottom: 2px solid #d4af37; padding-bottom: 10px; text-transform: uppercase; font-size: 18px; tracking: 0.1em;">
            Orvélia Parfums - New Query
          </h2>
          <p style="font-size: 14px; color: #555;">You have received a new transmission via the contact page:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; font-size: 13px; color: #333; width: 100px;">Name:</td>
              <td style="padding: 8px 0; font-size: 13px; color: #666;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; font-size: 13px; color: #333;">Email:</td>
              <td style="padding: 8px 0; font-size: 13px; color: #666;">
                <a href="mailto:${email}" style="color: #b38f44; text-decoration: none;">${email}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; bg: #fafafa; border-left: 3px solid #d4af37; font-style: italic; color: #444; font-size: 14px; background-color: #fafafa;">
            "${message.replace(/\n/g, '<br/>')}"
          </div>
          <p style="font-size: 11px; color: #999; margin-top: 25px; border-t: 1px solid #eee; pt: 10px;">
            * This transmission is securely logged in the database and visible in your Admin Dashboard under "Customer Queries".
          </p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Contact message notification email sent to raheembaig856@gmail.com successfully.');
    } catch (emailError) {
      console.error('Nodemailer failed to transmit contact email notification:', emailError.message);
      // We do not fail the request if nodemailer is unconfigured since we successfully logged it to DB.
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been transmitted successfully.',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (queries)
// @route   GET /api/contact
// @access  Private/Admin
const getContactMessages = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact message (optional helper)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContactMessage = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error('Message not found');
    }
    await contact.deleteOne();
    res.json({ message: 'Message removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactMessage,
  getContactMessages,
  deleteContactMessage,
};
