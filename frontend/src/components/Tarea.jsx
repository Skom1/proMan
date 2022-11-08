import React from 'react';
import { formatearFecha } from "../../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";


const Tarea = ({ tarea }) => {

    const { handleModalEditar, handleModalEliminar, completarTarea} = useProyectos()

    const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea

    const admin = useAdmin()

    return (
        <div className={'border-b p-5 flex justify-between items-center'}>
            <div className={'flex flex-col items-start'}>
                <p className="mb-1 text-xl font-bold">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-1 text-xl font-bold">{ formatearFecha(fechaEntrega) }</p>
                <p className="mb-1 text-gray-600 text-xl ">Prioridad: {prioridad}</p>
                { estado && <p className={'text-xs bg-green-600 uppercase rounded-lg text-white p-1'}>Completada Por: {tarea.completado.nombre}</p>}
            </div>

            <div className="flex flex-col lg:flex-row gap-2 ">
                {admin && (
                <button
                    className={'bg-indigo-600 hover:bg-indigo-500  px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'}
                    onClick={() => handleModalEditar(tarea) }
                >Editar</button>
                )}

                <button
                    className={`${estado ? 'bg-sky-600 hover:bg-sky-500' : 'bg-gray-600 hover:bg-gray-500'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                    onClick={() => completarTarea(_id)}
                >{estado ? 'Completa' : 'Incompleta'}</button>

                {admin && (
                <button
                    className={'bg-red-600 hover:bg-red-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'}
                    onClick={ () => handleModalEliminar(tarea) }
                >Eliminar</button>
                )}
            </div>

        </div>
    );
};

export default Tarea;