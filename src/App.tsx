import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './Menu';
import Board from './Board';

function App() {
  //curly brackets: react knows we wnat to output our dynamic value 
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
      
      <div className="App-Board">
      <Board/>
      </div>
      
    </div>
  );
}

export default App;
