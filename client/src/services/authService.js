import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para añadir token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const authService = {
  register: async (username, password) => {
    const response = await api.post('/register', { username, password })
    return response.data
  },

  login: async (username, password) => {
    const response = await api.post('/login', { username, password })
    return response.data
  },

  verify: async () => {
    const response = await api.get('/verify')
    return response.data.user
  }
}

export const objetivosService = {
  getAll: async () => {
    const response = await api.get('/objetivos')
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/objetivos/${id}`)
    return response.data
  },

  create: async (titulo, descripcion) => {
    const response = await api.post('/objetivos', { titulo, descripcion })
    return response.data
  },

  update: async (id, titulo, descripcion) => {
    const response = await api.put(`/objetivos/${id}`, { titulo, descripcion })
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/objetivos/${id}`)
    return response.data
  },

  setPrincipal: async (id) => {
    const response = await api.patch(`/objetivos/${id}/principal`)
    return response.data
  },

  setCompletado: async (id, completado) => {
    const response = await api.patch(`/objetivos/${id}/completado`, { completado })
    return response.data
  }
}

export default api

