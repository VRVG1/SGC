import addHeaderAuth from '../Auth/AuthPostBasis'

const makeRestore = (token, formData) => {
  let post = {
    method: 'POST',
    headers: {
    },
    body: formData
  };

  post = addHeaderAuth(token, post);
  const url = "http://localhost:8000/respaldo/upload-restore";
  fetch(url, post)
    .then(response => {
      console.log("Si hubo respuesta: ", response);
    });
}

export default makeRestore;
