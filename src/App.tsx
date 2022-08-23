import React from 'react';
import {Route, Routes} from 'react-router';
import NavBar from './components/navigation/NavBar.component';

function App() {

  return (
      <Routes>
          <Route path='/' element={<NavBar />}>
              <Route index element={<><h1>Homi</h1></>} />
          </Route>
      </Routes>
  );
}

export default App;
