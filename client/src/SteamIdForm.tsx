import { useState } from "react";

type Props = {
  onClick: (id: string) => void;
  
};

function SteamIdForm({onClick}: Props) {

    const [inputValue, setInputValue] = useState("");


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onClick(inputValue.trim());
}
    return (
        <form
        onSubmit={handleSubmit}
        action="">

        <input
        className="border p-2"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
  setInputValue(event.target.value)
}
        value={inputValue}
        placeholder="Введи свой стим ID"
       />
        <button
        className="bg-gray-300 border rounded p-2"
        type="submit"
        
        >Send</button>
        </form>
        
        
    
    );
}

export default SteamIdForm;