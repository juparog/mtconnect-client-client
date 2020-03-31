// Dependencias
const JWT = require('jsonwebtoken');

// Funcion para verificar si un usuario se encuentra logueado
const userSignedIn = () => {
  const token = localStorage.getItem('token');
  let isValid = false;
  if (token) {
    try {
      if (JWT.decode(token)) {
        isValid = true;
      }
    } catch (error) {
      return false;
    }
  }
  return isValid;
};

exports.userSignedIn = userSignedIn;
