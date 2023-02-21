const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
