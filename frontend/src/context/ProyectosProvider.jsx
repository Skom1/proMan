import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import axios from "axios";
import error from "../components/Error.jsx";


const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([]);
    const [alerta , setAlerta] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [modalForm, setModalForm] = useState(false)
    const [tarea, setTarea] = useState({})
    const [modalEliminar, setModalEliminar] = useState(false)
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)


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

        if(proyecto.id){
            await editarProyecto(proyecto)
        } else{
            await nuevoProyecto(proyecto)
        }


    }

    const editarProyecto = async proyecto => {
        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    'Contente-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${proyecto.id}`, proyecto, config)

            // sincronizar el state
            const proyectosActualizados = proyectos.map(proyectoState =>
                proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectosActualizados)

            // mostrar alerta
            setAlerta({
                msg: 'Proyecto Actualizado Correctamente',
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

    const nuevoProyecto = async  proyecto => {
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
            setAlerta({})
        } catch (e) {
            navigate('/proyectos')
            setAlerta({
                msg: e.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 1000)
        }
    }

    const eliminarProyecto = async id => {
        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    'Contente-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`, config);

            //sincronizar state
            const proyectosActualizados = proyectos.filter(proyectoState =>
            proyectoState._id !== id)
            setProyectos(proyectosActualizados)

            setAlerta({
                msg: data.msg,
                error: false
            })
            setTimeout(()=> {
                setAlerta({})
                navigate('/proyectos')
            }, 2000)
        } catch (e) {
            console.log(e)
        }
    }

    const handleModalForm = () => {
        setModalForm(!modalForm)
        setTarea({})
    }

    const submitTarea = async tarea => {

        if(tarea?.id) {
            await editarTarea(tarea);
        } else {
            await crearTarea(tarea)
        }
    }

    const crearTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    'Contente-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas`, tarea, config)
            // Agrega la tarea al state
            const proyectoActualizado = { ...proyecto };
            proyectoActualizado.tareas = [...proyecto.tareas, data];

            setProyecto(proyectoActualizado)
            setAlerta({})
            setModalForm(false)

        } catch (e) {
            console.log(e)
        }
    }

    const editarTarea = async tarea => {
        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    'Contente-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea.id}`, tarea, config)

            //TODO: Actualizar el DOM
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState =>
                tareaState._id === data._id ? data : tareaState )
            setProyecto(proyectoActualizado)

            setAlerta({})
            setModalForm(false)

        } catch (e) {
            console.log(e)
        }
    }

    const handleModalEditar = tarea => {
        setTarea(tarea)
        setModalForm(true)
    }

    const handleModalEliminar = tarea => {
        setTarea(tarea)
        setModalEliminar(!modalEliminar)
    }

    const eliminarTarea = async () => {
        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    'Contente-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea._id}`, config)
            setAlerta({
                msg: data.msg,
                error: false
            })

            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState =>
            tareaState._id !== tarea._id)


            setProyecto(proyectoActualizado)
            setModalEliminar(false)
            setTarea({})
            setTimeout(() => {
                setAlerta({})
            }, 1000)
        } catch (e){
            console.log(e)
        }
    }

    const submitColaborador = async email => {

        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    'Contente-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/colaboradores`, { email }, config)
            setColaborador(data)
            setAlerta({})
        } catch (e){
            setAlerta({
                msg: e.response.data.msg,
                error: true
            })
        }
    }

    const agregarColaborador = async email => {

        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/colaboradores/${proyecto._id}`, email, config)

            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})

            setTimeout(() => {
                setAlerta({})
            }, 1000);

        } catch (e) {
            setAlerta({
                msg: e.response.data.msg,
                error: true
            })
        }
    }

    const handleModalEliminarColaborador = (colaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
    }

    const eliminarColaborador = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, config)

            const proyectoActualizado = {...proyecto}

            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id )

            setProyecto(proyectoActualizado)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})
            setModalEliminarColaborador(false)

            setTimeout(() => {
                setAlerta({})
            }, 3000);

        } catch (e) {
            console.log(e)
        }
    }

    const completarTarea = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/estado/${id}`, {}, config)

            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState =>
            tareaState._id === data._id ? data : tareaState)
            setProyecto(proyectoActualizado)
            setTarea({})
            setAlerta({})

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
                proyecto,
                eliminarProyecto,
                modalForm,
                handleModalForm,
                submitTarea,
                handleModalEditar,
                tarea,
                modalEliminar,
                handleModalEliminar,
                eliminarTarea,
                submitColaborador,
                colaborador,
                agregarColaborador,
                handleModalEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador,
                completarTarea
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