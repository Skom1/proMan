import React from 'react';
import {useEffect} from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import proyectos from "./Proyectos.jsx";

const Proyecto = () => {

    const params = useParams();
    const { obtenerProyecto, proyecto } = useProyectos();

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    const { nombre, descripcion } = proyecto

    return (
        <div>
            <h1 className={'font-black text-4xl'}>{ nombre }</h1>
        </div>
    );
};

export default Proyecto;