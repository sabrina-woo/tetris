var rowArray: string[][] = [];

function GameBoard() {

    function makeRow(): string[] {
        let tileArray = [];
        for( let i = 0; i < 10; i++) {
            tileArray[i] = "⬚"; 
            
            if (i == 9) {
                tileArray[i] = "⬚ \n";
            }
        }
        return tileArray;
    }     
    
    function makeGrid(): string[][] {
            
        for(let i = 0; i < 20; i++) {
               
                rowArray[i] = makeRow();
        }
        return rowArray;
    }

    return ( 
        makeGrid()
     );

  }
  
  export default GameBoard;


