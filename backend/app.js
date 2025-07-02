const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes")

const app = express()

//Middlewares

app.use(express.json());
app.use(cors());

// Rutas

app.get("/",(req,res)=>{
    res.send("Api para la facturación e inventario ");
})

app.use("/api/auth",authRoutes)

module.exports = app;
