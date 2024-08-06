import decode from 'jwt-decode';

class AuthService {
  // Get the token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  // Check if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      return true; // If decoding fails, assume the token is expired
    }
  }

  // Get the user profile from the token
  getProfile() {
    return decode(this.getToken());
  }

  // Login the user and store the token
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/profile'); // Redirect to profile page after login
  }

  // Logout the user by removing the token
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/'); // Redirect to home page after logout
  }
}

export default new AuthService();
