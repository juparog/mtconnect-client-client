// Dependencias
const JWT = require('jsonwebtoken');

const userSignedIn = () => {
    const token = localStorage.getItem("token");
    let isValid = false;
    if(token){
        try {
            const decode = JWT.decode(token);
            isValid = true;
            // console.log(decode.user._id)
        } catch (error) {
            return false;
        }
    }
    return isValid;
}

exports.userSignedIn = userSignedIn;