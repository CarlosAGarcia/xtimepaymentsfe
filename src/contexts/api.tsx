import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { useAuth } from './auth/authContext';

const { REACT_APP_API_URL } = process.env

// Create an Axios instance with the base URL of your backend API
const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  withCredentials: true,  // Ensure cookies are sent with every request
});

// Interceptor to handle responses and refresh the access token on 401 errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // If the response is successful, return the response data as-is
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Check if the error is a 401 Unauthorized and if this request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Mark this request as retried to avoid loops

      try {
        // Make a request to refresh the access token
        const { data } = await axiosInstance.get('/api/auth/refreshToken');
        const { accessToken, success } = data;
        if (!success) throw new Error('Access token not provided');

        if (accessToken) {
          const { setAccessToken } = useAuth()

          // saves the new access token to the authContext accessToken state
          setAccessToken(`${accessToken}`);
          // saves it to localstorage
          localStorage.setItem('accessToken', `${accessToken}`);
          
          // Retry the original failed request with the new access token
          return axiosInstance(originalRequest);
        } else {
          throw new Error('Access token not provided');
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Handle failed token refresh (e.g., redirect to login or display an error)
        return Promise.reject(refreshError);
      }
    }

    // If the error is not a 401, or if it fails again, reject the promise with the error
    return Promise.reject(error);
  }
);

// Export the Axios instance for use in API calls across your application
export default axiosInstance;
