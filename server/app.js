const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.1.0',
    info: {
        title: 'Express API for Simple Balance Management App',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express. It retrieves data from Simple Balance Management App.',
        license: {
            name: 'ISC',
            url: 'https://www.isc.org/licenses',
        },
        contact: {
            name: 'Simple Balance Management App',
            url: 'http://127.0.0.1:3000',
        },
    },
    servers: [
        {
            url: 'http://127.0.0.1:3000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const PORT = process.env.PORT;

const userRouter = require('./routes/userRouter');
const balanceRouter = require('./routes/balanceRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/balance', balanceRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`the server is listening on the port ${PORT}`);
});
