const nodemailer = require('nodemailer');

module.exports = async function sendEmail(req, res) {
  if (req.method && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

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
    subject: `Direct Transmission from ${name || 'Anonymous'} via Orvélia Parfums`,
    text: `Name: ${name || ''}\nEmail: ${email || ''}\n\nMessage:\n${message || ''}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};