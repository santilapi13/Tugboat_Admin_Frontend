import React, { useState } from 'react';
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import axios from 'axios';

function Login({ endpointLogin, endpointLogout }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;

        if (username === '' || password === '') {
            setError(true);
            return;
        }

        setError(false);
    
        try {
            response = await axios.post(endpointLogin, {
            username: username,
            password: password,
        }, { withCredentials: true });

        console.log('Respuesta del servidor:', response.data.payload);

        if (response.data.payload.role !== 'ADMIN') {
            setErrorResponse('No tiene permisos para ingresar a esta aplicación');
            auth.signout();
            return;
        }

        auth.saveUser(response.data.payload);

        if (auth.isAuthenticated) {
            return <Navigate to="/home" />;
        }
        
        } catch (error) {
            console.log(error.response.status)
            if (error.response.status === 400) {
                console.error('Error:', error.response.data.error);
                setErrorResponse("Credenciales inválidas. Intente de nuevo.");
                return;
            }

            if (error.response) {
                console.error('Respuesta del servidor:', error.response.data.error);
                setErrorResponse('Respuesta del servidor:', error.response.data.error);
                return;
            }

            if (error.request) {
                console.error('No se recibió respuesta del servidor');
                setErrorResponse('No se recibió respuesta del servidor');
            } else {
                console.error('Error al enviar la solicitud:', error.message);
                setErrorResponse('Error al enviar la solicitud:', error.message);
            }
        }
    };

    if (auth.isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return (
        <div className="lg:w-1/2 bg-white px-10 py-10 rounded-3xl border-2 border-gray-100"> 
            <h1 className="text-5xl font-semibold">Inicio de sesión</h1>
            {errorResponse && <div className="text-red-500 font-bold">{errorResponse}</div>}
            <p className="font-medium text-lg text-gray-500 mt-4">Ingrese su nombre de usuario y contraseña.</p>
            <form className="mt-8" onSubmit={ handleSubmit }>
                <div>
                    <label className="text-lg font-medium">Usuario</label>
                    <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Ingrese su nombre de usuario"
                        value = { username }
                        onChange = { handleUsernameChange }
                    />
                </div>
                <div>
                    <label className="text-lg font-medium">Password</label>
                    <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Ingrese su contraseña"
                        type="password"
                        value = { password }
                        onChange = { handlePasswordChange }
                    />
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="px-6 py-2.5 ml-1 bg-gray-500 border-black text-white font-bold leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" type="submit">Ingresar</button>
                </div>
            </form>
            { error && <p className="text-red-500 font-bold">Todos los campos son requeridos</p> }
        </div>
    );
}

export default Login;