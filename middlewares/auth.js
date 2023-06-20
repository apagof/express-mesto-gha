const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  // const token = req.cookies.jwt;
  // let payload;
  // try {
  //   if (!token) {
  //     next(new UnauthorizedError('Необходима авторизация'));
  //   }
  //   payload = jwt.verify(token, 'some-secret-key');
  // } catch (err) {
  //   next(new UnauthorizedError('Необходима авторизация'));
  // }

  // req.user = payload;

  // next();
  let token;
  try {
    token = req.cookies.jwt;
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
