import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    },
})

export const getAllVehicles = () => api.get('/vehicles')
export const deleteVehicleById = id => api.delete(`/vehicles/${id}`)
export const insertVehicle = payload => api.post('/vehicles', payload)
export const updateVehicleById = (id, payload) => api.put(`/vehicles/${id}`, payload)
export const getVehicleById = id => api.get(`/vehicles/${id}`)

const apis = {
    getAllVehicles,
    deleteVehicleById,
    insertVehicle,
    updateVehicleById,
    getVehicleById,
}

export default apis