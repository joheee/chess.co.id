import { Pieces } from "../component/Pieces.js";
import { Variable } from "../config/Variable.js";
import { BlackPieces, WhitePieces } from "../index.js";
import { GetKeyPieces } from "../logic/Control.js";
import { Queen } from "../model/Queen.js";

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
}