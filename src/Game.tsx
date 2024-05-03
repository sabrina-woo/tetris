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
    rotationCoordinates: number[][][]
    rotation: number
}

const greenRotation: number[][][] = [[[0, 0], [-1, 0], [0, -1], [1, -1]], [[0, 0], [0, 1], [-1, 0], [-1, -1], [-2, 0]], [[0, 0], [-1, 0], [0, -1], [1, -1]], [[0, 0], [0, 1], [-1, 0], [-1, -1], [-2, 0]]]
const redRotation: number[][][] = [[[0, 0], [-1,  0], [0, -1], [1, -1]], [[0, 0], [0, 1], [-1, 0], [-1, -1]], [[0, 0], [-1,  0], [0, -1], [1, -1]], [[0, 0], [0, 1], [-1, 0], [-1, -1]]]
const purpleRotation: number[][][] = [[[0, 0], [-1, 0], [1, 0], [0, 1]], [[0, 0], [0, -1], [0, 1], [1, 0]], [[0, 0], [-1, 0], [1, 0], [0, -1]], [[0, 0], [0, 1], [0, -1], [-1, 0]]]
const darkBlueRotation: number[][][] = [[[0, 0], [1, 0], [-1, 0], [-1, 1]], [[0, 0], [0, 1], [0, -1], [1, 1]], [[0, 0], [-1, 0], [1, 0], [1, -1]], [[0, 0], [0, -1], [0, 1], [-1, -1]]]
const orangeRotation: number[][][] = [[[0, 0], [-1, 0], [1, 0], [1, 1]], [[0, 0], [0, 1], [0, -1], [1, -1]], [[0, 0], [1, 0], [-1, 0], [-1, -1]], [[0, 0], [0, -1], [0, 1], [-1, 1]]]
const lightBlueRotation: number[][][] = [[[0, 0], [-1, 0], [1, 0], [2, 0]], [[0, 0], [0, 1], [0, -1], [0, -2]], [[0, 0], [-1, 0], [1, 0], [2, 0]], [[0, 0], [0, 1], [0, -1], [0, -2]]]
const yellowRotation: number[][][] = [[[0, 0],[0, 1], [1, 0], [1, 1]], [[0, 0],[0, 1], [1, 0], [1, 1]], [[0, 0],[0, 1], [1, 0], [1, 1]], [[0, 0],[0, 1], [1, 0], [1, 1]]]
 
const green: Piece = {pieceCoordinates: [[1, 4], [1, 3], [0, 4], [0, 5]], colour: 'Green', rotationCoordinates: greenRotation, rotation: 0} 
const red: Piece = {pieceCoordinates: [[1, 4], [1, 5], [0, 4], [0, 3]], colour: 'Red', rotationCoordinates: redRotation, rotation: 0}
const purple: Piece = {pieceCoordinates: [[1, 4],[1, 3], [1, 5], [0, 4]], colour: 'Purple', rotationCoordinates: purpleRotation, rotation: 0}
const darkBlue: Piece = {pieceCoordinates: [[1, 4], [0, 3], [1, 5], [1, 3]], colour: 'DarkBlue', rotationCoordinates: darkBlueRotation, rotation: 0}  
const orange: Piece = {pieceCoordinates: [[1, 4], [0, 5], [1, 3], [1, 5]], colour: 'Orange', rotationCoordinates: orangeRotation, rotation: 0}
const lighBlue: Piece = {pieceCoordinates: [[1, 5], [1, 3], [1, 4], [1, 6]], colour: 'LighBlue', rotationCoordinates: lightBlueRotation, rotation: 0}
const yellow: Piece = {pieceCoordinates: [[0, 4], [0, 5], [1, 4], [1, 5]], colour: 'Yellow', rotationCoordinates: yellowRotation, rotation: 0}

    
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

