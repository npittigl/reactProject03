// import GetImage component
import GetImage from './GetImage.js';

// Function to insert quote/author & images into HTML elements using props
function Polaroid({ quotes }) {
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
                                    <GetImage />
                                    <div>
                                        <h3>{content}</h3>
                                        <p>{author}</p>
                                    </div>
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

export default Polaroid;