import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../Context/gameContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Editgames = () => {
  const { id } = useParams();
  const { games, setGames } = useContext(GameContext);
  const [input, setInput] = useState({
    name: "",
    image: "",
    year: "",
    price: "",
    detail: "",
    platform: [],
    review:'',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const gameToEdit = games.find((game) => game._id === id);
    if (gameToEdit) {
      setInput({
        name: gameToEdit.name || "",
        image: gameToEdit.image || "",
        year: gameToEdit.year || "",
        price: gameToEdit.price || "",
        detail: gameToEdit.detail || "",
        platform: gameToEdit.platform || [],
        review: gameToEdit.review || "" 
      });
    }
  }, [id, games]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlatformChange = (e) => {
    const { value, checked } = e.target;
    setInput((prev) => {
      const newPlatforms = checked
        ? [...prev.platform, value]
        : prev.platform.filter((platform) => platform !== value);
      return { ...prev, platform: newPlatforms };
    });
  };

  const handleClick = async () => {
    try {

      const API_URL = process.env.REACT_APP_API_URL;

      const response = await axios.put(
        `${API_URL}/api/v1/games/update-game/${id}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const updatedGame = response.data;
      setGames((prevGames) =>
        prevGames.map((game) => (game._id === id ? updatedGame : game))
      );

      toast.success("Game updated successfully!");
      setTimeout(() => {
        navigate("/admin/games");
      }, 1500);
    } catch (error) {
      toast.error("Failed to update game. Please try again.");
    }
  };

  return (
    <div className='float-left  lg:float-none pl-[15px] p-[15px]  lg:pl-[293px] w-[100%] lg:p-[25px] bg-[#000] text-white'>
      <ToastContainer />
      <h1 className="text-white text-[25px] mb-[10px] font-bold text-center">
        Update Game
      </h1>

      <div className="max-w-[500px] m-auto">
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Name"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Image"
          name="image"
          value={input.image}
          onChange={handleChange}
        />
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Year"
          name="year"
          value={input.year}
          onChange={handleChange}
        />
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Price"
          name="price"
          value={input.price}
          onChange={handleChange}
        />
        
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Review"
          name="review"
          value={input.review}
          onChange={handleChange}
        />


        <textarea
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white h[100px]"
          placeholder="Details"
          name="detail"
          value={input.detail}
          onChange={handleChange}
        ></textarea>

        {/* Platform Selection */}
        <div className="mb-3">
          <label className="block text-white mb-2">Available On:</label>
          <label className="inline-flex items-center mr-3">
            <input
              type="checkbox"
              value="PS4"
              checked={input.platform.includes("PS4")}
              onChange={handlePlatformChange}
              className="mr-2"
            />
            PS4
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="PS5"
              checked={input.platform.includes("PS5")}
              onChange={handlePlatformChange}
              className="mr-2"
            />
            PS5
          </label>
        </div>

        <button
          onClick={handleClick}
          className="bg-[#000] border rounded p-[5px] w-full mb-[10px]"
        >
          Update Game
        </button>
      </div>
    </div>
  );
};

export default Editgames;
