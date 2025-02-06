import axios from "axios";

// Criação da instância do Axios
const api = axios.create({
  baseURL: "https://pfc-backend-production.up.railway.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Adicionando um interceptor para incluir o token de autenticação nas requisições
api.interceptors.request.use(
  (config) => {
    // Obtém o token do localStorage
    const token = localStorage.getItem("token");

    // Se o token estiver presente, adiciona ao cabeçalho Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
