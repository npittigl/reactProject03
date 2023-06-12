// import styles
import '../styles/Header.css';

// Header function
function Header() {
    return (
        <>
            <div className="rainbowContainer">
                    <div className="div div01"></div>
                    <div className="div div02"></div>
                    <div className="div div03"></div>
                    <div className="div div04"></div>
                    <div className="div div05"></div>
                    <div className="div div06"></div>
            </div>
            <header className="wrapper">
                <h1>Instaspiration</h1>
                <h2>Where <span className="highlightContainer"><span className="highlight">words & images </span></span> create <span className="gradient">instant inspiration</span></h2>
            </header>
        </>
    )
}

export default Header;