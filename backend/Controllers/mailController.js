const nodemailer = require('nodemailer');

exports.sendMailForm = async (req, res) => {
  try {
    const subject = req.body.subject;
    const sender = req.body.email;
    const message = req.body.message
    const number = req.body.phoneNumber
  
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contenu du formulaire</title>
            <style>
                /* Add your custom styles here */
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }

                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    color: #333;
                    margin-bottom: 20px;
                    text-align: center;
                }

                p {
                    color: #666;
                    margin-bottom: 20px;
                }

                .message {
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                }

                .footer {
                    margin-top: 20px;
                    text-align: center;
                    color: #888;  
                }
            </style>
        </head>

        <body>
            <div class="container">
                <h1>${sender}  Souhaite vous contacter</h1>
                <div class="message">
                    <p>${message}</p>
                </div>
                <div class="message">
                    <p>Vous pouvez le contacter au: ${number}</p>
                </div>
            </div>
        </body>
      </html>
    `;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'loicyeyap01@gmail.com',
        pass: 'pgymkjgvlqawrnwf'
      }
    });
  
    const mailOptions = {
      from: sender,
      to: 'loicyeyap01@gmail.com',
      subject: subject,
      html: htmlContent
    };
    
    // Utilisez la méthode sendMail au lieu de sendMailForm
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

  } catch (error) {
    console.error('Error sending mail:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
