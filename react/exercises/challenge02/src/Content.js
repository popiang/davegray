const Content = ({ results }) => {
    return (
        <table>
            <tbody>
                {results &&
                    results.map((result) => (
                        <tr className="result" key={result.id}>
                            {Object.entries(result).map(([key, value]) => (
                                <td key={key}>{JSON.stringify(value)}</td>
                            ))}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default Content;
