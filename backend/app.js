const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const { errorHandler } = require("./middlewares/errorHandler");
const productRoutes = require('./routes/product.routes');
const clientRoutes = require('./routes/client.routes');
const invoiceRoutes = require('./routes/invoice.routes');



const app = express()

//Middlewares

app.use(express.json());
app.use(cors());

// Rutas

app.get("/",(req,res)=>{
    res.send("Api para la facturación e inventario ");
})

app.use("/api/auth",authRoutes)

app.use('/api/products', productRoutes);

app.use('/api/clients', clientRoutes);


app.use('/api/invoices', invoiceRoutes);


app.use(errorHandler)

module.exports = app;
