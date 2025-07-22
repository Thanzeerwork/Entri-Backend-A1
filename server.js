const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/Items');

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.get('/', (req, res) => {
  res.send('Inventory API is Running');
});

app.get('/health', (req, res) => {
  res.json({ status: 'Server is healthy' });
});

app.use('/items', itemRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully to cloud');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
