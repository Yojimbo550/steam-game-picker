import { useState } from "react";

type Props = {
  onClick: (id: string) => void;
  event: React.ChangeEvent<HTMLInputElement>
};

function SteamIdForm({onClick}: Props) {

    const [inputValue, setinputValue] = useState("");
    function handleSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    onClick(inputValue.trim());
}
    return (
        <form
        onSubmit={handleSubmit}
        action="">

        <input
        className="border p-2"
        onChange={event => setinputValue(event.target.value)}
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