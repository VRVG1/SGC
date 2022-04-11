/**
 * Metodo helper para actualizar los datos del usuario 
 * @param {Array} dataUser datos del usuario
 * @param {*} id PK del usuario 
 * @returns 
 */
const putUsuarios = async (dataUser, id) => {
    var post = {};
    if (dataUser.password === 'password') {
        post = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ID_Usuario: {
                    username: dataUser.username,
                    password: 'a',
                },
                Nombre_Usuario: dataUser.Nombre_Usuario,
                Tipo_Usuario: dataUser.Tipo_Usuario,
                CorreoE: dataUser.CorreoE
            })
        };
    } else {
        post = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ID_Usuario: {
                    username: dataUser.username,
                    password: dataUser.password,
                },
                Nombre_Usuario: dataUser.Nombre_Usuario,
                Tipo_Usuario: dataUser.Tipo_Usuario,
                CorreoE: dataUser.CorreoE
            })
        };
    }
    const url = "http://localhost:8000/usuario/update-user/" + id;
    const res = await fetch(url, post);
    const result = res.statusText;
    return result;
}

export default putUsuarios;