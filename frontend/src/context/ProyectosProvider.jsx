import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import axios from "axios";


const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([]);
    const [alerta , setAlerta] = useState([]);
    const [proyecto, setProyecto] = useState({});


    const navigate = useNavigate();

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        'Contente-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`, config)
                setProyectos(data)
            } catch (e) {
                console.log(e);
            }
        }
        obtenerProyectos()
    }, [])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProyecto = async proyecto => {
        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    'Contente-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`, proyecto, config);
            setProyectos([...proyectos, data])
            setAlerta({
                msg: 'Proyecto Creado Correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 2000)
        } catch (e) {
            console.log(e)
        }
    }

    const obtenerProyecto = async id => {
        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    'Contente-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const data = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`, config )
            setProyecto(data.data);
            console.log(data.data);
        } catch (e) {
            console.log(e)
        }
    }


    return(
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext;