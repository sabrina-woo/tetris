import React, { Component } from 'react'
import Row from './Row';

export interface Tile {
    id: string, 
    hasPiece: boolean
}

const Board = () => {

    function makeRow(rowNumber: number): Tile[] {
        let tileArray = [];
        for(let i = 1; i <= 10; i++) {
            let tileID: string;
            let tile: Tile;
            let columnNumberString = i.toString();
            let rowNumberString = rowNumber.toString();

            tileID = columnNumberString.concat("x", rowNumberString, "  ");
            tile = {id: tileID, hasPiece: false}
            tileArray[i] = tile; 
        }
        return tileArray;
    }     

    var boardData: Tile[][] = [];
    boardData = makeGrid()
    
    function makeGrid(): Tile[][] {
            
        for(let i = 1; i <= 20; i++) {
            boardData[i] = makeRow(i);
        }
        return boardData;
    }

    let rowArray = boardData.map((row) => (
        // <li className = 'Row'>{boardData.indexOf(row)}<Row row={boardData[boardData.indexOf(row)]}/></li>
        <li className = 'Row'><Row row={boardData[boardData.indexOf(row)]}/></li>
    ))
  
    return (
    <div>
      {rowArray}
    </div>
  )

}

export default Board