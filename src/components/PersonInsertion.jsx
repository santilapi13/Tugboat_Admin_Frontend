import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from "react-bootstrap/Spinner";

function PersonInsertion({ endpoint, personName: personType }) {
    const [people, setPeople] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            let response;
            try {
                response = await axios.get(endpoint, { withCredentials: true });
                console.log('Respuesta del servidor:', response.data);
                setPeople(response.data.payload);
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
    }, [endpoint]);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
    
        try {
            response = await axios.post(endpoint, {
            first_name: firstName,
            last_name: lastName,
        }, { withCredentials: true });
    
        console.log('Respuesta del servidor:', response.data);

        const newPerson = response.data.payload;
        setPeople([...people, newPerson]);
        setFirstName('');
        setLastName('');

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
                    <h1 className="pt-6 text-center font-bold text-4xl p-3">Agregar { personType }</h1>
                    <form onSubmit={ handleSubmit }>
                        <label>
                            <input
                                className="px-3 py-2 my-3 text-xl rounded-3xl border border-solid border-black bg-zinc-300 placeholder:text-gray-600"
                                type="text"
                                placeholder="Nombre..."
                                value = { firstName }
                                onChange = { handleFirstNameChange }
                            />
                            <input
                                className="px-3 py-2 my-3 text-xl rounded-3xl border border-solid border-black bg-zinc-300 placeholder:text-gray-600"
                                type="text"
                                placeholder="Apellido..."
                                value = { lastName }
                                onChange = { handleLastNameChange }
                            />
                        </label>
                        <br />
                        <button className="px-6 py-2.5 ml-1 bg-gray-500 border-black text-white font-bold leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" type="submit">Agregar</button>
                    </form>

                    <h1 className="text-center font-bold text-4xl pt-4">Listado</h1>
                    { people.length == 0 && <h2>Aún no existen { personType }s</h2> }
                    <ul className="font-medium text-center text-2xl pt-1">
                        { people.map((person) => (
                            <li className="py-1" key={ person._id }>{ person.first_name } { person.last_name }</li>
                        )) }
                    </ul>
                </div>
            )}
        </>
    );
}

export default PersonInsertion;