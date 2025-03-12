import axios from 'axios'
export const axiosInstance=axios.create({
    baseURL:import.meta.ens.NODE=="development"?"http://localhost:5001/api":"/",
    withCredentials:true
});