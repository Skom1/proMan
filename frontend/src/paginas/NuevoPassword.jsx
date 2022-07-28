import React from 'react';

const NuevoPassword = () => {
    return (
        <>
            <h1 className={'text-sky-600 font-black text-6xl capitalize text-center'}>
                Reestablece Tu Password
            </h1>
            <form className={'my-10 bg-white shadow-xl rounded-lg px-10 py-5'}>
                <div className={'my-7'}>
                    <label className={'uppercase text-gray-600 block text-xl font-bold'} htmlFor={'password'}>Nuevo Password</label>
                    <input
                        id={'password'}
                        type={'password'}
                        placeholder={'Escribe la nueva contrasena'}
                        className={'w-full mt-3 p-3 border rounded-lg bg-gray-50'}
                    />
                </div>
                <input
                    type={'submit'}
                    value={'Guardad Contrasena'}
                    className={'bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'}
                />
            </form>
        </>
    );
};

export default NuevoPassword;