import React, { useContext } from 'react';
import { GameContext } from '../../Context/gameContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Games = () => {
  const { games, setGames} = useContext(GameContext);


  const deletegame = async(id)=>{

   

  try{
   
     await axios.delete(`http://localhost:8000/api/v1/games/delete-game/${id}` ,   {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include cookies
    })
  
    setGames(games.filter((game) => game._id !== id))
    
    toast.success("Game Removed Successfully");
  
  
  }

  catch(error){
    console.error(error);
  }
   

  }

  const handleDelete = (id)=>{
   
    deletegame(id);

  }





  return (
    <div className='float-left lg:float-none pl-[15px] p-[15px]  lg:pl-[293px] w-[100%] lg:p-[25px] bg-[#000] text-white'>
      <ToastContainer/>
      
      <h1 className="text-white text-[25px] mb-[10px] font-bold">Games</h1>

      <div>
        {games.length === 0 ? (
          <p className="text-center text-white">No games Found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#141212] border overflow-hidden">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Games</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Year</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game , index) => {
                 
                  return (
                    <tr key={game._id} className={`border-b hover:bg-[#181717] ${
                      index % 2 === 0 ? 'bg-[#222222]' : 'bg-[#0b0909]'
                    }` }>
                      <td className="py-3 px-4">{game.name}</td>
                      <td className="py-3 px-4">{game.price}</td>
                      <td className="py-3 px-4">{game.year}</td>
                      <td className="py-3 px-4 text-center">
                        <button className="bg-blue-500 w-full sm:w-auto mb-[10px] hover:bg-blue-700 text-white py-1 px-3 rounded mr-2">
                         <Link to={`/admin/update-game/${game._id}`} >Edit</Link> 
                        </button>
                        <button onClick={() => handleDelete(game._id)} className=" w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
