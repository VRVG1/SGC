import AuthPostBasics from '../Auth/AuthPostBasis.js'; 
const getReportesU = async (id, token) =>{
    let post = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    post = AuthPostBasics(token, post);
    const url = "http://localhost:8000/usuario/get-reportes/" + id;
    const res = await fetch(url, post);
    const result = await res.json();
    console.log("res", res);
    return result;
}

export default getReportesU;