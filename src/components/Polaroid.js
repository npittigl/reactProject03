
// Function to insert quote/author & images into HTML elements using props
function Polaroid({ altText, imageSource, authorName, quoteContent }) {
    return (
        <>
            <li>
                <div className="polaroidImage">
                    <img src={imageSource} alt={altText} />
                </div>
                <div className="polaroidText">
                    <h3>{quoteContent}</h3>
                    <p>{authorName}</p>
                </div>
            </li>
        </>
    )
}

export default Polaroid;

// Sunday:
    // 1. Start styling App

// Monday/Tuesday: 
    // 1. Finish Styling App
    // 2. Accessible
    // 3. Responsive