import AuthPostBasics from '../Auth/AuthPostBasis.js';

const postGeneran = async (dataPost, token) => {
    console.log(dataPost);
    let post = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ID_Generan: dataPost.Generan_ID,
            Nombre_Generan: dataPost.Generan_name,
            Carrera: dataPost.generan_carrera
        })
    };
    post = AuthPostBasics(token, post);
    const res = await fetch('http://');
    const result = res.statusText;
    return result;
}