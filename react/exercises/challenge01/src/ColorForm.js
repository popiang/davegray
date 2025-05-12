import colorNames from "colornames";

function ColorForm({ color, setColor, setHexColor }) {
    return (
        <form className="colorForm" onSubmit={(e) => e.preventDefault()}>
            <input
                autoFocus
                required
                type="text"
                placeholder="Add color name"
                value={color}
                onChange={(e) => {
                    setColor(e.target.value);
                    setHexColor(colorNames(e.target.value));
                }}
            />
        </form>
    );
}

export default ColorForm;
