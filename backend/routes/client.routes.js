const { Router } = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
const { clientSchema } = require("../validations/clientValidation");
const { createClient, getClients, deleteClient, updateClient } = require("../controllers/client.controller");
const { protect } = require("../middlewares/authMiddlewares");

const router = Router();

router.use(protect);

router.get("/", getClients);

router.post(
  "/",
  celebrate({ [Segments.BODY]: clientSchema }),
  createClient
);

router.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
    [Segments.BODY]: clientSchema,
  }),
  updateClient
);

router.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteClient
);

module.exports = router;
