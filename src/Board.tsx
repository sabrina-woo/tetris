import React, { Component } from 'react'
import Row from './Row';

const colours: string[] = ['None', 'LighBlue', 'Yellow', 'Orange', 'DarkBlue', 'Green', 'Red', 'Purple']

interface Tile {
    id: string, 
    hasPiece: boolean
    colour: string
}

const Board = ({board} : {board: Tile[][]}) => {

    let rowArray = board.map((row) => (
        // <li className = 'Row'>{boardData.indexOf(row)}<Row row={boardData[boardData.indexOf(row)]}/></li>
        <li className = 'Row'><Row row={board[board.indexOf(row)]}/></li>
    ))
  
    return (
    <div>
      {rowArray}
    </div>
  )

}

export default Board