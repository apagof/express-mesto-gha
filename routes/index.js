const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/notFound');
const { LINK_REGULAR } = require('../consts');

const auth = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(LINK_REGULAR).optional(),
    about: Joi.string().min(2).max(30).optional(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

// Так как используется хранение токена в cookies,
// то можно будет добавить роут signout, который очищал бы куки

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Передан некорректный путь'));
});

module.exports = router;
