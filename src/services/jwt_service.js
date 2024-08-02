import CookieService from "./cookie_service";
import { jwtDecode } from "jwt-decode";

class JwtService {
    static storeToken(token) {
        CookieService.setCookie('token', token, 3)
    }

    static checkToken() {
        if(!CookieService.getCookie('token')){
            return false;
        }
        let token = JwtService.getTokenData()
        if(!token){
            return false;
        }
        return true;
    }

    static deleteToken() {
        CookieService.eraseCookie('token')
    }

    static getTokenData() {
        let token = CookieService.getCookie('token')
        try{
            return jwtDecode(token)
        }catch(err){
            JwtService.deleteToken()
            return false
        }
    }

    static getTokenHeader(){
        if (JwtService.checkToken()) {
            return { Authorization: 'Bearer ' + CookieService.getCookie('token') }
        }
        return {}
    }

    static checkTokenAndDeleteItIfItIsExpired(){
        let token = CookieService.getCookie('token')
        try{
            return jwtDecode(token)
        }catch(err){
            JwtService.deleteToken()
        }
    }
}

export default JwtService;
