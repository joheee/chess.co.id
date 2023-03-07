import { CreateElement } from "../config/Element.js";
import { Pieces } from "./Pieces.js";

export function Board() {
    let boardTiles = []
    for(let i=8;i>=1;i--) {
        let boardRow = []
        for(let j=1;j<=8;j++){
            const boardTile = CreateElement('div')
            boardTile.setAttribute('id', `${i}${j}`)
            boardTile.setAttribute('class', `${
                i % 2 === 0 ?
                j % 2 === 0 ? 'first-tile' : 'second-tile' :
                j % 2 !== 0 ? 'first-tile' : 'second-tile'
            } tile-height-width`)

            // INSERT PAWN
            if(i === 7) {
                const blackPawn = Pieces('/assets/bp.png', `bp-${j}`)
                boardTile.appendChild(blackPawn)
            } else if(i === 2) {
                const whitePawn = Pieces('/assets/wp.png', `wp-${j}`)
                boardTile.appendChild(whitePawn)
            }

            // INSERT KNIGHT
            if(j === 5) {
                if(i === 8) {
                    const blackKing = Pieces('/assets/bk.png' ,'bk')
                    boardTile.appendChild(blackKing)
                }
                if(i === 1) {
                    const whiteKing = Pieces('/assets/wk.png', 'wk')
                    boardTile.appendChild(whiteKing)
                }
            }

            // INSERT QUEEN
            if(j === 4) {
                if(i === 8) {
                    const blackQueen = Pieces('/assets/bq.png', 'bq')
                    boardTile.appendChild(blackQueen)
                }
                if(i === 1) {
                    const whiteQueen = Pieces('/assets/wq.png', 'wq')
                    boardTile.appendChild(whiteQueen)
                }
            }

            // INSERT BISHOP
            if(j === 3 || j === 6) {
                if(i === 8) {
                    const blackBishop = Pieces('/assets/bb.png', `bb-${
                        j === 3 ? 1 : 2
                    }`)
                    boardTile.appendChild(blackBishop)
                }
                if(i === 1) {
                    const whiteBishop = Pieces('/assets/wb.png', `wb-${
                        j === 3 ? 1 : 2
                    }`)
                    boardTile.appendChild(whiteBishop)
                }
            }

            // INSERT BISHOP
            if(j === 2 || j === 7) {
                if(i === 8) {
                    const blackKnight = Pieces('/assets/bn.png', `bn-${
                        j === 2 ? 1: 2
                    }`)
                    boardTile.appendChild(blackKnight)
                }
                if(i === 1) {
                    const whiteKnight = Pieces('/assets/wn.png', `wn-${
                        j === 2 ? 1: 2
                    }`)
                    boardTile.appendChild(whiteKnight)
                }
            }

            // INSERT ROOK
            if(j === 1 || j === 8) {
                if(i === 8) {
                    const blackRook = Pieces('/assets/br.png', `br-${
                        j === 1 ? 1:2
                    }`)
                    boardTile.appendChild(blackRook)
                }
                if(i === 1) {
                    const whiteRook = Pieces('/assets/wr.png', `wr-${
                        j === 1 ? 1:2
                    }`)
                    boardTile.appendChild(whiteRook)
                }
            }
            boardRow.push(boardTile)
        }
        boardTiles.push(boardRow)
    }
    return boardTiles   
}