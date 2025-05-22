const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const courseRoutes = require('./routes/course.route');


const app = express();

app.use(cors({ origin:'*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;