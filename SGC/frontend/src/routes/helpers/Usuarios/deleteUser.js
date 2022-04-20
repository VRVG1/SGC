const deleteUser = async (id) =>{
    const res = await fetch("http://localhost:8000/usuario/delete-user/" + id, { method: 'DELETE'});
    const result = res.statusText;
    return result;
}

export default deleteUser;