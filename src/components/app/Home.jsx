function Home() {
    const tab = "\u00A0";
    return (
        <div> 
            <h1 className="pt-6 text-center font-bold text-4xl p-3">Home</h1>
            <div className="text-center text-2xl mb-4">
                <p>Bienvenido al sistema de administración.</p>
                <p>Seleccione un elemento de la barra de navegación para consultar o agregar nuevos elementos.</p>
            </div>
        </div>
    );
}

export default Home;