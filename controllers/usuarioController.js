import Usuario from "../models/usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarToken from "../helpers/generarToken.js";
import emailRegistro from "../helpers/emailRegistro.js";
import EmailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
    const { email, nombre } = req.body; 

    const existeUsuario = await Usuario.findOne({email}); 

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg : error.message }); 
    }

    try {
        
        const usuario = new Usuario(req.body); 
        const usuarioGuardado = await usuario.save(); 
        //mandar email 
        emailRegistro({email, nombre, token : usuarioGuardado.token})
        res.json({ usuarioGuardado })
        

    } catch (error) {
        console.log(error);
    }
    
}

const perfil = (req, res ) => {
    const { usuario } = req; 

    res.json({ perfil : usuario })
}

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({token})

    if (!usuarioConfirmar) {
        const error = new Error ('token no valido ')
        return res.status(400).json({ msg :  error.message })
    }

    try {
        
        usuarioConfirmar.token = null; 
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save();
        
        res.json({ msg : "Usuario confirmado Correctamente" })
       
        

    } catch (error) {
        console.log(error);
    }
    
}

const autenticar = async(req, res) => {

    
    const {email, password} = req.body; 
    const auntenticarUsuario = await Usuario.findOne({email});
    


    if (!auntenticarUsuario) {
        const error = new Error ('el usuario no existe...')
        return res.status(400).json({ msg :  error.message })
    }

    if (!auntenticarUsuario.confirmado) {
        const error = new Error ('Usuario no confirmado...')
        return res.status(400).json({ msg :  error.message }) 
    }

    if ( await auntenticarUsuario.comprobarPassword(password)) {
         res.json({ token : generarJWT(auntenticarUsuario.id) })
    }else{
        const error = new Error ('Password es incorrecto, intentar de nuevo')
        return res.status(400).json({ msg :  error.message })
    }


}

const nuevoPassword = async(req, res) => {
   
    const { email } = req.body; 

    const usuario = await Usuario.findOne({ email }); 

    if (!usuario) {
        const error = new Error('El usuario no existe o no esta registrado')
        return res.status(400).json({ msg :  error.message })
    }
    
    try {
        
        usuario.token = generarToken(); 
        await usuario.save(); 

        //enviar email 
        EmailOlvidePassword({
            email, 
            nombre : usuario.nombre,
            token : usuario.token, 
        })

        console.log('el token se guardo');
        res.json({ msg : 'se madaron instrucciones y un token a tu correo' })
        

    } catch (error) {
        console.log(error);
        
    }
}

const comprobarToken = async(req, res) => {

    const { token } = req.params
    const usuarioTok = await Usuario.findOne({ token })

    if (!usuarioTok) {
        const error = new Error('el token no es valido')
        return res.status(400).json({ msg : error.message })
    }else{
        res.json({ msg: "Token válido y el usuario existe" });
    }
    
    console.log('el token es el mismo');
    

}

const generarNewPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;

    const usuarioNewPass = await Usuario.findOne({token})

    if (!usuarioNewPass) {
        const error = new Error('Hubo un error'); 
        return res.status(400).json({ msg : error.message })
    }

    try {
        
        usuarioNewPass.token = null; 
        usuarioNewPass.password = password;
        await usuarioNewPass.save();
        
        res.json({ msg : "Usuario confirmado Correctamente" })
        console.log('Roger Parrales');
        

    } catch (error) {
        console.log(error);
    }
    
}


export {registrar, perfil, confirmar, autenticar, nuevoPassword, comprobarToken, generarNewPassword } 

