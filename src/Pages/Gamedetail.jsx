import React, { useContext } from 'react';
import { GameContext } from '../Context/gameContext';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faStar, faMoneyBillWave  } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Gamedetail = () => {
  const { games = [] } = useContext(GameContext) || {};
  const { id } = useParams();

  // Find the selected game by ID
  const game = games.find((r) => r._id === id);

  if (!game) return <p className="text-white text-center">No Games Found</p>;

  return (
    <div className="mx-auto max-w-[1200px] mt-[50px] ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Image Section */}
        <div className="px-[10px]">
          <img className="w-full rounded-md" src={game.image} alt={game.name} />
        </div>

        {/* Description Section - Takes Remaining Space */}
        <div className="px-[10px] text-white lg:col-span-2">
          <h1 className="font-extrabold text-[30px] mb-[10px]">{game.name}</h1>
          <p className="text-lg leading-relaxed">{game.detail}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-5  gap-2 mt-[20px]">
            <p className="font-bold mb-[10px] md:mb-0">
              <strong className='block mb-[10px]'>Release Year</strong>
              <FontAwesomeIcon icon={faCalendarDays} className="mr-[10px]" /> {game.year}
            </p>
            <p className="font-bold mb-[10px] md:mb-0">
            <strong className='block mb-[10px]'>Rating</strong>
              <FontAwesomeIcon icon={faStar} className="mr-[10px]" /> {game.review || "No Rating"}
            </p>
          
            
              <p className='font-bold mb-[10px] md:mb-0'>
              <strong className='block mb-[10px]'>Price</strong>
              <img className='w-[25px] float-left mr-[10px]' src="/flag.png" alt=''/>
                <span>{game.price} RS</span> 
              </p>
              
              <p className='font-bold mb-[10px] md:mb-0'>
              <strong className='block mb-[10px]'>Avaliable On</strong>
              <span className="bg-gray-800 text-white px-2 py-1 rounded">
  {Array.isArray(game.platform)
    ? game.platform.filter(Boolean).join(" | ")
    : game.platform}
</span>
              </p>

              <p className="font-bold">

              <strong className='block mb-[10px]'>Contact</strong>
  <a 
    href="https://wa.me/923203440512" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-green-500 hover:text-green-600"
  >
    <FontAwesomeIcon icon={faWhatsapp} className="mr-[5px] text-[30px]" /> 
  </a>
</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamedetail;
