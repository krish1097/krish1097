const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'views', 'projects.html')));
app.get('/experience', (req, res) => res.sendFile(path.join(__dirname, 'views', 'experience.html')));
app.get('/viewResume', (req, res) => res.sendFile(path.join(__dirname, 'public', 'KrishResume.pdf')));
app.get('/contactMe', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contactMe.html')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


//sent message page:
function sendMessagePage(res, message, redirectTo) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Contact Me</title>
      <style>
        body {
          background-color: #f3f3f3;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: Arial, sans-serif;
        }

        .modal {
          background: white;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          text-align: center;
          animation: pop-in 0.3s ease;
        }

        .modal h2 {
          color: #2ecc71;
          margin-bottom: 10px;
        }

        .modal p {
          color: #555;
        }

        @keyframes pop-in {
          from { transform: scale(0.8); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      </style>
    </head>
    <body>
      <div class="modal">
        <h2>✅ ${message}</h2>
        <p>You will be redirected shortly...</p>
      </div>
      <script>
        setTimeout(() => {
          window.location.href = "${redirectTo}";
        }, 3000);
      </script>
    </body>
    </html>
  `);
}

// Serve contact page
app.get('/contactMe', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contactMe.html'));
});

// Handle email POST
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'krishpatel.1097@gmail.com',  
      pass: 'nwbm uane npff bkoj' 
    }
  });

  const mailOptions = {
    from: email,
    to: 'krishpatel.1097@gmail.com',
    subject: `Portfolio Contact from ${name}`,
    text: message + `\n\nReply to: ${email}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return sendMessagePage(res, "Failed to send message. Try again.", "/contactMe");
    }
    return sendMessagePage(res, "Message sent successfully!", "/");

  });
  
});

