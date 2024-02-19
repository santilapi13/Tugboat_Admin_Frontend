import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from "react-bootstrap/Spinner";

function Users({ endpointUsers, endpointRegister }) {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('ADMIN');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            let response;
            try {
                response = await axios.get(endpointUsers, { withCredentials: true });
                console.log('Respuesta del servidor:', response.data);
                setUsers(response.data.payload);
                setLoading(false);
            } catch (error) {
                if (error.response) {
                    console.error('Respuesta del servidor:', error.response.data);
                } else if (error.request) {
                    console.error('No se recibió respuesta del servidor');
                } else {
                    console.error('Error al enviar la solicitud:', error.message);
                }
                setLoading(false);
            }
        }

        fetchData();
    }, [endpointUsers]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
    
        try {
            response = await axios.post(endpointRegister, {
            username: username,
            password: password,
            role: role
        }, { withCredentials: true });
    
        console.log('Respuesta del servidor:', response.data);

        const newUser = response.data.payload;
        setUsers([...users, newUser]);
        setUsername('');
        setPassword('');

        } catch (error) {
            if (error.response) {
                console.error('Respuesta del servidor:', error.response.data);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor');
            } else {
                console.error('Error al enviar la solicitud:', error.message);
            }
        }
    };

    const handleDelete = async (uid) => {
        let response;
        try {
            response = await axios.delete(`${endpointUsers}/${uid}`, { withCredentials: true });
            console.log('Respuesta del servidor:', response.data);
            setUsers(users.filter((user) => user._id !== uid));
        } catch (error) {
            if (error.response) {
                console.error('Respuesta del servidor:', error.response.data);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor');
            } else {
                console.error('Error al enviar la solicitud:', error.message);
            }
        }
    };

    return (
        <>
            { loading ? (
                <div className="pt-6 text-center font-bold text-4xl my-20">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div className="text-center p-1">
                    <h1 className="pt-6 text-center font-bold text-4xl p-3">Registrar nuevo usuario</h1>
                    <form onSubmit={ handleSubmit }>
                        <label>
                            <input
                                className="px-3 py-2 my-3 text-xl rounded-3xl border border-solid border-black bg-zinc-300 placeholder:text-gray-600"
                                type="text"
                                placeholder="Usuario..."
                                value = { username }
                                onChange = { handleUsernameChange }
                            />
                            <input
                                className="px-3 py-2 my-3 text-xl rounded-3xl border border-solid border-black bg-zinc-300 placeholder:text-gray-600"
                                type="password"
                                placeholder="Contraseña..."
                                value = { password }
                                onChange = { handlePasswordChange }
                            />
                            <select id="role" name="role" onChange={ handleRoleChange }>
                                <option value="ADMIN">Administrador</option>
                                <option value="CAPITAN">Capitán</option>
                                <option value="SUPERVISOR">Supervisor</option>
                                <option value="CONTADOR">Contador</option>
                            </select>
                        </label>
                        <br />
                        <button className="px-6 py-2.5 ml-1 bg-gray-500 border-black text-white font-bold leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" type="submit">Agregar</button>
                    </form>

                    <h1 className="text-center font-bold text-4xl pt-4">Usuarios registrados</h1>
                    { users.length == 0 && <h2>Aún no existen usuarios</h2> }
                    <ul className="font-medium text-center text-2xl pt-1">
                        { users.map((user) => (
                            <li className="py-1" key={ user._id }>
                                { user.username } - { user.role }
                                <button onClick={ () => handleDelete(user._id) } className=" text-base px-6 py-2.5 ml-1 bg-gray-500 border-black text-white font-bold leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" type="submit">Eliminar</button>
                            </li>
                        )) }
                    </ul>
                </div>
            )}
        </>
    );
}

export default Users;