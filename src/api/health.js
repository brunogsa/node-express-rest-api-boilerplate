module.exports = function(router) {

  router.get('/health', (req, res, next) => {
    res.status(200).json();
    return next();
  });

};
