import { Variable } from "../config/Variable.js"
import { TileController } from "../controller/TileController.js"
import { Tile } from "../model/Tile.js"

export function IntializeBoardColor() {
    let Tiles = []
    for(let i=1;i<=8;i++) {
        let row = []
        for(let j=1;j<=8;j++){
            let tile = new Tile(`${i}${j}`)
            tile.DefaultBackground()
            TileController.TileEventListener(tile.tilePosition)
            row.push(tile)
        }
        Tiles.push(row)
    }
    return Tiles
}