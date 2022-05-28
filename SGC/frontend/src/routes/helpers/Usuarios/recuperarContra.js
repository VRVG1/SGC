import AuthPostBasics from '../Auth/AuthPostBasis.js'; 
/**
 * Metodo para recuperar contrasena
 * @returns result
 */
const recuperarContra = async (dataInput) => {
    console.log(dataInput);
    let get = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: dataInput.username,
            email: dataInput.email,
        })
    };

    const url = "http://localhost:8000/usuario/forgotPas";
    const res = await fetch(url, get);
    const result =  res.statusText;
    return result;
}

export default recuperarContra;