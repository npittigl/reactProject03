// import styles
import '../styles/Header.css';
import pic from '../styles/assets/polaroidCamera05.png';

function Header() {
    return (
        <header className="wrapper">
            <img src={pic} alt="polaroid camera" />
            <h1>Instaspiration</h1>
        </header>
    )
}

export default Header;