import React from 'react'

const colour: string[] = ['none', 'lighBlue', 'yellow', 'orange', 'darkBlue', 'green', 'red', 'purple']

interface Tile {
    id: string,
    hasPiece: boolean
    colour: string
}

const Tile = ({tile} : {tile: Tile}) => {
  return (
    <div style={{backgroundColor: 'red'}}>
      
    </div>
  )
}
export default Tile
