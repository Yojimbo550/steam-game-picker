import React, { useCallback, useEffect, useState } from 'react'
import SteamIdForm from './SteamIdForm';
import GamesList from './GamesList';
import GameSuggestion from './GameSuggestion';
import SuggestGameControl from './SuggestGameControl';
import Loader from './Loader';

function App()  {

const [steamId , setSteamId] = useState("")
const [games, setGames] = useState([]);
const [loading, setloading] = useState();
const [error, setError] = useState();
const [selectedGame, setSelectedGame] = useState("");


const handleSuggestGame = useCallback(() => {
  const gameIndex = Math.floor(Math.random() * games.length)
  setSelectedGame(games[gameIndex]);
  

},[games]
) 

  


useEffect(() => {
  
  if (!steamId) return;

  const fetchGames = async () => {
    try {
      setloading(true);
      setError("");
      const response = await fetch(
        `https://steam-game-picker-cytuej97z-alexandrs-projects-99e14c99.vercel.app/games/${steamId}`
        );
        // https://steam-game-picker-cytuej97z-alexandrs-projects-99e14c99.vercel.app/
        // `https://steam-proxy.onrender.com/games/${steamId}`
    
    const data = await response.json();
    const gamesArray = data.response.games;
    setGames(gamesArray)
    console.log(gamesArray);
    
  }
  catch (err) {
    setError("Ошибка загрузки игр")
  }
  finally {
    setloading(false)
  }
};
  fetchGames();
},
[steamId]);

function setId(id) {
  
setSteamId(id)
}
  return (
    <div className='flex flex-col mt-6 items-center gap-20' >
      <label htmlFor="">Введи свой стим айди, чтобы не думать во что поиграть сегодня</label>
      <SteamIdForm
      steamId={steamId}
      onClick={setId}
      />
      
      {loading ? <Loader/> : <GameSuggestion selectedGame={selectedGame}/>}
      <GamesList
      games={games}
      />
      <SuggestGameControl
      games={games}
      onSuggestGame={handleSuggestGame}
      />
      {/* <GameSuggestion
      selectedGame={selectedGame}
      
      /> */}
      {/* {steamId} */}
      
    </div>
  )
}

export default App