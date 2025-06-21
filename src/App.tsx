import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import BracketTree from './components/BracketTree'; // ajuste caminho se necessário

function App() {
  return (
    <div>
      <h1>Torneio</h1>
      <BracketTree />
    </div>
  );
}

export default App;
