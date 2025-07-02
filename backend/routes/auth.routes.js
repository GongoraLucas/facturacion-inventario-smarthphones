const {registerUser,loginUser,getPerfil} = require("../controllers/auth.controllers")
const {protect} =require("../middlewares/authMiddlewares")
const express = require("express");

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)

router.get("/perfil",protect,getPerfil)




module.exports = router