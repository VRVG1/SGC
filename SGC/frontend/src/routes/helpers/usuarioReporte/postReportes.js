import AuthPostBasics from '../Auth/AuthPostBasis.js'; 
const postReportes = async (token, formData) =>{
    for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }

    let post = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    }
    post = AuthPostBasics(token, post);
    const res = await fetch('http://127.0.0.1:8000/reporte/create-alojan', post);
    console.log(res);
    const result = res.statusText;
    console.log(result);
    return result;

}

export default postReportes;
