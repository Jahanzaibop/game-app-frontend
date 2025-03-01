import React, { useContext, useState,  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GameContext } from '../Context/gameContext';


const Header = () => {
  const { games } = useContext(GameContext);

  const [search, setSearch] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  

  
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query.trim() === '') {
      setFilteredGames([]);
    } else {
      const filtered = games.filter((game) => game.name.toLowerCase().includes(query));
      setFilteredGames(filtered);
    }
  };

  

  

  const handleSelectgame = (gameId) => {
    setSearch('');
    setFilteredGames([]);
    navigate(`/games/${gameId}`);
  };

  

  return (
    <div className="sticky flex top-0 bg-black p-[15px] z-[999]">
      <div className="container mx-auto">
        <div className="lg:grid lg:grid-cols-3">
          <h1 className="float-left lg:float-none font-mono text-2xl font-extrabold text-white">
            <Link to="/">GameHub</Link>
          </h1>
          
         
          <input
            onChange={handleSearch}
            value={search}
            className="hidden lg:block rounded-md p-[5px] bg-transparent border text-white placeholder:text-white"
            type="text"
            placeholder="Search Games"
          />

          {/* Search Dropdown */}
          {filteredGames.length > 0 && (
            <ul
              
              className="absolute top-[55px] left-0 right-0 m-auto max-w-[426px] w-full bg-[#191919] text-white rounded-md shadow-lg max-h-[200px] overflow-y-auto"
            >
              {filteredGames.map((game) => (
                <li
                  key={game._id}
                  onClick={() => handleSelectgame(game._id)}
                  className="p-[10px] cursor-pointer grid grid-cols-10 items-center gap-2 border-b last:border-b-0"
                >
                  <div className="col-span-2">
                    <img src={game.image} alt="" className="w-full h-auto rounded-md" />
                  </div>
                  <div className="col-span-5 font-medium">
                    <p>{game.name}</p>
                    <p className="mt-[10px]">{game.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

         
        </div>
      </div>
    </div>
  );
};

export default Header;
