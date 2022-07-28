import { useEffect, useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import Error from "../components/Error";
import axios from "axios";

const Registrar = () => {

    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repetirPassword, setRepetirPassword ] = useState('');
    const [ error, setError] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        if([ nombre, email, password, repetirPassword ].includes('')){
            setError({
                msg: 'Todos Los Campos Son Obligatorios',
                error: true
            })
            return
        }

        if(password != repetirPassword){
            setError({
                msg: 'Los Password No Son Iguales',
                error: true
            })
            return
        }

        if(password.length < 8){
            setError({
                msg: 'Debe Contener Minimo 8 Caracteres',
                error: true
            })
            return
        }

        setError({})

        // Crear Usuario API
        try{
            const { data } = await axios.post('http://localhost:4000/api/usuarios',
            {nombre, email, password} )

            setError({
                msg: data.msg,
                error: false
            })
        } catch (e){
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
                Registrarse
            </h1>

            { msg && <Error alerta={error} /> }

            <form
                className={'my-10 bg-white shadow-xl rounded-lg px-10 py-5'}
                onSubmit={handleSubmit}
            >
                <div className={'my-7'}>
                    <label className={'uppercase text-gray-600 block text-xl font-bold'} htmlFor={'nombre'}>Nombre Usuario</label>
                    <input
                        id={'nombre'}
                        type={'text'}
                        placeholder={'Escribe tu nombre'}
                        className={'w-full mt-3 p-3 border rounded-lg bg-gray-50'}
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className={'my-7'}>
                    <label className={'uppercase text-gray-600 block text-xl font-bold'} htmlFor={'email'}>Email</label>
                    <input
                        id={'email'}
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
                        id={'password'}
                        type={'password'}
                        placeholder={'Escribe la contrasena'}
                        className={'w-full mt-3 p-3 border rounded-lg bg-gray-50'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className={'my-7'}>
                    <label className={'uppercase text-gray-600 block text-xl font-bold'} htmlFor={'password2'}>Repetir Password</label>
                    <input
                        id={'password2'}
                        type={'password'}
                        placeholder={'Escribe la contrasena'}
                        className={'w-full mt-3 p-3 border rounded-lg bg-gray-50'}
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)}
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
                    to={'/'}
                >Ya tienes una cuenta? <span className={'text-sky-600'}>Inicia Sesion</span></Link>
                <Link
                    className={'block text-center text-slate-500 uppercase text-sm'}
                    to={'/olvide-password'}
                >Olvide Mi Password</Link>
            </nav>
        </>
    );
};

export default Registrar;