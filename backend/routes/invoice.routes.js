const { Router } = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
const { invoiceSchema } = require("../validations/invoiceValidation");
const { createInvoice, deleteInvoice, getInvoices } = require("../controllers/invoice.controller");
const { protect } = require("../middlewares/authMiddlewares");

const router = Router();

router.use(protect);

router.get("/", getInvoices);

router.post("/", celebrate({ [Segments.BODY]: invoiceSchema }), createInvoice);

router.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteInvoice
);

module.exports = router;
