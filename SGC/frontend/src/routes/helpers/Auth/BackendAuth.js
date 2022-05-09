export const BackendAuthProvider = {
  isAuthenticated: false,
  signin:(formData, callback, failureCallback) => {
    const post = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password")
      })
    };

    fetch('http://localhost:8000/verificacion/token-auth/', post)
      .then(response => {
        console.log("Convirtiendo a json...")
        return response.json();
      })
      .then(data => {
        console.log("Solicitud aceptada... redirigiendo");
        console.log(data);
        callback(data);
      })
      .catch(error => {
        console.log("Solicitud rechazada... ejecutando failure");
        failureCallback(error)
      });
  },
  signout: async (callback) => {
    callback();
  }
};
