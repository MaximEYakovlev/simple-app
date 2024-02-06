const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Simple Balance Management App API',
            version: '1.0.0',
            description: 'This is a REST API application made with Express.',
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
                url: 'http://127.0.0.1:8080',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);

module.exports = specs;
