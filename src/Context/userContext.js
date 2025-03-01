import { useState , useEffect, createContext } from "react";
import axios from 'axios';

export const UserContext = createContext(null);

export default function  UserState ({children}) {
  
    const [currentuser , setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentuser')) || null)

    const login = async (user) => {
        try {

            const API_URL = process.env.REACT_APP_API_URL;


            const response = await axios.post(
                `${API_URL}/api/v1/gameusers/auth`,
                user,
                { withCredentials: true }
            );
            
            if (response.data) {
                setCurrentUser(response.data); 
                return response.data; // Ensure data is returned
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
            return null; 
        }
    };
    

    const logOut = async () => {
        try {
            await axios.post("http://localhost:8000/api/v1/users/logout", {}, { withCredentials: true });
            setCurrentUser(null);
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout failed", error.response ? error.response.data : error.message);
        }
    };
    
   

    useEffect(()=>{
    localStorage.setItem("currentuser" , JSON.stringify(currentuser))
    
    
    },[currentuser])


    return <UserContext.Provider value={{currentuser , setCurrentUser, login , logOut }}>{children}</UserContext.Provider>


} 