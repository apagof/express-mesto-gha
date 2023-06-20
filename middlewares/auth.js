const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  let payload;
  let token;

  try {
    token = req.cookies.jwt;
  } catch (e) {
    const err = new Error('Необходима авторизация');
    err.statusCode = 401;
    next(err);
  }

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    const err = new Error('Необходима авторизация');
    err.statusCode = 401;
    next(err);
  }

  req.user = payload;

  next();
};

export default checkAuth;
