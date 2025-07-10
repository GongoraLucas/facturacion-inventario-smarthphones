const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const { productSchema } = require('../validations/productValidation');
const { createProduct, deleteProduct, getProducts, updateProduct } = require('../controllers/product.controller');
const { protect } = require('../middlewares/authMiddlewares');

const router = Router();


router.use(protect);


router.get('/', getProducts);

router.post(
  '/',
  celebrate({ [Segments.BODY]: productSchema }),
  createProduct
);

router.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
    [Segments.BODY]: productSchema,
  }),
  updateProduct
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteProduct
);

module.exports = router;
