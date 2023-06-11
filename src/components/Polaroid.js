// import styles
import '../styles/Polaroid.css';

// Function to insert quote/author & images into HTML elements using props
function Polaroid({ altText, imageSource, authorName, quoteContent }) {
    return (
        <li className="polaroidCard flexContainer">
            <div className="imageContainer">
                <img src={imageSource} alt={altText} className="polaroidImage" />
                <div className="overlay fadeOutOpacity"></div>
            </div>
            <div className="polaroidText flexContainer">
                <h3>{quoteContent}</h3>
                <p><span className="authorHighlight">- {authorName} - </span></p>
            </div>
        </li>
    )
}

export default Polaroid;