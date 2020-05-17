const express = require('express');
const productRouter = require('./routes/store-product');
const orderRouter = require('./routes/order');
const userRouter = require('./routes/user');
const storeRouter = require('./routes/store-list');
// const searchRouter = require('./routes/search');
const cartRouter = require('./routes/cart');
const categoryRouter = require('./routes/store-category');
const app = express();

// listen to port
app.listen(4000, () => {
  console.log('App is running on port 4000');
});

app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/api', userRouter);
app.use('/api', storeRouter);
// app.use('/api', searchRouter);
app.use('/api', cartRouter);
app.use('/api', categoryRouter);
module.exports = app;
