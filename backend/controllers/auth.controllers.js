const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id,role)=>{
    return jwt.sign({id,role},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
}

const registerUser = async (req,res,next)=>{
    const {name,email,password,role} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if (existingUser) {
            const error = new Error(`Ya existe un usuario con correo: ${email}`)
            error.status = 400
            return next(error)
        }

        const passwordHashed = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password:passwordHashed,
            role
        })

        res.status(201).json({
            message:"Usuario creado con éxito",
            token: generateToken(newUser._id,newUser.role),
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role
            }
        })

    }catch(error){
        next(error)

    }

}

const loginUser = async (req,res,next)=>{
    const {email,password}=req.body;
    try{
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            const error = new Error(`No existe el usuario con correo: ${email}`)
            error.status = 404
            return next(error)
        }

        const match = await bcrypt.compare(password,existingUser.password);

        if (!match) {
            const error = new Error("Contraseña inválida")
            error.status = 401
            return next(error)
        }

        res.status(200).json({
            message:"Exito en el inicio de sesión",
            token: generateToken(existingUser._id,existingUser.role),
            user:{
                id:existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role:existingUser.role
            }
        })
    }catch(error){
        next(error)
    }
}

const getPerfil = (req,res)=>{
    res.status(200).json({user:req.user})

}
module.exports = {
    registerUser,
    loginUser,
    getPerfil
}