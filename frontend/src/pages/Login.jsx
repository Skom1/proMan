import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";
import useAuth from "../hooks/useAuth";
import axios from "axios";
// import ClienteAxios

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({})
    const { setAuth} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if([email, password].includes('')) {
            setError({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`,
                {email, password} );
            setError({})
            localStorage.setItem('token', data.token);
            setAuth(data);
            navigate('/proyectos')
        } catch (e) {
            setError({
                msg: e.response.data.msg,
                error: true
            })
        }
        
    }

    const { msg } = error

    return (
        <>
            <h1 className={'text-sky-600 font-black text-6xl capitalize text-center'}>
                Inicia Sesion
            </h1>

            {msg && <Error alerta={error}/>}

            <form
                className={'my-10 bg-white shadow-xl rounded-lg px-10 py-5'}
                onSubmit={handleSubmit}
            >
                <div className={'my-7'}>
                    <label className={'uppercase text-gray-600 block text-xl font-bold'} htmlFor={'email'}>Email</label>
                    <input
                        type={'email'}
                        placeholder={'Escribe tu email'}
                        className={'w-full mt-3 p-3 border rounded-lg bg-gray-50'}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className={'my-7'}>
                    <label className={'uppercase text-gray-600 block text-xl font-bold'} htmlFor={'password'}>Password</label>
                    <input
                        type={'password'}
                        placeholder={'Escribe la contrasena'}
                        className={'w-full mt-3 p-3 border rounded-lg bg-gray-50'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <input
                    type={'submit'}
                    value={'Iniciar Sesion'}
                    className={'bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'}
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