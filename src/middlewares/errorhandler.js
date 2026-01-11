

const errorhandler = (err, req, res, next) => {
  console.error(err.stack || (''));
  console.error(err.message);
  const status = err.status || 500;

  if( err instanceof multer.MulterError ){
    res.status(400).json("Invalid file size or too large file");
  };
  res.status(status).json({ error: err.message });
};

module.exports = errorhandler;