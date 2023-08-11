import axios from "axios";

export const checkLogin = async ({ email, password }) => {
    // const loginReturn = await axios.post(`${import.meta.env.VITE_AUTHENTICATIONURL}/login`, { email, password });
    const loginReturn = await axios.post(`http://localhost:5173/login`, { email, password });

    const loginStatus = loginReturn.status === 200;
    
    return loginStatus;
}
