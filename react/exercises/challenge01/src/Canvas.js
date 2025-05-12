const Canvas = ({ color, hexColor }) => {
    return (
        <main style={{ backgroundColor: `${color}` }}>
            <>
                <p>{color ? color : "Empty Value"}</p>
                <p>{hexColor ? hexColor : null}</p>
            </>
        </main>
    );
};

export default Canvas;
