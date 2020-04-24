import JWT from 'jsonwebtoken';

const auth = {
  /**
   * Verifica si hay una sesion iniciada
   *
   * @returns {Boolean} Retorna true si hay una session valida
   */
  userSignedIn: () => {
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
  },
};

export default auth;
