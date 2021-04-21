const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello to mastercalin app');
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const targetsRouter = require('./routes/targets');
const familymembersRouter = require('./routes/familymembers');

app.use('/targets', targetsRouter);
app.use('/familymembers', familymembersRouter);
app.use("/users", require("./routes/userRouter"));

app.listen(port, () => {
    console.log(`Server is up and running guysss: ${port}`); 
})
