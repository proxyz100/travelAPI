const express = require('express');
const routes = require('./routes/index.routes');

const app = express();
app.use(express.json());

app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
