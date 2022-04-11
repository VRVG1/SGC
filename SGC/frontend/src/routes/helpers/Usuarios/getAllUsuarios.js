
/**
 * Metodo para hacer la peticion a la base de datos y recibir todos los usuarios
 * @returns array con todos los usuarios
 */
const getAllUsuarios = async () => {
    const url = "http://localhost:8000/usuario/users";
    const res = await fetch(url);
    const data =  res.json();
    return data;
}

export default getAllUsuarios;