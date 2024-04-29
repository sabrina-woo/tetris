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
const yellow: Piece = {pieceCoordinates: [[0, 4], [0, 5], [1, 4], [1, 5]], colour: 'Yellow'}
const orange: Piece = {pieceCoordinates: [[0, 5], [1, 3], [1, 4], [1, 5]], colour: 'Orange'}
const darkBlue: Piece = {pieceCoordinates: [[0, 3], [1, 3], [1, 4], [1, 5]], colour: 'DarkBlue'}  
const green: Piece = {pieceCoordinates: [[0, 4], [0, 5], [1, 3], [1, 4]], colour: 'Green'} 
const red: Piece = {pieceCoordinates: [[0, 3], [0, 4], [1, 4], [1, 5]], colour: 'Red'}
const purple: Piece = {pieceCoordinates: [[1, 3], [0, 4], [1, 4], [1, 5]], colour: 'Purple'}
    
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
    let board = []
    for(let i = 0; i < 20; i++) {
        board[i] = makeRow(i);
    }
    return board;
}

//returns a random number from 0-6
function getPieceNumber(): number {
    let randomNumber: number = Math.random();
    let randomInteger: number = Math.floor(randomNumber * 7);

    return randomInteger
}

function getRandomPiece(): Piece {
    let number = getPieceNumber()
    return pieces[number]
} 

//takes in a grid and piece and returns true if the piece can be deployed, false otehrwise
function canDeploy(grid: Tile[][], piece: Piece): boolean {
    for (let i = 0; i < 4; i++) {
        let coordinate: number[] = piece.pieceCoordinates[i];
        let tile: Tile = grid[coordinate[0]][coordinate[1]]
        if (tile.hasPiece) {
            return false
        }
    }
    return true;  
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
function willHitPieceDown(board: Tile[][], piece: Piece): boolean {

    return true
}

//takes in a piece, and determines whether it will hit another piece if it moves down or sideways
//
function willHitPieceLeft(board: Tile[][], piece: Piece): boolean {

    return true
}

//takes in a piece, and determines whether it will hit another piece if it moves down or sideways
//
function willHitPieceRight(board: Tile[][], piece: Piece): boolean {

    return true
}

//determines whether it will be moved off screen if shifted left 
function onRightEdgeOfGrid(piece: Piece): boolean {

    let pieceCoordinates: number[][] = piece.pieceCoordinates

    for (let i = 0; i < 4; i ++) {
        let coordinates: number[] = pieceCoordinates[i]
        //checking if the x coordinate is on the leftmost or rightmost tile of the grid
        if (coordinates[1] === 0) {
            return true
        }
    }
    return false
}

// determines whether it will be moved off screen if shifted right 
function onLeftEdgeOfGrid(piece: Piece): boolean {
    let pieceCoordinates: number[][] = piece.pieceCoordinates
    for (let i = 0; i < 4; i ++) {
        let coordinates: number[] = pieceCoordinates[i]
        //checking if the x coordinate is on the leftmost or rightmost tile of the grid
        if (coordinates[1] === 9) {
            return true
        }
    }
    return false
}

//takes in a piece and board, and determines whether piece will be moved off screen if moved down 
//NEED TO ADD CHECKINH IF THERE IS PIECE BELOW 
function canMoveDown(grid: Tile[][], piece: Piece): boolean {

    let pieceCoordinates: number[][] = piece.pieceCoordinates
     
    for (let i = 0; i < 4; i ++) {      
        let coordinates: number[] = pieceCoordinates[i]
        //checking if the y coordinate is on the bottom row of the grid
        if (coordinates[0] === 19) {
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

function removeOldPiece(grid: Tile[][], piece: Piece): Tile[][] {
    let pieceCoordinates : number[][] =  piece.pieceCoordinates
    for (let i = 0; i < 4; i++) {
        let coordinates: number[] = pieceCoordinates[i]
        let xCoordinate: number = coordinates[0]
        let yCoordinate: number = coordinates[1]
        let tile: Tile = grid[xCoordinate][yCoordinate]         
 
        tile.hasPiece = false; 
        tile.colour = "None"
    }
    return grid
}

function addNewPiece(grid: Tile[][], piece: Piece, index: number, shiftNumber: number): Tile[][] {
    let pieceCoordinates : number[][] =  piece.pieceCoordinates
    for (let i = 0; i < 4; i++) {
        let coordinates: number[] = pieceCoordinates[i]

        //update the new piece coordinate
        coordinates[index] = coordinates[index]+shiftNumber

        let xCoordinate: number = coordinates[0]
        let yCoordinate: number = coordinates[1]
        let tile: Tile = grid[xCoordinate][yCoordinate]        

        tile.hasPiece = true;
        tile.colour = piece.colour
    }
    return grid
}

function moveDown(grid: Tile[][], piece: Piece): Tile[][] {
    if (canMoveDown(grid, piece)) {
        grid = removeOldPiece(grid, piece)
        grid = addNewPiece(grid, piece, 0, 1)
    } 
    return grid;
}

function moveRight(grid: Tile[][], piece: Piece): Tile[][] {
    if (!onRightEdgeOfGrid(piece)) {
        grid = removeOldPiece(grid, piece)
        grid = addNewPiece(grid, piece, 1, -1)
    } 
    return grid;
}

function moveLeft(grid: Tile[][], piece: Piece): Tile[][] {
    if (!onLeftEdgeOfGrid(piece)) {
    // if (true) {
        grid = removeOldPiece(grid, piece)
        grid = addNewPiece(grid, piece, 1, 1)
    } 
    return grid;
}

function Game() {
    
    let [piece, setPiece] = useState(createPiece())
    let [board, setBoard] = useState(deployPiece(makeGrid(), piece))

    function handleMoveLeft() {
        const newBoard = moveRight([...board], piece); 
        setBoard(newBoard);
        setPiece(piece);
    }

    function handleMoveRight() {
        const newBoard = moveLeft([...board], piece); 
        setBoard(newBoard);
        setPiece(piece);
    }

    function handleMoveDown() {
        const newBoard = moveDown([...board], piece); 
        setBoard(newBoard);
        setPiece(piece);
    }

    function updateGame() {
        if (canMoveDown(board, piece)) {
            handleMoveDown()
        } else {
            setPiece(getRandomPiece())
        }
    }

    function getNewState() {  
        handleMoveDown()
    }

    useEffect(() => {
        const interval = setInterval(
            () => {
                getNewState()
            }, 1000) 
        }   
    )

    document.addEventListener("keydown", function(event) {
        event.preventDefault();
        const key = event.key;
        switch (key) { 
          case "ArrowLeft":
            // Left pressed
            handleMoveLeft()
            break;
          case "ArrowRight":
            // Right pressed
            handleMoveRight()
            break;
        case "ArrowDown":
            // Down pressed
            handleMoveDown()
            break;
        }
        //   case "ArrowUp":
        //     // Up pressed
        //     break;
      });

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

  

