const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const userRoutes = require('./routes/user.routes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;