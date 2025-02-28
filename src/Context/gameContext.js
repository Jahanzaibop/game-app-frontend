import { useState , useEffect, createContext } from "react";
import axios from "axios";


export const GameContext = createContext(null)

export default function GameState({children}){

  
  const [games , setGames]  = useState([])


  useEffect(()=>{

 



const fetchGames = async()=>{
    
    try{

        const response = await axios.get('http://localhost:8000/api/v1/games/all-games');
    
        setGames(response.data)

      
    
       }
       
       catch(error){
        console.error(error)
       }
    
    
      

}  





fetchGames()  

   
  },[])






return <GameContext.Provider value={{ games , setGames }}>{children}</GameContext.Provider>    


}
