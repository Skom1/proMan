import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";
import proyecto from "../models/Proyecto.js";

const agregarTarea = async (req, res) => { // POST
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);

    if(!existeProyecto){
        const error = new Error('El Proyecto No Existe')
        return res.status(404).json({ msg: error.message })
    }

    if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No Tienes Los Permisos Para Anadir Tareas')
        return res.status(403).json({ msg: error.message })
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body);
        res.json(tareaAlmacenada)
    } catch (e) {
        console.log(e)
    }
    console.log(existeProyecto);
};

const obtenerTarea = async (req, res) => { // GET

    const { id } = req.params; // Paso 1: Identificar la tarea
    const tarea = await Tarea.findById(id).populate('proyecto'); // Paso 2: Consultarla en la base de datos

    if(!tarea){
        const error = new Error('Tarea No Encontrada')
        return res.status(404).json({ msg: error.message })
    }

    // Paso 3: Verificar que el usuario tenga los permisos necesarios
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion No Valida')
        return res.status(403).json({ msg: error.message })
    }
    res.json(tarea);
};

const actualizarTarea = async (req, res) => { // PUT
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate('proyecto');

    if(!tarea){
        const error = new Error('Tarea No Encontrada')
        return res.status(404).json({ msg: error.message })
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion No Valida')
        return res.status(403).json({ msg: error.message })
    }

    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.prioridad = req.body.prioridad || tarea.prioridad;
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

    try{
        const tareaAlmacenada = await tarea.save();
        res.json(tareaAlmacenada);
    } catch (e) {
        console.log(e)
    }
};

const eliminarTarea = async (req, res) => { // DELETE
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate('proyecto');

    if(!tarea){
        const error = new Error('Tarea No Encontrada')
        return res.status(404).json({ msg: error.message })
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion No Valida')
        return res.status(403).json({ msg: error.message })
    }

    try{
        await tarea.deleteOne()
        res.json({ msg: "Tarea Eliminada" })
    } catch (e) {
        console.log(e);
    }
};

const cambiarEstado = async (req, res) => {};

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,
}