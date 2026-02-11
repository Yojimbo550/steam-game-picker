
type Props = {
  games: any[];
};

function GamesList({ games }: Props) {
    return (  
        <ul>
            {/* {games.map((game) => (
                 <li
                key={game.appid}
                >{game.name} + {game.playtime_forever}</li>
            )
                
            )} */}
        </ul>
    );
}

export default GamesList;