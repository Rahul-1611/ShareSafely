const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello from Backend");
})

app.post('/link', (req, res) => {
    setTimeout(() => {

        res.json({ link: "Got the file" });
    }, 10000);
})

app.listen(PORT, () => {
    console.log('Server is Live ' + PORT);
});