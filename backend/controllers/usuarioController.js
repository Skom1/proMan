import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
    //Evitar Rergistros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email })
    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try{
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;
    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if(!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar si el usuario esta confirmado
    if(!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message });
    }

    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
        })
    } else{
        const error = new Error("Password incorrecto");
        return res.status(403).json({ msg: error.message });
    }
};

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({ token });
    if(!usuarioConfirmar){
        const error = new Error("Hubo un error");
        return res.status(403).json({ msg: error.message });
    }

    try{
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save();
        res.json({ msg: "Usuario Confirmado Correctamente "})
    }catch (error){
        console.log(error)
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if(!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        res.json( { msg: "Se ha enviado un mail con las instrucciones" } )
    } catch (error){
        console.log(error);
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params; // Extraer valores de la url es con params, mientras que de un formulario es con body
    const tokenValido = await Usuario.findOne({ token });
    if (tokenValido){
        res.json({ msg: "Token valido y el usuario existe" })
    }
    else{
        const error = new Error("El Token no es valido");
        return res.status(404).json({ msg: error.message });
    }
}

const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({ token });
    if (usuario){
        usuario.password = password
        usuario.token = ""
        try{
            await usuario.save()
            res.json({ msg: "Password Modificado Correctamente"})
        } catch (e) {
            console.log(e)
        }
    }
    else{
        const error = new Error("El Token no es valido");
        return res.status(404).json({ msg: error.message });
    }
}

const perfil = async (req, res) => {
    const { usuario } = req
    res.json(usuario)
}

export {
    registrar,
    autenticar,
    confirmar,
    forgotPassword,
    checkToken,
    newPassword,
    perfil,
};