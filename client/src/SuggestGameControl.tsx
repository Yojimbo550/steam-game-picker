type Props = {
  onSuggestGame: () => void;
};


function SuggestGameControl({ onSuggestGame }: Props){
    return ( 
    
    <div>

        <button className="border p"
        onClick={onSuggestGame}
        >
            Во что поиграть сегодня?
        </button>
    </div>
     );
}

export default SuggestGameControl;