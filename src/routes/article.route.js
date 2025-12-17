const express = require('express');

const {
  postArticle,
  getAllArticle,
  getSearchArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
} = require('../controllers/controller.js');
const requireAuth = require('../middlewares/requireAuth.js')

const router = express.Router();

router.use(requireAuth);

router.post('/articles', postArticle);

router.get('/articles', getAllArticle);

router.get('/articles', getSearchArticle);

router.get('/articles/:id', getArticleById);

router.put('/articles/:id', updateArticleById);

router.delete('/articles/:id', deleteArticleById);

module.exports = router