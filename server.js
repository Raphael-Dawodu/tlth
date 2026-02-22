require('dotenv').config();
const express = require('express');
const path = require('path');
const compression = require('compression');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable gzip compression for responses
app.use(compression());

// Serve static files from the public directory with caching for assets
const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: oneWeek,
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            // HTML should be revalidated frequently
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        }
    }
}));

// Create a transporter using Office 365 SMTP
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

// Handle form submissions
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `New Contact Form Submission from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
