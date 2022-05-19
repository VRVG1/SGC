import AuthPostBasic from '../Auth/AuthPostBasis.js';
/**
 * Metodo helper para actualizar los datos del usuario 
 * @param {Array} dataUser datos del usuario
 * @param {*} id PK del usuario 
 * @returns 
 */
const putUsuarios = async (dataUser, id, token) => {
    let post = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Nombre_Usuario: dataUser.Nombre_Usuario,
            Tipo_Usuario: dataUser.Tipo_Usuario,
            CorreoE: dataUser.CorreoE,
            usename: dataUser.usename,
            password: dataUser.password,
            permiso: dataUser.permiso,
        })

    }
    post = AuthPostBasic(token);
    const url = "http://localhost:8000/usuario/update-user/" + id;
    const res = await fetch(url, post);
    const result = res.statusText;
    return result;
}

export default putUsuarios;