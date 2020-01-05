import axios from 'axios'
import {getAllVehicles, deleteVehicleById, insertVehicle, updateVehicleById, getVehicleById} from './vehicle'
import {getAllVehicleRoutes, deleteVehicleRouteById, insertVehicleRoute, updateVehicleRouteById, getVehicleRouteById} from './vehicleRoute'
import {getAllUsers, deleteUserById, insertUser, updateUserById, getUserById, getUserEmails} from './user'

export const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    },
})

const apis = {
    getAllVehicles,
    deleteVehicleById,
    insertVehicle,
    updateVehicleById,
    getVehicleById,
    getAllUsers,
    deleteUserById, 
    insertUser,
    updateUserById,
    getUserById,
    getUserEmails,
    getAllVehicleRoutes,
    deleteVehicleRouteById,
    insertVehicleRoute,
    updateVehicleRouteById,
    getVehicleRouteById,
}

export default apis