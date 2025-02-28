import React, { useContext, useState } from "react";
import { GameContext } from "../../Context/gameContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addgames = () => {
  const [input, setInput] = useState({
    name: "",
    image: "",
    year: "",
    detail: "",
    price: "",
    review: "",
    platform: [], 
  });

  const { setGames } = useContext(GameContext);
  const navigate = useNavigate(); // For navigation after successful game addition

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the field based on input name
    }));
  };

  // Handle platform checkbox changes
  const handlePlatformChange = (e) => {
    const { value, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      platform: checked
        ? [...prev.platform, value] // Add platform if checked
        : prev.platform.filter((p) => p !== value), // Remove platform if unchecked
    }));
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();

    if (isNaN(input.price) || input.price.trim() === "") {
      toast.error("Please enter a valid price.");
      return;
    }

    if (input.platform.length === 0) {
      toast.error("Please select at least one platform.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/games/add-game",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const newGame = response.data;
      setGames((prevGames) => [...prevGames, newGame]);

      toast.success("Game added successfully!");
      setTimeout(() => {
        navigate("/admin/games");
      }, 1500);
    } catch (error) {
      toast.error("Error adding game.");
    }
  };

  return (
    <div className="float-left  lg:float-none pl-[15px] p-[15px] lg:pl-[293px] w-[100%] lg:p-[25px] bg-[#000] text-white">
      <ToastContainer />
      <h1 className="text-white text-[25px] mb-[10px] font-bold text-center">Add Games</h1>

      <div className="max-w-[500px] m-auto">
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Image"
          name="image"
          onChange={handleChange}
        />
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Year"
          name="year"
          onChange={handleChange}
        />
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Price"
          name="price"
          onChange={handleChange}
        />
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Review"
          name="review"
          onChange={handleChange}
        />
        <textarea
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white h[100px]"
          placeholder="Details"
          name="detail"
          onChange={handleChange}
        ></textarea>

        {/* Platform Selection */}
        <div className="text-white mb-[10px]">
          <label className="mr-3">
            <input
              type="checkbox"
              value="PS4"
              checked={input.platform.includes("PS4")}
              onChange={handlePlatformChange}
            />{" "}
            Available on PS4
          </label>
          <label>
            <input
              type="checkbox"
              value="PS5"
              checked={input.platform.includes("PS5")}
              onChange={handlePlatformChange}
            />{" "}
            Available on PS5
          </label>
        </div>

        <button
          onClick={handleClick}
          className="bg-[#000] border rounded p-[5px] w-full mb-[10px]"
        >
          Add game
        </button>
      </div>
    </div>
  );
};

export default Addgames;
