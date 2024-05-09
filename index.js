const express = require('express');
const app = express();

const database = require("./services/database.js");
require('dotenv').config();

app.use(express.json())
app.use(require('./routes/user.routes.js'))

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})

