import { jwtDecode } from 'jwt-decode'

class AuthService {
    getProfile() {
        return jwtDecode(this.getToken())
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        // if (this.getToken() === undefined) {
        //   return;
        // }
        const token = this.getToken()
        console.log(token)
        return !!token && !this.isTokenExpired(token)
    }

    userLoggedIn() {
        // Checks if there is a saved token and it's still valid
        // if (this.getToken() === undefined) {
        //   return;
        // }
        const userToken = this.getUserToken()
        console.log(userToken)
        return !! userToken && !this.isUserTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token)
            if (decoded.exp < Date.now() / 1000) {
                return true
            } else return false
        } catch (err) {
            return false
        }
    }

    isUserTokenExpired(userToken) {
        try {
            const decoded = jwtDecode(userToken)
            if (decoded.exp < Date.now() / 1000) {
                return true
            } else return false
        } catch (err) {
            return false
        }
    }

    getToken() {
        // Retrieves the account token from localStorage
        console.log(localStorage.getItem('id_token'))
        return localStorage.getItem('id_token')
    }

    getUserToken() {
        // Retrieves the user token from localStorage
        console.log(localStorage.getItem('id_token'))
        return localStorage.getItem('id_token')
    }

    login(idToken) {
        // Saves account token to localStorage
        console.log(idToken)
        localStorage.setItem('id_token', idToken)
    }

    
    userLogin(useridToken) {
        // Saves user token to localStorage
        console.log(useridToken)
        localStorage.setItem('user_id_token', useridToken)

    }


    logout() {
        // Clear account token and profile data from localStorage
        localStorage.removeItem('id_token')
        // this will reload the page and reset the state of the application
        window.location.assign('/')
    }

    userLogout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('user_id_token')
        // this will reload the page and reset the state of the application
        window.location.assign('/userLogin')
    }
}

export default new AuthService()
