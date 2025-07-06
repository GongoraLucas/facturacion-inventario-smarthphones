const {registerUser,loginUser,getPerfil} = require("../controllers/auth.controllers")
const {protect} =require("../middlewares/authMiddlewares")
const express = require("express");
const { registerValidations, loginValidations } = require("../validations/authValidation");

const router = express.Router()

router.post("/register",registerValidations,registerUser)
router.post("/login",loginValidations,loginUser)

router.get("/perfil",protect,getPerfil)




module.exports = router