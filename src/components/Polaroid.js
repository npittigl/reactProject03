// import styles
import '../styles/Polaroid.css';

// Function to insert quote/author & images into HTML elements using props
function Polaroid({ altText, imageSource, authorName, quoteContent }) {
    return (
        <>
            <li className="polaroidCard flexContainer">
                <div className="imageContainer">
                    <img src={imageSource} alt={altText} className="polaroidImage" />
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