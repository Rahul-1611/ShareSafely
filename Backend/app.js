const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send("Hello from Backend");
})

app.listen(PORT, () => {
    console.log('Server is Live ' + PORT);
});