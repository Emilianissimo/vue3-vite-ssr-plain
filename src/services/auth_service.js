import axios from "axios";
import JwtService from "./jwt_service";

const API_URL = `${import.meta.env.VITE_API_HOST}/api/auth/`

class AuthService {
    async login(user) {
        const response = await axios
            .post(API_URL + 'login', {
                email: user.email,
                password: user.password
            });
        if (response.data.token) {
            let parsedToken = response.data.token.replace('Bearer ', '');
            JwtService.storeToken(parsedToken);
        }
        return response.data;
    }

    logout(){
        JwtService.deleteToken()
    }

    register(user){
        return axios
            .post(API_URL + 'register', {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                confirmation: user.confirmation
            })
    }

    async update({
        id=null,
        email=null,
        first_name=null,
        last_name=null,
        password=null,
        family_id=null
    }){
        let params = {family_id}
        if(email != null){
            params.email = email
        }
        if(first_name != null){
            params.first_name = first_name
        }
        if(last_name != null){
            params.last_name = last_name
        }
        if(password != null){
            params.password = password
        }
        const response = await axios
            .patch(API_URL + 'me', params, {
                params: { family_id },
                headers: JwtService.getTokenHeader()
            });
        return response.data;
    }
}

export default new AuthService;
