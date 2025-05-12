import { useState } from "react";
import Canvas from "./Canvas";
import ColorForm from "./ColorForm";

function App() {
    const [color, setColor] = useState("");
    const [hexColor, setHexColor] = useState("");

    return (
        <div className="App">
            <Canvas color={color} hexColor={hexColor} />
            <ColorForm
                color={color}
                setColor={setColor}
                setHexColor={setHexColor}
            />
        </div>
    );
}

export default App;
