const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger.js');
const errorhandler = require('./middlewares/errorhandler.js');
const UserRoutes = require('./routes/user.route.js');
const ArticleRoutes = require('./routes/article.route.js');
const requireAuth = require('./middlewares/requireAuth.js');


const app = express();

app.use(express.json());

app.use(cors({"origin": "*"}));

app.use(logger);
app.use('/api/users', UserRoutes);

app.use(requireAuth)
app.use('/api', ArticleRoutes);


app.use(errorhandler);



module.exports = app;