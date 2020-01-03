import {api} from './index'

export const getAllUsers = () => api.get('/users')
export const deleteUserById = id => api.delete(`/users/${id}`)
export const insertUser = payload => api.post('/users', payload)
export const updateUserById = (id, payload) => api.put(`/users/${id}`, payload)
export const getUserById = id => api.get(`/users/${id}`)
export const getUserEmails = () => api.get('users/emails')