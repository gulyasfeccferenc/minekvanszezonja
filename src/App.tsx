import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import About from './pages/About';
import Main from './pages/Main';

function App() {
  return (
    <div>
      <header>
        <Link to='/about' >About</Link>
        <Link to='/plants' >Plants</Link>
        <Link to='/' >Dashboard</Link>
      </header>
      <main>
      <Route path="/about">
        <About></About>
      </Route>
      
      <Route path="/">
        <Main />
      </Route>
      </main>
      
    </div>
  );
}

export default App;
