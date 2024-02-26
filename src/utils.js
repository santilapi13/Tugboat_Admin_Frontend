const URL = 'https://api-puerto.up.railway.app/api';

const endpoints = {
    banderas: `${URL}/banderas`,
    buques: `${URL}/buques`,
    capitanes: `${URL}/capitanes`,
    maniobras: `${URL}/maniobras`,
    remolcadores: `${URL}/remolcadores`,
    solicitantes: `${URL}/solicitantes`,
    tripulantes: `${URL}/tripulantes`,
    users: `${URL}/users`,
    register: `${URL}/sessions/signup`,
    login: `${URL}/sessions/login`,
    logout: `${URL}/sessions/logout`
}

export default endpoints;