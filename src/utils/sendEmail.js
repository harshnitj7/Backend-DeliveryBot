const nodemailer = require("nodemailer");

const sendEmail = async (token, to) => {
  try {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${token}`;

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>QR Code Email</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#4f46e5;color:#ffffff;padding:20px;text-align:center;">
              <h1 style="margin:0;font-size:22px;">Your QR Code</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;text-align:center;color:#333;">
              <p style="font-size:16px;">
                Please find your QR code below. You can scan it using any QR scanner.
              </p>

              <img 
                src="${qrCodeUrl}" 
                alt="QR Code"
                width="200"
                height="200"
                style="margin:20px auto;display:block;"
              />

              <p style="font-size:14px;color:#666;">
                Or click the link below:
              </p>

              <a 
                href="https://example.com"
                style="color:#4f46e5;text-decoration:none;font-weight:bold;"
              >
                https://example.com
              </a>
            </td>
          </tr>

         

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    // Mail transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // MUST be true for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password
      },
      connectionTimeout: 10000, // 10 sec
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    //  <!-- Footer -->
    //           <tr>
    //             <td style="background:#f1f5f9;padding:15px;text-align:center;font-size:12px;color:#888;">
    //               © ${new Date().getFullYear()} Your Company. All rights reserved.
    //             </td>
    //           </tr>

    const info = await transporter.sendMail({
      from: `"QR Service" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your QR Code",
      html: htmlTemplate,
    });

    console.log("Email sent ", info.messageId);

    return info;
  } catch (error) {
    console.error(error);
    return;
  }
};

module.exports = { sendEmail };
