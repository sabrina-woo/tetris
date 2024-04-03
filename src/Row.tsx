import React from 'react'
import Tile from './Tile'



const Row = ({row}: {row: Tile[]}) => {

  let tiles = row.map((tile) => (
    <li className = {row[row.indexOf(tile)].colour}> <Tile tile={row[row.indexOf(tile)]}/> </li>
  ))

  return (
    <div>
      {tiles}
    </div>
  )
}

export default Row

