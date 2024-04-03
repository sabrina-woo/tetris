import React from 'react';
import './App.css';
import Menu from './Menu';
import Game from './Game';
import Tile from './Tile';

function App() {
  let title: string = "Tetris"

  return (
    <div className="App">
    <div className="App-Title">
      <h1>
        <center> 
          {title}  
          </center>
      </h1>
    </div>


      <div className="App-Menu">
        <Menu/>
      </div>
      
      {/* <div className="App-Board">
      <Board/>
      </div> */}

      <div className="App-Game">
        <Game/>
      </div>
    </div>
  );
}

export default App;
