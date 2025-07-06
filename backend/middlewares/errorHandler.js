const { isCelebrateError } = require("celebrate")

const errorHandler = (err,req,res,next)=>{
    console.error("[Error Handler]",err.stack)
    if (isCelebrateError(err)){
        const errorBody = err.details.get("body")
        const message = errorBody?.details?.[0]?.message || "Error de validación"
        return res.status(400).json({
            success:false,
            message:message.replace(/["]/g,'')
        })

    }
    const status = err.status || 500
    const message = err.message || "Error interno del servidor"
    res.status(status).json({
        success:false,
        message:message
    })

}

module.exports = {
    errorHandler
}