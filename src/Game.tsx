import React, { useEffect, useState } from 'react';

interface Tile {
    xCoordinate: number
    yCoordinate: number
    hasPiece: boolean
    colour: string
}

interface Piece {
    pieceCoordinates: number[][]
    colour: string
}

const lighBlue: Piece = {pieceCoordinates: [[0, 4], [0, 5], [0, 6], [0, 3]], colour: 'LighBlue'}
const yellow: Piece = {pieceCoordinates: [[1, 4], [1, 5], [0, 4], [0, 5]], colour: 'Yellow'}
const orange: Piece = {pieceCoordinates: [[1, 4], [1, 5], [1, 3], [0, 5]], colour: 'Orange'}
const darkBlue: Piece = {pieceCoordinates: [[1, 4], [1, 5], [1, 3], [0, 3]], colour: 'DarkBlue'}  
const green: Piece = {pieceCoordinates: [[1, 3], [1, 4], [0, 4], [0, 5]], colour: 'Green'} 
const red: Piece = {pieceCoordinates: [[1, 4], [1, 5], [0, 3], [0, 4]], colour: 'Red'}
const purple: Piece = {pieceCoordinates: [[1, 4], [1, 5], [1, 3], [0, 4]], colour: 'Purple'}
    
const pieces: Piece[] = [lighBlue, yellow, orange, darkBlue, green, red, purple];
  

//returns an array of 10 tiles 
function makeRow(rowNumber: number): Tile[] {
    let tileArray = [];
    for(let i = 0; i < 10; i++) {
  
        let tile: Tile;
        let columnNumber = i;

        tile = {xCoordinate: columnNumber, yCoordinate: rowNumber, hasPiece: false, colour: "None"}
        tileArray[i] = tile; 
    }
    return tileArray;
}
    
//returns an array of 20 rows
function makeGrid(): Tile[][] {
    var board = []
    for(let i = 0; i < 20; i++) {
        board[i] = makeRow(i);
    }
    return board;
}

//returns a random number from 0-6
function getPieceNumber(): number {
    const randomNumber: number = Math.random();
    const randomInteger: number = Math.floor(randomNumber * 7);

    return randomInteger
}

function getRandomPiece(): Piece {
    var number = getPieceNumber()
    return pieces[number]
} 

//takes in a board then returns the board with a random piece deployed at the top
function deployPiece(grid: Tile[][], piece: Piece): Tile[][] {

    for (let i = 0; i < 4; i++) {
        let coordinate: number[] = piece.pieceCoordinates[i];
        let tile: Tile = grid[coordinate[0]][coordinate[1]]
        tile.hasPiece = true;
        tile.colour = piece.colour
    }
    return grid;  
}

//takes in a piece, and determines whether it will hit another piece if it moves down or sideways
//
function willHitPiece(board: Tile[][], piece: Piece): boolean {

    return true
}

//takes in a piece, and determines whether it can be moved off screen if shifted left or right 
function onEdgeOfGrid(piece: Piece): boolean {

    let pieceCoordinates = piece.pieceCoordinates

    for (let i = 0; i < 4; i ++) {
        let coordinates: number[] = pieceCoordinates[i]
        //checking if the x coordinate is on the leftmost or rightmost tile of the grid
        if (coordinates[0] === 9 || coordinates[0] === 0) {
            return true
        }
    }
    return false
}

//takes in a piece and board, and determines whether it will be moved off screen if moved down 
function canMoveDown(grid: Tile[][], piece: Piece): boolean {

    let pieceCoordinates: number[][] = piece.pieceCoordinates
     
    for (let i = 0; i < 4; i ++) {      
        let coordinates: number[] = pieceCoordinates[i]
        //checking if the y coordinate is on the bottom row of the grid
        if (coordinates[0] === 19) {
            //need to add checking if there is piece below
            return false; 
        }
    }  
    return true  
}              
      
function createPiece(): Piece {
    let piece: Piece = getRandomPiece();
    let newPiece: Piece = {
        pieceCoordinates: piece.pieceCoordinates,
        colour: piece.colour
    } 
    return newPiece             
}    

function moveDown(grid: Tile[][], piece: Piece): Tile[][] {
    // if (canMoveDown(grid, piece)) {
    if (canMoveDown(grid, piece)) {
        let pieceCoordinates : number[][] =  piece.pieceCoordinates
        for (let i = 0; i < 4; i++) {
            let coordinates: number[] = pieceCoordinates[i]
            let xCoordinate: number = coordinates[0]
            let yCoordinate: number = coordinates[1]
            let tile: Tile = grid[xCoordinate][yCoordinate]         
 
            tile.hasPiece = false; 
            tile.colour = "None"

            tile = grid[xCoordinate+1][yCoordinate]
            tile.hasPiece = true;
            tile.colour = piece.colour   

            //update the new piece coordinate
            coordinates[0] = xCoordinate+1

        }
    } 
    return grid;
}


function Game() {
    
    let [piece, setPiece] = useState(createPiece())
    let [hasPiece, setHasPiece] = useState(false) 
    let [board, setBoard] = useState(deployPiece(makeGrid(), piece))

    function getNewState() {  
        const newBoard = moveDown([...board], piece); 
        setBoard(newBoard);
        setPiece(piece);
    }

    useEffect(() => {
        const interval = setInterval(
            () => {
                getNewState()
            }, 1000) 
        }   
    )      
      
    return ( 
        <div className='Board'>
            {board.map((row) => (
                <li className = 'Row'>
                    {row.map((tile) => (
                        <li className = {row[row.indexOf(tile)].colour}></li>
                    ))}
                </li>
                ))}
        </div>
    );
}
   
  export default Game;

    