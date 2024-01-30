const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;

const userRouter = require('./routes/userRouter');
const balanceRouter = require('./routes/balanceRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/balance', balanceRouter);

app.listen(PORT, () => {
    console.log(`the server is listening on the port ${PORT}`);
});
