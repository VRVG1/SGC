import AuthPostBasics from '../Auth/AuthPostBasis.js';
/**
 * Helper para la peticion de agregar una materia
 * @param {obj:string} dataPost 
 * @param {string} token 
 * @returns 
 */
const postMateria = async (dataPost, token) => {
    let post = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Nombre_Materia: dataPost.Materia_name,
            Grado: parseInt(dataPost.Materia_semestre, 10),
            Carrera: dataPost.materia_carrera
        })
    };
    post = AuthPostBasics(token, post);
    const res = await fetch('http://localhost:8000/materia/create-materia', post);
    const result = res.statusText;
    return result;
}

export default postMateria;