const postCarrera = async (dataPost) => {
    const post = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Nombre_Carrera: dataPost
        })
    };
    const res = await fetch('http://localhost:8000/materia/create_carrera', post);
    const result = res.statusText;
    return result;
}

export default postCarrera;