import useProyectos from "./useProyectos";
import useAuth from "./useAuth";
import React from 'react';

const UseAdmin = () => {

    const { proyecto } = useProyectos()
    const { auth } = useAuth()

    return proyecto.creador === auth._id;

};

export default UseAdmin;