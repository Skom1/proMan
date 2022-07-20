import Proyecto from "../models/Proyecto.js";

const obtenerProyectos = async (req, res) => { // GET
    // const proyectos = await Proyecto.find() Sirve para traer todos los proyectos
    const proyectos = await Proyecto.find().where('creado').equals(req.usuario) // Proyectos de un usuario
    res.json(proyectos);
};

const nuevoProyecto = async (req, res) => { // POST
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id //puede que esto tire error

    try{
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch(e) {
        console.log(e)
    }
};

const obtenerProyecto = async (req, res) => { // GET
    const { id } = req.params // acceder al routing dinamico
    const proyecto = await Proyecto.findById(id)

    if( !proyecto ){
        const error = new Error("No Encontrado")
        return res.status(404).json({ msg: error.message })
    }

    // Quien intenta acceder al proyecto es quien lo creo o quien tiene los permisos
    if( proyecto.creador.toString() !== req.usuario._id.toString() ){
        const error = new Error("Accion No Valida")
        return res.status(401).json({ msg: error.message })
    }

    const tareas = await Tarea.find().where('proyecto').equals(proyecto._id)

    res.json({
        proyecto,
        tareas,
    });
};

const editarProyecto = async (req, res) => { // PUT
    const { id } = req.params // acceder al routing dinamico
    const proyecto = await Proyecto.findById(id)

    if( !proyecto ){
        const error = new Error("No Encontrado")
        return res.status(404).json({ msg: error.message })
    }

    // Quien intenta acceder al proyecto es quien lo creo o quien tiene los permisos
    if( proyecto.creador.toString() !== req.usuario._id.toString() ){
        const error = new Error("Accion No Valida")
        return res.status(401).json({ msg: error.message })
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try{
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado)
    } catch (e) {
        console.log(e)
    }
};

const eliminarProyecto = async (req, res) => { // DELETE
    // Validaciones que tienen los siguientes pasos

    // Paso 1: Identificar Proyecto
    const { id } = req.params // acceder al routing dinamico

    const proyecto = await Proyecto.findById(id) // Paso 2: Consultar base de datos

    // Paso 3: Verificar que exista
    if( !proyecto ){
        const error = new Error("No Encontrado")
        return res.status(404).json({ msg: error.message })
    }

    // Paso 4: Identificar que quien intenta acceder al proyecto es quien lo creo o quien tiene los permisos
    if( proyecto.creador.toString() !== req.usuario._id.toString() ){
        const error = new Error("Accion No Valida")
        return res.status(401).json({ msg: error.message })
    }

    try {
        await proyecto.deleteOne();
        res.json({ msg: "Proyecto Eliminado" })
    } catch (e) {
        console.log(e)
    }
};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};


export {
    obtenerProyectos,
    obtenerProyecto,
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
}