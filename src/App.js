import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Nosotros from './Components/Nosotros';
import Contacto from './Components/Contacto';

function App() {
  return (
    <Router>
      <div className='App'>
        <header>
        <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo de la Biblioteca" />
          <nav>
            <ul>
              <li>
                <Link to='/'>Inicio</Link>
              </li>
              <li>
                <Link to='/Nosotros'>Nosotros</Link>
              </li>
              <li>
                <Link to='/Contacto'>Contacto</Link>
              </li>
            </ul>
          </nav>
        </header>
        <br></br>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Nosotros' element={<Nosotros />} />
          <Route path='/Contacto' element={<Contacto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
