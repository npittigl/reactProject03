// Import styles
import './App.css';
// Import children components
import Header from './components/Header.js';
import DisplayResults from './components/DisplayResults.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <>
      <Header />
      <DisplayResults />
      <Footer />
    </>
  );
}

export default App;
