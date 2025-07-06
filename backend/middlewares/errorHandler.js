const errorHandler = (err,req,res,next)=>{
    console.error("[Error Handler]",err.stack)
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