function createPiece(): Piece {
    let piece: Piece = getRandomPiece();
    let newPiece: Piece = {
        pieceCoordinates: piece.pieceCoordinates,
        colour: piece.colour,
        rotationCoordinates: piece.rotationCoordinates,
        rotation: 0
    } 
    return newPiece             
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

//takes in a piece, and determines whether it will hit another piece if it moves down
function willHitPieceUnder(grid: Tile[][], piece: Piece): boolean {
    removeOldPiece(grid, piece)
    let hasPiece: boolean = false
    hasPiece = willHitPiece(grid, piece, 0, 1)
    movePiece(grid, piece, 0, 0)

    return hasPiece
}

//takes in a piece, and determines whether it will hit another piece if it moves 
function willHitPiece(grid: Tile[][], piece: Piece, index: number, shift: number): boolean {
    let pieceCoordinates : number[][] =  piece.pieceCoordinates
    let hasPiece: boolean = false
    for (let i = 0; i < 4; i++) {     
        let coordinates: number[] = pieceCoordinates[i]
        
        //update the new piece coordinate
        coordinates[index] = coordinates[index]+shift

        let yCoordinate: number = coordinates[0]
        let xCoordinate: number = coordinates[1]
        let tile: Tile = grid[yCoordinate][xCoordinate]          
 
        if (tile.hasPiece) {
            hasPiece = true
        }

        //change piece coordinate back
        coordinates[index] = coordinates[index]-shift
    }

    return hasPiece
}

//takes in a piece, and determines whether it will hit another piece if it moves left
function willHitPieceLeft(grid: Tile[][], piece: Piece): boolean {
    removeOldPiece(grid, piece)
    let hasPiece: boolean = false
    hasPiece = willHitPiece(grid, piece, 1, 1)
    movePiece(grid, piece, 0, 0)

    return hasPiece
}
  
//takes in a piece, and determines whether it will hit another piece if it moves right
function willHitPieceRight(grid: Tile[][], piece: Piece): boolean {
    removeOldPiece(grid, piece)
    let hasPiece: boolean = false
    hasPiece = willHitPiece(grid, piece, 1, -1)
    movePiece(grid, piece, 0, 0)

    return hasPiece
}

//determines whether it will be moved off screen if shifted left 
function onRightEdgeOfGrid(piece: Piece): boolean {

    let pieceCoordinates: number[][] = piece.pieceCoordinates

    for (let i = 0; i < 4; i ++) {
        let coordinates: number[] = pieceCoordinates[i]
        //checking if the x coordinate is on the rightmost tile of the grid
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
        //checking if the x coordinate is on the leftmost tile of the grid
        if (coordinates[1] === 9) {
            return true
        }
    }
    return false
}

// determines whether it will be moved off screen if shifted down 
function onBottomEdgeOfGrid(piece: Piece): boolean {
    let pieceCoordinates: number[][] = piece.pieceCoordinates
     
    for (let i = 0; i < 4; i ++) {      
        let coordinates: number[] = pieceCoordinates[i]
        //checking if the y coordinate is on the bottom row of the grid
        if (coordinates[0] === 19) {
            return true; 
        }
    }  
    return false  
}

//takes in a piece and board, and determines whether piece will be moved off screen if moved down 
//NEED TO ADD CHECKINH IF THERE IS PIECE BELOW 
function canMoveDown(grid: Tile[][], piece: Piece): boolean {
    if (!onBottomEdgeOfGrid(piece) && !willHitPieceUnder(grid, piece)) {
        return true
    } else {
        return false
    }
}              

function removeOldPiece(grid: Tile[][], piece: Piece): Tile[][] {
    let pieceCoordinates : number[][] =  piece.pieceCoordinates
    for (let i = 0; i < 4; i++) {
        let coordinates: number[] = pieceCoordinates[i]
        let yCoordinate: number = coordinates[0]
        let xCoordinate: number = coordinates[1]
        let tile: Tile = grid[yCoordinate][xCoordinate]         
 
        tile.hasPiece = false; 
        tile.colour = "None"
    }
    return grid
}

function movePiece(grid: Tile[][], piece: Piece, index: number, shiftNumber: number): Tile[][] {
    let pieceCoordinates : number[][] =  piece.pieceCoordinates
    for (let i = 0; i < 4; i++) {
        let coordinates: number[] = pieceCoordinates[i]

        //update the new piece coordinate
        coordinates[index] = coordinates[index]+shiftNumber

        let yCoordinate: number = coordinates[0]
        let xCoordinate: number = coordinates[1]
        let tile: Tile = grid[yCoordinate][xCoordinate]        

        tile.hasPiece = true;
        tile.colour = piece.colour
    }
    return grid
}

function rotatePiece(grid: Tile[][], piece: Piece): Tile[][] {
    let pieceCoordinates: number[][] =  piece.pieceCoordinates
    let addToRotate: number[] = piece.pieceCoordinates[0]
    let rotateCoordinates: number[][] = piece.rotationCoordinates[piece.rotation]

    for (let i = 0; i < 4; i++) {
        let coordinatesToChange: number[] = pieceCoordinates[i]
        let addRotationCoordinates: number[] = rotateCoordinates[i]

        let newY = addToRotate[0]+addRotationCoordinates[0]
        let newX = addToRotate[1]+addRotationCoordinates[1]

        //update the new piece coordinate
        coordinatesToChange[0] = newY
        coordinatesToChange[1] = newX

        let tile: Tile = grid[coordinatesToChange[0]][coordinatesToChange[1]]        

        tile.hasPiece = true;
        tile.colour = piece.colour
    }
    //update the piece.rotation to the next rotation
    if (piece.rotation === 3) {
        piece.rotation = 0
    } else {
    piece.rotation = piece.rotation + 1
    }
    return grid
}

function rotate(grid: Tile[][], piece: Piece): Tile[][] {
        grid = removeOldPiece(grid, piece)
        grid = rotatePiece(grid, piece)
    return grid;
}

function moveDown(grid: Tile[][], piece: Piece): Tile[][] {
    if (canMoveDown(grid, piece)) {
        grid = removeOldPiece(grid, piece)
        grid = movePiece(grid, piece, 0, 1)
    }  
    return grid;
}  

function moveRight(grid: Tile[][], piece: Piece): Tile[][] { 
    if (!onRightEdgeOfGrid(piece)&& !willHitPieceRight(grid, piece)) { 
        grid = removeOldPiece(grid, piece)
        grid = movePiece(grid, piece, 1, -1)
    } 
    return grid;
}     

function moveLeft(grid: Tile[][], piece: Piece): Tile[][] {
    if (!onLeftEdgeOfGrid(piece) && !willHitPieceLeft(grid, piece)) {  
        grid = removeOldPiece(grid, piece)
        grid = movePiece(grid, piece, 1, 1)
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

    function handleRotate() {
        const newBoard = rotate([...board], piece); 
        setBoard(newBoard);
        setPiece(piece);
    }

    function updateGame() {
        if (canMoveDown(board, piece)) { 
            handleMoveDown()
        } else {
            setPiece(createPiece())  
            const newBoard = deployPiece([...board], piece); 
            setBoard(newBoard);
        }
    }

    function getNewState() {  
        handleMoveDown()
    }

    useEffect(() => {

        const keyHandler = function(event: KeyboardEvent) {
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
                case "ArrowUp":
                    // Up pressed
                    handleRotate()
                break;
            }
        }
        
        document.addEventListener("keydown", keyHandler)

        const interval = setInterval(
            () => {
                updateGame() 
            }, 1000)

            return () => {
                // Since useEffect dependency array is empty, this will be called only on unmount
                clearInterval(interval);
                document.removeEventListener("keydown", keyHandler)
            };
        }, []);
    
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

  

