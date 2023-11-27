import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return true;
    }
    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  },
  fetchAccessToken: () => {
    // Add logic to fetch the new access token using the refresh token
  },
  handleFetch: accessToken => {
    // Add logic to store the new access token in local storage
    localStorage.setItem('accessToken', accessToken);
  },
  handleError: err => {
    console.warn('Your refresh token is invalid. Please log in again.');
    console.error(err);
    // Add logic to handle the error
  },
});