import { Pieces } from "../component/Pieces.js";
import { Variable } from "../config/Variable.js";
import { BlackPieces, WhitePieces } from "../index.js";
import { GetKeyPieces } from "../logic/Control.js";
import { Queen } from "../model/Queen.js";
import { TileController } from "./TileController.js";

export class PieceController {
    static HandleCapture(id){
        let piece = GetKeyPieces(id)
        let key = piece.elementId.split('-')[0].split('')

        if(key[0] === 'b') {
            if(key[1] === 'p') this.ManipulateElement('black-pawn')
            if(key[1] === 'b') this.ManipulateElement('black-bishop')
            if(key[1] === 'n') this.ManipulateElement('black-knight')
            if(key[1] === 'r') this.ManipulateElement('black-rook')
            if(key[1] === 'q') this.ManipulateElement('black-queen')
            this.DeleteElement(id)
        } else {
            if(key[1] === 'p') this.ManipulateElement('white-pawn')
            if(key[1] === 'b') this.ManipulateElement('white-bishop')
            if(key[1] === 'n') this.ManipulateElement('white-knight')
            if(key[1] === 'r') this.ManipulateElement('white-rook')
            if(key[1] === 'q') this.ManipulateElement('white-queen')
            this.DeleteElement(id)
        }
    }

    static ManipulateElement(idContainer) {
        document.getElementById(idContainer).style.display = 'flex'
        let idCount = idContainer + '-count'
        let countElement = document.getElementById(idCount)
        let text = countElement.textContent.split('')
        text[2] = parseInt(text[2]) + 1
        text = text.join('')
        countElement.textContent = text
    }

    static DeleteElement(id){
        document.getElementById(id).remove()
    }

    static PromoteToQueen(pawn, idDest){
        if(pawn.isWhite) {
            Variable.totalWhiteQueen ++
            
            // APPEND NEW QUEEN
            let id = `wq-${Variable.totalWhiteQueen}`
            const whiteQueen = Pieces('/assets/wq.png', id)
            document.getElementById(idDest).appendChild(whiteQueen)
            
            // ASSIGN TO WHITEPIECES OBJECT
            let key = `WhiteQueen_${Variable.totalWhiteQueen}`
            let newQueen = {[key] : new Queen(false, pawn.piecePosition, true, id)}
            Object.assign(WhitePieces, newQueen);

            // REMOVE PAWN ELEMENT
            console.log(pawn.elementId)
            document.getElementById(pawn.elementId).remove()

        } else {
            
            Variable.totalBlackQueen ++
            
            // APPEND NEW QUEEN
            let id = `bq-${Variable.totalBlackQueen}`
            const whiteQueen = Pieces('/assets/bq.png', id)
            document.getElementById(idDest).appendChild(whiteQueen)
            
            // ASSIGN TO WHITEPIECES OBJECT
            let key = `BlackQueen_${Variable.totalBlackQueen}`
            let newQueen = {[key] : new Queen(false, pawn.piecePosition, true, id)}
            Object.assign(BlackPieces, newQueen);

            // REMOVE PAWN ELEMENT
            console.log(pawn.elementId)
            document.getElementById(pawn.elementId).remove()
        }
    }

    static DiagonalValidation(xSrc,ySrc,xDest,yDest) {
        // checking the diagonal direction
        const deltaY = Math.abs(yDest - ySrc)
        const deltaX = Math.abs(xDest - xSrc) 

        if (deltaY !== deltaX) return false

        const yDirection = yDest > ySrc ? 1 : -1
        const xDirection = xDest > xSrc ? 1 : -1

        for (let i = 1; i < deltaY; i++) {
            const y = ySrc + i * yDirection
            const x = xSrc + i * xDirection

            // check whether there is a piece 
            let curr = y * 10 + x
            if (TileController.IsTileHaveChildren(curr)) return false
        }
        return true
    }

    static IsPathClear(ySrc, xSrc, yDest, xDest) {
        // Check if the movement is horizontal
        if (ySrc === yDest) {
          const xDirection = xDest > xSrc ? 1 : -1; // Determine the direction (left or right)
    
          // Check each square on the horizontal path for obstructions
          for (let x = xSrc + xDirection; x !== xDest; x += xDirection) {
            // Check if there's a piece at the square (ySrc, x)
            // Implement your logic to check if there's a piece at the current square (ySrc, x)
            if (TileController.IsTileHaveChildren(ySrc * 10 + x)) return false
            }
        }
        // Check if the movement is vertical
        else if (xSrc === xDest) {
          const yDirection = yDest > ySrc ? 1 : -1; // Determine the direction (up or down)
          
          // Check each square on the vertical path for obstructions
          for (let y = ySrc + yDirection; y !== yDest; y += yDirection) {
            // Check if there's a piece at the square (y, xSrc)
            // Implement your logic to check if there's a piece at the current square (y, xSrc)
            if (TileController.IsTileHaveChildren(y * 10 + xSrc)) return false
          }
        }
    
        // If no obstructions are found, the path is clear
        return true;
    }

}