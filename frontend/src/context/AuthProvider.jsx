import React from 'react';
import axios from "axios";
import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const data = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`, config);
                setAuth(data.data)
                navigate('/proyectos')
            } catch (e) {
                setAuth({})
            } finally {
                setCargando(false)
            }
        }
        autenticarUsuario();
    }, [])

    const cerrarSesionAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export {
    AuthProvider
};

export default AuthContext;