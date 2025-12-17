require('dotenv').config();
const mongoose = require('mongoose');
const configEnv = require('./env.config.js')
const connectDB = require('./src/config/connectDB.js');
const app = require('./src/app');

mongoose.connect(configEnv.mongoUri)
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error',
err.message);
    process.exit(1);
});


app.listen(configEnv.port, async () => {
  await connectDB(); 
  console.log(`Server is running on port ${configEnv.port}`);
});