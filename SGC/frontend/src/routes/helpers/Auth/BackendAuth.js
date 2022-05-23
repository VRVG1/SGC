export const BackendAuthProvider = {
  isAuthenticated: false,
  signin:(formData, callback) => {
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
        return response.json();
      })
      .then(data => {
        callback(data);
      });
  },
  signout: async (callback) => {
    callback();
  }
};
