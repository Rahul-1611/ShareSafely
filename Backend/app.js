const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require('morgan');
const multer = require('multer');
const PORT = process.env.PORT || 3000;

app.use(morgan('dev')); // Logging route when used
app.use(cors()); // For cross site access

const upload = multer();  // needed when receiving files from frontend

app.get('/', (req, res) => {
    res.send("Hello from Backend");
})

app.post('/link', upload.single('file') /* multer */, (req, res) => {
    console.log("✅ File received:", req.file);
    console.log("🕓 Expiry value:", req.body.expiry);
    setTimeout(() => {
        res.json({ link: "Got the file" });
    }, 1000);
})

app.listen(PORT, () => {
    console.log('Server is Live ' + PORT);
});