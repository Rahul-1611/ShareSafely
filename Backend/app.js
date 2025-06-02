const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require('morgan');
const multer = require('multer');

const { uploadFile, generateSaSUrl } = require("./services/blob");

const PORT = process.env.PORT || 3000;

app.use(morgan('dev')); // Logging route when used
app.use(cors()); // For cross site access

const upload = multer();  // needed when receiving files from frontend

app.get('/', (req, res) => {
    res.send("Hello from Backend");
})

app.post('/link', upload.single('file') /* multer */, async (req, res) => {
    try {
        const file = req.file;
        const expiry = parseInt(req.body.expiry, 10);
        const contentType = file.mimetype;

        if (!file || !expiry) {
            return res.status(400).json({ error: "Missing file or expiry" });
        }

        const blobName = Date.now() + "_" + file.originalname; //unique blob name
        await uploadFile(blobName, file.buffer, contentType);  //upload to azure
        const sasUrl = await generateSaSUrl(blobName, expiry); //generating SAS link

        setTimeout(() => {
            return res.status(200).json({ link: sasUrl });
        }, 2000);

    } catch (err) {
        console.error("Error generating SAS link", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

app.listen(PORT, () => {
    console.log('Server is Live ' + PORT);
});