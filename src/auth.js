// Dependencias
import JWT from 'jsonwebtoken';

const auth = {
    userSignedIn: () => {
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
}

export default auth;