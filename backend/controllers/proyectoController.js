import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";
import Usuario from "../models/Usuario.js";

const obtenerProyectos = async (req, res) => { // GET
    // const proyectos = await Proyecto.find() Sirve para traer todos los proyectos
    const proyectos = await Proyecto.find({
        $or: [
            {'colaboradores': { $in: req.usuario}},
            {'creador': { $in: req.usuario}},
        ]
    })
        .select('-tareas') // Proyectos de un usuario
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
    const proyecto = await Proyecto.findById(id).populate({ path: 'tareas', populate: { path: 'completado', select: 'nombre' } })
        .populate('colaboradores', 'nombre email');

    if( !proyecto ){
        const error = new Error("No Encontrado")
        return res.status(404).json({ msg: error.message })
    }

    // Quien intenta acceder al proyecto es quien lo creo o quien tiene los permisos
    if( proyecto.creador.toString() !== req.usuario._id.toString() &&
        !proyecto.colaboradores.some( (colaborador) =>
        colaborador._id.toString() === req.usuario._id.toString()
        )){
        const error = new Error("Accion No Valida")
        return res.status(401).json({ msg: error.message })
    }

    res.json(proyecto);
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

const buscarColaborador = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email }).select('-confirmado -createdAt -password -token -updateAt -__v')

    if(!usuario){
        const error = new Error('Usuari No Encontrado')
        return res.status(404).json({ msg: error.message });
    }
    res.json(usuario)
};

const agregarColaborador = async (req, res) => {
    const proyecto = await Proyecto.findById(req.params.id);

    if(!proyecto){
        const error = new Error('Proyecto No Encontrado')
        return res.status(404).json({msg: error.message})
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion No Valida')
        return res.status(404).json({msg: error.message})
    }

    const { email } = req.body;
    const usuario = await Usuario.findOne({ email }).select(
        "-confirmado -createdAt -password -token -updatedAt -__v "
    );

    if(!usuario){
        const error = new Error('Usuario No Encontrado')
        return res.status(404).json({ msg: error.message });
    }

    // El colaborador no es el admin del proyecto
    if(proyecto.creador.toString() === usuario._id.toString()){
        const error = new Error('El Creador Del Proyecto No Puede Ser Colaborador')
        return res.status(404).json({msg: error.message})
    }

    // Revisar Que No Este Registrado En El Proyecto
    if(proyecto.colaboradores.includes(usuario._id)){
        const error = new Error("El Usuario Ya Pertenece Al Proyecto")
        return res.status(404).json({ msg: error.message })
    }

    // Esta Bien, se puede Agregar
    proyecto.colaboradores.push(usuario._id);
    await proyecto.save();
    res.json({ msg: "Colaborador Agregado Correctamente" });
};

const eliminarColaborador = async (req, res) => {
    const proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
        const error = new Error("Proyecto No Encontrado");
        return res.status(404).json({ msg: error.message });
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción no válida");
        return res.status(404).json({ msg: error.message });
    }

    // Esta bien, se puede eliminar
    proyecto.colaboradores.pull(req.body.id);
    await proyecto.save();
    res.json({ msg: "Colaborador Eliminado Correctamente" });
};

export {
    obtenerProyectos,
    obtenerProyecto,
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    buscarColaborador,
    agregarColaborador,
    eliminarColaborador,
}