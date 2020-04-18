const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const userRouter = require('./routes/user');
const app = express();

// connect to database
const db = config.get('mongoURI');
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// // set template engine
// app.set('view engine', 'ejs');

//static files
// app.use(express.static('./public'));

// fire controllers
// todoController(app);


// listen to port
app.listen(3000, () => {
  console.log('App is running on port 3000');
});

app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/api', userRouter);
module.exports = app;
