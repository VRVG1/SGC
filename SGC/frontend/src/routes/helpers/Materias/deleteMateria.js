const deleteMateria = async (id) => {
    console.log(id)
    const res = await fetch("http://localhost:8000/materia/delete-materia/" + id, { method: 'DELETE'});
    const data = res.statusText;
    return data;
}

export default deleteMateria;