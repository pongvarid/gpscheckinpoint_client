import Axios from "axios"
import env from '../env';
const token =   (localStorage.getItem("access_token"))?`Token ${localStorage.getItem("access_token")}`:'';

const live = Axios.create({ 
    headers: {
        common: {
            'Authorization': token,
        },
    }, 
    baseURL: env.baseURL,
    timeout: 10000
})
  
export default live