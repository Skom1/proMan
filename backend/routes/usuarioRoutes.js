import express from "express";
import { registrar, autenticar, confirmar, forgotPassword, checkToken, newPassword, perfil } from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

// Autenticacion, Registro y Confirmacion de Usuarios
router.post("/", registrar);
router.post("/login", autenticar)
router.get("/confirmar/:token", confirmar)
router.post("/forgot-password", forgotPassword)
router.route("/forgot-password/:token").get(checkToken).post(newPassword)

router.get("/perfil", checkAuth, perfil)


export default router;