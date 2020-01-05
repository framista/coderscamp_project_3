import {api} from './index'

export const getAllVehicleRoutes = () => api.get('/vehicleRoutes')
export const deleteVehicleRouteById = id => api.delete(`/vehicleRoutes/${id}`)
export const insertVehicleRoute = payload => api.post('/vehicleRoutes', payload)
export const updateVehicleRouteById = (id, payload) => api.put(`/vehicleRoutes/${id}`, payload)
export const getVehicleRouteById = id => api.get(`/vehicleRoutes/${id}`)