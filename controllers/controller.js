
const Joi = require("joi")

const ArticleModel = require('../models/article.model.js');
const Article = require("../models/article.model.js");

const postArticle = async (req, res, next) => {

  const articleSchema = Joi.object({
      title: Joi.string().min(5).required(),     
      content: Joi.string().min(20).required(),
      author: Joi.string().optional().default('Guest')
  });

  const { error, value } = articleSchema.validate(req.body);

  if(error) {
    return res.status(400).json('Please provide article title and content', error);
  }

  try {
     const newArticle = new ArticleModel({

      title: req.body.title,
      content: req.body.content,
      author: req.user._id
     });
     await newArticle.save();

     return res.status(200).json({
      message: "Article created",
      data: newArticle,
     });
  } catch (error) {
   console.error(error);
  }
};

const getAllArticle = async (req, res, next) => {

  try {
    const articles = await ArticleModel.find().populate("author", "name _id email");

    return res.status(200).json({
      message: "Articles fetched",
      data: articles,
  })
  } catch (error) {
   next(error);
  }
};

const getSearchArticle = async (req, res, next) => {
  const {search} = req.query

  try {
    const articles = await ArticleModel.find({ $text: { $search: search } });

    return res.status(200).json({
      message: "Articles fetched",
      data: articles,
  })
  } catch (error) {
   next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
   const article = await Article.findById(req.params.id)

   if(!article){
    return res.status(400).json({
      message: `Article with ${req.params.id} not found`
    })
   }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateArticleById = async (req, res, next) => {

    const articleSchema = Joi.object({
      title: Joi.string().min(5).optional(),
      content: Joi.string().min(5).optional(),
      author: Joi.string().optional()
  });

  const{ error, value } = articleSchema.validate(req.body);
    if(error) {
    return res.status(400).json("Please provide article title and content")
  }

  try {
   const updatedArticle = await ArticleModel.findByIdAndUpdate(
    req.params.id, 
    { ...value }, 
    { 
      new: true, 
      runValidators: true,
    }
  );

  if (!updatedArticle){
    return res.status(404).json({
      message: 'article not updated',
    });
  }

    return res.status(200).json({
      message: 'article updated',
      data: updatedArticle,
    });
  } catch (error) {
    next(error);
  }
};

const deleteArticleById = async (req, res, next) => {
  try {
   const article = await ArticleModel.findByIdAndDelete(req.params.id);

   if (!article) {
    return res.status(200).json({
      message: 'Article not found',
    });
   }

   res.status(200).json('article deleted');
  } catch (error) {
     next(NativeError);
  }
};

module.exports = {
  postArticle,
  getAllArticle,
  getSearchArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
}
