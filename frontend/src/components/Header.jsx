import React, { useState } from 'react';
import useProyectos from "../hooks/useProyectos";
import { Link } from 'react-router-dom'
import Busqueda from "./Busqueda";
import useAuth from "../hooks/useAuth";

const Header = () => {

    const { handleBuscador, cerrarSesionProyectos } = useProyectos()
    const { cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
        cerrarSesionProyectos()
        localStorage.removeItem('token')
    }

    return (
        <header className={'px-4 py-5 bg-white border-b'}>
            <div className={'md:flex md:justify-between'}>
                <Link
                    to={'/proyectos'}
                    className={'text-4xl text-sky-600 font-black text-center mb-5 md:mb-0 hover:text-sky-500'}>
                    ProMan
                </Link>
                <div className={'flex flex-col md:flex-row items-center gap-4'}>
                    <button
                        type={'button'}
                        className={'font-bold uppercase bg-green-500 py-3 px-5 text-white rounded-md text-sm hover:bg-green-400'}
                        onClick={handleBuscador}
                    >Buscar</button>
                    <button
                        type={'button'}
                        className={'text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold hover:bg-sky-500'}
                        onClick={handleCerrarSesion}
                    >
                        Cerrar Sesion
                    </button>
                    <Busqueda />
                </div>
            </div>
        </header>
    );
};

export default Header;