const {registerUser,loginUser,getProfile} = require("../controllers/auth.controllers")
const {protect} =require("../middlewares/authMiddlewares")
const express = require("express");
const { registerValidations, loginValidations } = require("../validations/authValidation");

const router = express.Router()

router.post("/register",registerValidations,registerUser)
router.post("/login",loginValidations,loginUser)

router.get("/profile",protect,getProfile)




module.exports = router