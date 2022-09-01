import React from 'react';
import { formatearFecha } from "../../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";


const Tarea = ({ tarea }) => {

    const { handleModalEditar, handleModalEliminar} = useProyectos()

    const { nombre, descripcion, fecha, prioridad, estado, _id } = tarea

    return (
        <div className={'border-b p-5 flex justify-between items-center'}>
            <div>
                <p className="mb-1 text-xl font-bold">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-1 text-xl font-bold">{ formatearFecha(fecha) }</p>
                <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
                { estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {tarea.completado.nombre}</p>}
            </div>
            <div
                className="flex flex-col lg:flex-row gap-2"
            >
                <button
                    className={'bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'}
                    onClick={() => handleModalEditar(tarea) }
                >Editar</button>
                { estado ?
                    <button
                        className={'bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'}
                    >Completa</button> :
                    <button
                        className={'bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'}
                    >Incompleta</button>
                }

                <button
                    className={'bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'}
                    onClick={ () => handleModalEliminar(tarea) }
                >Eliminar</button>
            </div>

        </div>
    );
};

export default Tarea;