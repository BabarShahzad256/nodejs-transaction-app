const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const transactions = require('./routes/transactions');
const Transaction = require('./models/transaction');
const fs = require('fs');
const path = require('path');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/v1/transactions', transactions);

// Load mock data into database
const loadMockData = async () => {
  try {
    const dataPath = path.join(__dirname, 'mockData.json');
    const mockData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Clear existing data
    await Transaction.deleteMany();

    // Insert mock data
    await Transaction.insertMany(mockData);
    console.log('Mock data loaded successfully');
  } catch (err) {
    console.error('Error loading mock data:', err.message);
  }
};

loadMockData();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
