require('dotenv').config();

const express = require('express');
const sequelize = require('./config/db');
const routes = require('./routes/index.routes');
const auth = require('./config/auth.js');

const swaggerOptions = require('./config/swagger');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
app.use(express.json());

// Ask for the optional middleware before we use the routes
app.use(auth.optional); // global middle ware
app.use('/', routes);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

try {
    sequelize.authenticate();
    sequelize.sync();
    console.log('Connected to DB');
} catch (error) {
    console.log('Unable to connect to DB: ', error);
}

const PORT = 4000;
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
