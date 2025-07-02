const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "El campo usuario es obligatorio"],
        },
        email: {
            type: String,
            required: [true, "El campo email es obligatorio"],
            unique: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Ingresa un email válido"]
        },
        password: {
            type: String,
            required: [true, "El campo password es obligatorio"],
            minlength: 6
        },
        role: {
            type: String,
            enum: ["admin", "vendedor"],
            default: "vendedor",
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)