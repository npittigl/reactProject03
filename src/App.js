// Import styles
import './App.css';
// Import children components
import Header from './components/Header.js';
import DisplayResults from './components/DisplayResults';
import Footer from './components/Footer.js';

function App() {
  return (
    <div>
      <Header />
      <DisplayResults />
      <Footer />
    </div>
  );
}

export default App;
