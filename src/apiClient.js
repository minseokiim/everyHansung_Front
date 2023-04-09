import axios from 'axios';

const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// accessToken 만료시 재발급
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("http://localhost:8080/auth/refresh", {
          refreshToken,
        });

        localStorage.setItem("accessToken", response.data.accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        // Handle refresh token failure, log out or show a message to the user
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
