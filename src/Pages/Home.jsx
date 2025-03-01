import React, { useContext } from 'react'
import Banner from '../Components/Banner'
import { Link } from 'react-router-dom'
import { GameContext } from '../Context/gameContext'




const Home = () => {
 

const {games} = useContext(GameContext);  

 
 
 
  return (
    <div>
      <Banner  heading={'Unleash the Magic of Gaming – Your Gateway to Games, Anytime, Anywhere!'} image={'/banner.jpg'} description={'Welcome to GameHub – your hub for digital gaming! Enjoy instant access to a vast collection of digital games — no discs, no delays. Buy, download, and start playing in seconds!'}/>
      
      

<div className='mx-auto max-w-[1200px] mt-[50px] px-[15px]'>

<div className='grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-5 mt-[50px]'>
{games.length === 0 ? <p className='text-center text-white'>No Games Found</p> : games.map((game, index) => (
  <div key={index}>
    <Link to={`/games/${game._id}`} ><img className='w-full lg:h-[330px] object-cover rounded-md ' src={game.image} alt={game.image}/></Link>
  </div>
))}
</div>


</div>

    </div>
  )
}

export default Home
