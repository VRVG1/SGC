const getAllCarrera = async () => {
    const url = "http://localhost:8000/materia/carreras"
    const res = await fetch(url)
    const data = await res.json()
    return data;
}

export default getAllCarrera;