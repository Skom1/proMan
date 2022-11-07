import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from "axios";
import Error from '../components/Error'


const ConfirmarCuenta = () => {

    const [alerta, setAlerta] = useState({})
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

    const params = useParams();
    const { id } = params

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${id}`
                const { data } = await axios(url)

                setAlerta({
                    msg: data.msg,
                    error: false
                })

                setCuentaConfirmada(true)

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        confirmarCuenta();
    }, [])

    const { msg } = alerta

    return (
        <>
            <h1 className="text-sky-600 font-black text-5xl capitalize text-center">Confirma tu cuenta y Comienza a crear tus {''}
                <span className="text-slate-700">proyectos</span>
            </h1>

            <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Error alerta={alerta} />}

                {cuentaConfirmada && (
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm'
                        to="/"
                    >Inicia Sesión</Link>
                )}
            </div>
        </>
    )
}

export default ConfirmarCuenta