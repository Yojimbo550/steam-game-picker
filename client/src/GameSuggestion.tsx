
type Props = {
  selectedGame: any;
};

function GameSuggestion({ selectedGame }: Props) {
    return ( 
        <div className="flex flex-col items-center gap-20 mt-6">
            <span>{selectedGame && <GameSuggestion selectedGame={selectedGame} />}</span>
            <div>
                <img
                className="w-100 h-auto rounded-lg shadow-lg"
                src={`https://cdn.akamai.steamstatic.com/steam/apps/${selectedGame.appid}/header.jpg`} alt="" />
            </div>
            

        </div>
     );
}

export default GameSuggestion;