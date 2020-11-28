class Utils {
    static ACCESS_TOKEN = 'access_token';
    static REFRESH_TOKEN = 'refresh_token';
    static PUBLIC_TOKEN = 'public_token';
    static backendURL ="http://localhost/Codechef Backend/public/index.php";

    static isLoggedIn() {
        return localStorage.getItem(this.ACCESS_TOKEN) != null && localStorage.getItem(this.REFRESH_TOKEN) != null;
    }

}

export default Utils;