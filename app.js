require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connectDB.js');
const logger = require('./middlewares/logger.js');
const errorhandler = require('./middlewares/errorhandler.js');

const ArticleRoutes = require('./routes/article.route.js');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); 

app.use(express.json());

app.use(cors({"origin": "*"}));

app.use(logger);

app.use(errorhandler);

app.use('/api', ArticleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

