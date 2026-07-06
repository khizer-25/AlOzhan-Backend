const nodemailer = require("nodemailer");

// Create transporter only once
const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendContactEmail = async ({ name, email, message }) => {
  const mailOptions = {
    from: `"Orvélia Parfums" <${process.env.GMAIL_USER}>`,
    replyTo: email,
    to: process.env.GMAIL_USER,
    subject: `New Customer Query from ${name} via Orvélia Parfums`,

    text: `
New Customer Query

Name: ${name}

Email: ${email}

Message:
${message}
`,

    html: `
      <div style="font-family:Arial;padding:25px;max-width:650px">
        <h2 style="color:#261c16">Orvélia Parfums</h2>

        <p>You have received a new customer query.</p>

        <table cellpadding="8">
          <tr>
            <td><b>Name</b></td>
            <td>${name}</td>
          </tr>
          <tr>
            <td><b>Email</b></td>
            <td>
              <a href="mailto:${email}">
                ${email}
              </a>
            </td>
          </tr>
        </table>

        <div
          style="
            margin-top:20px;
            padding:15px;
            background:#fafafa;
            border-left:4px solid #d4af37;
          ">
          ${message.replace(/\n/g, "<br>")}
        </div>

        <p style="margin-top:20px;color:gray;font-size:12px">
          This message has also been stored in the database.
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactEmail,
};