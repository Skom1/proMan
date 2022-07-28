import React from 'react';
import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

const Login = () => {
    return (
        <>
            <h1 className={'text-sky-600 font-black text-6xl capitalize text-center'}>
                Inicia Sesion
            </h1>
            <form className={'my-10 bg-white shadow-xl rounded-lg px-10 py-5'}>
                <div className={'my-7'}>
                    <label className={'uppercase text-gray-600 block text-xl font-bold'} htmlFor={'email'}>Email</label>
                    <input
                        type={'email'}
                        placeholder={'Escribe tu email'}
                        className={'w-full mt-3 p-3 border rounded-lg bg-gray-50'}
                    />
                </div>
                <div className={'my-7'}>
                    <label className={'uppercase text-gray-600 block text-xl font-bold'} htmlFor={'password'}>Password</label>
                    <input
                        type={'password'}
                        placeholder={'Escribe la contrasena'}
                        className={'w-full mt-3 p-3 border rounded-lg bg-gray-50'}
                    />
                </div>

                <input
                    type={'submit'}
                    value={'Iniciar Sesion'}
                    className={'bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'}
                />
            </form>

            <nav className={'lg:flex lg:justify-between'}>
                <Link
                    className={'block text-center text-slate-500 uppercase text-sm'}
                    to={'/registrar'}
                >Registrar</Link>
                <Link
                    className={'block text-center text-slate-500 uppercase text-sm'}
                    to={'/olvide-password'}
                >Olvide Mi Password</Link>
            </nav>
        </>
    );
};

export default Login;