// Import styles
import './App.css';
// Import children components
import Header from './components/Header.js';
import DisplayResults from './components/DisplayResults.js';
import Footer from './components/Footer.js';

// Renders components
function App() {
  return (
    <>
      <Header />
      <main className="flexContainer">
        <DisplayResults />
      </main>
      <Footer />
    </>
  );
}

export default App;
