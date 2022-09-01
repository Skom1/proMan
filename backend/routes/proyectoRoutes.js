import express from "express";
import {
    obtenerProyectos,
    obtenerProyecto,
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    buscarColaborador,
} from '../controllers/proyectoController.js'
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.
    route("/")
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyecto)

router.
    route("/:id")
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth, editarProyecto)
    .delete(checkAuth, eliminarProyecto)

router.post('/colaboradores', checkAuth, buscarColaborador)
router.post("/colaboradores/:id", checkAuth, agregarColaborador)
router.delete("/colaborador/:id", checkAuth, eliminarColaborador)

export default router;