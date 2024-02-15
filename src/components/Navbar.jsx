import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        if (window.innerWidth < 768) {
            setClicked(!clicked);
        }
    };

    return (
    <>
        <div className="flex bg-zinc-700 p-6 items-center justify-between">
            <h2 className="text-white font-normal text-2xl">Administración</h2>

            <div className={`z-50 absolute offScreen right-0 mr-auto ml-auto text-center ease-in-out md:static md:m-0 text-white ${clicked ? "w-full block top-1/3 left-0 mt-2" : ""}`}>
                <Link onClick={handleClick} to="/" className={`mr-4 text-xl md:text-base md:text-white md:inline ${clicked ? "text-3xl mt-4" : ""}`}>
                    Home
                </Link>
                <Link onClick={handleClick} to="/banderas" className={`mr-4 text-xl md:text-base md:text-white md:inline ${clicked ? "text-3xl mt-4" : ""}`}>
                    Banderas
                </Link>
                <Link onClick={handleClick} to="/buques" className={`mr-4 text-xl md:text-base md:text-white md:inline ${clicked ? "text-3xl mt-4" : ""}`}>
                    Buques
                </Link>
                <Link onClick={handleClick} to="/capitanes" className={`mr-4 text-xl md:text-base md:text-white md:inline ${clicked ? "text-3xl mt-4" : ""}`}>
                    Capitanes
                </Link>
                <Link onClick={handleClick} to="/maniobras" className={`mr-4 text-xl md:text-base md:text-white md:inline ${clicked ? "text-3xl mt-4" : ""}`}>
                    Maniobras
                </Link>
                <Link onClick={handleClick} to="/remolcadores" className={`mr-4 text-xl md:text-base md:text-white md:inline ${clicked ? "text-3xl mt-4" : ""}`}>
                    Remolcadores
                </Link>
                <Link onClick={handleClick} to="/solicitantes" className={`mr-4 text-xl md:text-base md:text-white md:inline ${clicked ? "text-3xl mt-4" : ""}`}>
                    Solicitantes
                </Link>
                <Link onClick={handleClick} to="/tripulantes" className={`mr-4 text-xl md:text-base md:text-white md:inline ${clicked ? "text-3xl mt-4" : ""}`}>
                    Tripulantes
                </Link>
                <Link onClick={handleClick} to="/users" className={`mr-4 text-xl md:text-base md:text-white md:inline ${clicked ? "text-3xl mt-4" : ""}`}>
                    Usuarios
                </Link>
            </div>
        </div>
    </>
    );
}

export default Navbar;