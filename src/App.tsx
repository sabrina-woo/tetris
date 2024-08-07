import React from 'react';
import './App.css';
import Menu from './Menu';
import Game from './Game';

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

        <Game/>

    </div>
  );
}

export default App;
