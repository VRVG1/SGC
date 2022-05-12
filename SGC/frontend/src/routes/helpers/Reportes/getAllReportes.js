import AuthPostBasics from '../Auth/AuthPostBasis.js';

const getAllReportes = async (token) => {
    let get = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    get = AuthPostBasics(token, get);
    const res = await fetch('http://localhost:8000/reporte/reportes', get);
    const result = res.statusText;
    const data = res.json();
    return data;
}

export default getAllReportes;