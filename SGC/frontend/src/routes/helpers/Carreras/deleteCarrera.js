const deleteCarrera = async (id) => {
    const res = await fetch("http://localhost:8000/materia/delete-carrera/" + id, { method: 'DELETE'});
    const data = res.statusText;
    return data;
}

export default deleteCarrera;