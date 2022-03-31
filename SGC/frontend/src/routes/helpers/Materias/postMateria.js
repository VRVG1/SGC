const postMateria = async (dataPost) => {
    const post = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Nombre_Materia: dataPost.Materia_name,
            Grado: parseInt(dataPost.Materia_semestre, 10),
            Carrera: dataPost.materia_carrera
        })
    };
    const res = await fetch('http://localhost:8000/materia/create_materia', post);
    const result = res.statusText;
    return result;
}

export default postMateria;