/**
 * Helper para hacer la borracion de todos los asignan, generarn, aloja y reportes que existen
 */
 import AuthPostBasics from '../Auth/AuthPostBasis.js'; 
 const borrarSemestre = async (token, mensajeTXT, pk) =>{
     let post = {
         method: 'GET',
         headers: {
             'Content-Type': 'application/json',
         },
     }
     post = AuthPostBasics(token, post);
     const res = await fetch('http://127.0.0.1:8000/reporte/admin-mail', post);
     const result = res.statusText;
     return result;
 
 }
 
 export default borrarSemestre;
 