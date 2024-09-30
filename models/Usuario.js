import generarToken from "../helpers/generarToken.js";
import bcrypt from 'bcrypt'; 
import mongoose from "mongoose";


const UsuarioSchema = mongoose.Schema({
    
    nombre: {
        type : String, 
        require : true, 
        trim : true
    },
    password : { 
        type : String,
        require : true, 
    },
    email : {
        type : String,
        require : true, 
        unique : true,
        trim : true, 
    }, 
    telefono : {
        type : String, 
        default : null, 
        trim : true, 
    },
    token : {
        type : String, 
        default : generarToken(), 
    }, 
    confirmado : {
        type : Boolean, 
        default : false, 
    }, 

})

UsuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
         next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UsuarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password); 
}

const Usuario = mongoose.model("Usuario", UsuarioSchema); 
export default Usuario
 