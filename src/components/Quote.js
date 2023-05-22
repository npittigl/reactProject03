// Function to insert quote/author into HTML elements using props
function Quote({ quote, author }) {
    return (
        <li>
            <h3>{quote}</h3>
            <p>{author}</p>
        </li>
    )
}

export default Quote;