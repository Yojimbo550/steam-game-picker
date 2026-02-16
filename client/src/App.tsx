import  { useCallback, useEffect, useState } from 'react'
import SteamIdForm from './SteamIdForm';
import GamesList from './GamesList';
import GameSuggestion from './GameSuggestion';
import SuggestGameControl from './SuggestGameControl';
import Loader from './Loader';

function App()  {

const [steamId, setSteamId] = useState<string>("");
const [games, setGames] = useState<any[]>([]);
const [selectedGame, setSelectedGame] = useState<any | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string>("");


const handleSuggestGame = useCallback(() => {
  const gameIndex = Math.floor(Math.random() * games.length)
  setSelectedGame(games[gameIndex]);
  

},[games]
) 

  


useEffect(() => {
  
  if (!steamId) return;

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://steam-game-picker.onrender.com/games/${steamId}`
        );
        
    
    const data = await response.json();
    const gamesArray = data.response.games;
    setGames(gamesArray)
    console.log(gamesArray);
    
  }
  catch (err) {
    setError("Ошибка загрузки игр")
  }
  finally {
    setLoading(false)
  }
};
  fetchGames();
},
[steamId]);

function setId(id: string) {
  setSteamId(id);
}
  return (
    <div className='flex flex-col mt-6 items-center gap-20' >
      <label htmlFor="">Введи свой SteamID для подгрузки списка игр, аккаунт должен быть публичным</label>
      <SteamIdForm
      // steamId={steamId}
      onClick={setId}
      />
      
      
      <GamesList
      
      />
      {!loading && games.length > 0 && (
  <SuggestGameControl onSuggestGame={handleSuggestGame} />
)}
       {loading && <Loader />}

{!loading &&  selectedGame && (
  <GameSuggestion selectedGame={selectedGame} />
)}
      {/* {steamId} */}
      {loading && <div>Loading...</div>}
    { error && <div>{error}</div>} 
    </div>
  )
}

export default App