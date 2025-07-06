const {Joi,Segments,celebrate} = require("celebrate")

const loginValidations = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email:Joi.string().email().required().messages({
            "string.email":"El correo no es válido",
            "string.empty":"El correo es requerido "
        }),
        password:Joi.string().min(6).required().messages({
            "string.min":"La contraseña debe tener mínimo 6 carácteres",
            "string.empty":"La contraseña es requerida"
        })

    })
})

const registerValidations = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(3).required().messages({
            "string.empty":"El nombre es requerido",
            "string.min": "El nombre debe tener mínimo 3 carácteres"
        }),
        email:Joi.string().email().required().messages({
            "string.empty":"El correo es requerido",
            "string.email": "El correo no es válido"
        }),
        password: Joi.string().min(6).messages({
            "string.empty":"La contraseña es requerida",
            "string.min": "La contraseña debe tener mínimo 6 carácteres"
        }),
        role: Joi.string().valid("admin","vendedor").required().messages({
            "any.only":"El rol debe ser admin o vendedor"
        })

    })
})

module.exports = {
    loginValidations,
    registerValidations
}