module.exports = (err, req, res, next) => {
  console.error(err.stack);
  if (!err.statusCode) err.statusCode = 500; 
  res.status(err.statusCode).json({
    error: true,
    message: err.message
  });
};
