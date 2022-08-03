import React from 'react';
import { useContext } from "react";
import ProyectosContext from "../context/ProyectosProvider";

const UseProyectos = () => {
    return useContext(ProyectosContext);
};

export default UseProyectos;