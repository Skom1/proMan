import React, { useEffect } from 'react';
import useAdmin from "../hooks/useAdmin";
import { useParams, Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import ModalForm from "../components/ModalForm";
import ModalEliminar from "../components/ModalEliminar";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import Tarea from "../components/Tarea";
import Error from "../components/Error";
import Colaborador from "../components/Colaborador";

const Proyecto = () => {

    const params = useParams();
    const { obtenerProyecto, proyecto, handleModalForm, alerta } = useProyectos();
    const admin = useAdmin()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    const { nombre } = proyecto

    const { msg } = alerta

    return (
        <>
            <div className={'flex justify-between'}>
                <h1 className={'font-black text-4xl'}>{ nombre }</h1>

                {admin && (
                <div className={'flex items-center gap-2 text-gray-500 hover:text-black'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                    <Link
                        to={`/proyectos/editar/${params.id}`}
                        className={'uppercase font-bold'}
                    >
                        Editar
                    </Link>
                </div>
                )}
            </div>

            {admin && (
            <button
                onClick={ handleModalForm }
                type={'button'}
                className={'text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center'}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Nueva Tarea
            </button>
            )}
            <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>

            <div className='bg-white shadow mt-10 rounded-lg'>
                {proyecto.tareas?.length ?
                    proyecto.tareas?.map( tarea => (
                        <Tarea
                            key={tarea._id}
                            tarea={tarea}
                        />
                    )) :
                    <p className='text-center my-5 p-10'>No hay tareas en este proyecto</p>}
            </div>

            {admin && (
                <>
                    <div className={'flex items-center justify-between mt-10'}>
                        <div className={'flex'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                            <p className={'font-bold text-xl ml-2'}>Colaboradores</p>
                        </div>
                        <div className={'flex'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <Link
                                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                                className={'text-gray-500 uppercase hover:text-black font-bold'}
                            >Agregar</Link>
                        </div>
                    </div>

                    <div className='bg-white shadow mt-10 rounded-lg'>
                        {proyecto.colaboradores?.length ?
                            proyecto.colaboradores?.map( colaborador => (
                                <Colaborador
                                    key={colaborador._id}
                                    colaborador={colaborador}
                                />
                            )) :
                            <p className='text-center my-5 p-10'>No hay colaboradores en este proyecto</p>}
                    </div>
                </>
            )}

            <ModalForm />
            <ModalEliminar />
            <ModalEliminarColaborador />
        </>
    );
};

export default Proyecto;