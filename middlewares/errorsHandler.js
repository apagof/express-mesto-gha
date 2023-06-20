// module.exports = (err, req, res, next) => {
//   const { statusCode = 500, message } = err;

//   res.status(statusCode).send({
//     message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
//   });

//   next();
// };

const ReferenceError = require('../errors/reference-err');

const errorsHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || ReferenceError;

  const message = statusCode === ReferenceError
    ? 'На сервере произошла ошибка'
    : err.message;
  res.status(statusCode).send({ message });

  next();
};

module.exports = errorsHandler;
