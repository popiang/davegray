import { useEffect, useState } from "react";
import Buttons from "./Buttons";
import Content from "./Content";

function App() {
    const BASE_API_URL = "https://jsonplaceholder.typicode.com/";
    const [results, setResults] = useState([]);
    const [dataType, setDataType] = useState("users");
    const [fetchError, setFetchError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
				setIsLoading(true);
                const response = await fetch(`${BASE_API_URL}${dataType}`);

                if (!response.ok) {
                    throw new Error("Error fetch data!!");
                }

                const data = await response.json(response);
                setResults(data);
            } catch (error) {
				console.log(error.message);
                setFetchError(error.message);
            } finally {
				setIsLoading(false);
			}
        };

        fetchData();
    }, [dataType]);

    const getData = (theBtn, type) => {
        document
            .querySelectorAll(".btn")
            .forEach((btn) => btn.classList.remove("active"));
        theBtn.classList.add("active");

        setDataType(type);
    };

    return (
        <div className="App">
            <Buttons getData={getData} />
			{isLoading && <p>Loading data...</p>}
            {!fetchError && !isLoading && (
                <Content results={results} />
            )}
            {fetchError && <p className="error">{fetchError}</p>}
        </div>
    );
}

export default App;
