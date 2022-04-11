/**
 * Metodo para hacer la peticion a la base de datos y recibir todas las materias
 * @returns array con todas las materias
 */
const getAllMaterias = async () => {
    const url = "http://localhost:8000/materia/materias";
    const res = await fetch(url);
    const data =  res.json();
    return data;
}

export default getAllMaterias;