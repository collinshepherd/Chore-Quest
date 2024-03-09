import { jwtDecode } from 'jwt-decode';

class AuthService {
    getProfile() {
        return jwtDecode(this.getToken());
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        // if (this.getToken() === undefined) {
        //   return;
        // }
        const token = this.getToken();

        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        // console.log(localStorage.getItem('id_token'));
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // Saves user token to localStorage
        console.log(idToken);
        localStorage.setItem('id_token', idToken);

        // window.location.assign('/')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();
