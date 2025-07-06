const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id,role)=>{
    return jwt.sign({id,role},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
}

const registerUser = async (req,res)=>{
    const {name,email,password,role} = req.body;

    if (password.trim().length <= 6 ) return res.status(400).json({message:"Ingresa una contraseña de mas de 6 carácteres"})
    try{
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message:`Ya existe un usuario con correo: ${email}`});

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
        res.status(500).json({message:"Error al registrar usuario", error:error.message})

    }

}

const loginUser = async (req,res)=>{
    const {email,password}=req.body;
    try{
        const existingUser = await User.findOne({email});
        if (!existingUser) return res.status(404).json({message:`No existe el  usuario con correo: ${email}`});

        const match = await bcrypt.compare(password,existingUser.password);

        if (!match) return res.status(401).json({message:"contraseña inválida"})

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
        res.status(500).json({message:"Error al iniciar sesión",error:error.message})
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