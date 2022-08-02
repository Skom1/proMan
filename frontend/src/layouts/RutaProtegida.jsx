import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();

    if(cargando) return 'Cargando'
    console.log(auth);

    return (
        <>
            {auth._id ? <Outlet /> : <Navigate to={'/'}/>}
        </>
    );
};

export default RutaProtegida;