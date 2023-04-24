require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');

const { dbConfig } = require('./config/db');
const userRoutes = require('./routes/userRoutes');


dbConfig();


const app = express();

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(userRoutes);

app.get('/', (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'node sever of "student dropout and success predictor" is up and running successfully'
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});