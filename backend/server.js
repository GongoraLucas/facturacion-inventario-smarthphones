const app = require("./app");
const connectDB = require("./config/db");
const dotenv = require("dotenv")

dotenv.config();

const port = process.env.PORT ?? 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`)
        })
    } catch (error) {
        console.log("No se puede conectar el servidor: "+error);
    }
}

startServer();






