// Function to insert quote/author into HTML elements using props
function GetQuote({ quotes }) {
    return (
        <>
            {quotes.length === 0 ? (
                <h2>No quotes found!</h2>
            ): (
            <>
                <h2>Quotes!</h2>
                <ul>
                    { quotes.map(({_id, content, author }) => {
                            return (
                                <li key={_id}>
                                    <h3>{content}</h3>
                                    <p>{author}</p>
                                </li>
                            );
                        })
                    }
                </ul>
            </>
            )}
        </>
    )
}

export default GetQuote;