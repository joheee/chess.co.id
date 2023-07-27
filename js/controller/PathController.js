import { Tile } from "../model/Tile.js"

export class PathController {

    static GetPawnPathToKing(pawn, king) {
        let pawnArr = []

        pawnArr.push(parseInt(pawn.piecePosition))
        pawnArr.push(parseInt(king.piecePosition))
        // get the path to king

        return pawnArr
    }    

    static GetKnightToKing(knight, king) {
        let kingArr = []
        
        kingArr.push(parseInt(knight.piecePosition))
        kingArr.push(parseInt(king.piecePosition))

        return kingArr
    }

    static GetBishopPathToKing(bishop, king) {
        let bishopArr = []

        bishopArr.push(parseInt(bishop.piecePosition))
                        
        // get the path to king
        const [ySrc, xSrc] = Tile.GetXYTile(bishop.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(king.piecePosition)
        
        // get the diagonal path
        const deltaY = Math.abs(yDest - ySrc)
        const deltaX = Math.abs(xDest - xSrc) 
        
        const yDirection = yDest > ySrc ? 1 : -1
        const xDirection = xDest > xSrc ? 1 : -1

        for (let i = 1; i <= deltaY; i++) {
            const y = ySrc + i * yDirection
            const x = xSrc + i * xDirection

            // get all the path to king 
            let curr = y * 10 + x
            bishopArr.push(curr)
        }

        return bishopArr
    }

    static GetRookPathToKing(rook, king) {
        let rookArr = []

        rookArr.push(parseInt(rook.piecePosition))

        // get the path to king
        const [ySrc, xSrc] = Tile.GetXYTile(rook.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(king.piecePosition)

        // Check if the movement is horizontal
        if (ySrc === yDest) {
            const xDirection = xDest > xSrc ? 1 : -1; // Determine the direction (left or right)
      
            // Check each square on the horizontal path for obstructions
            for (let x = xSrc + xDirection; x !== xDest; x += xDirection) {
              // Check if there's a piece at the square (ySrc, x)
              // Implement your logic to check if there's a piece at the current square (ySrc, x)
              rookArr.push(ySrc * 10 + x)
            }
        }
        // Check if the movement is vertical
        else if (xSrc === xDest) {
            const yDirection = yDest > ySrc ? 1 : -1; // Determine the direction (up or down)
            
            // Check each square on the vertical path for obstructions
            for (let y = ySrc + yDirection; y !== yDest; y += yDirection) {
                // Check if there's a piece at the square (y, xSrc)
                // Implement your logic to check if there's a piece at the current square (y, xSrc)
                rookArr.push(y * 10 + xSrc)
            }
        }
        rookArr.push(parseInt(king.piecePosition))
        return rookArr
    }

    static GetQueenPathToKing(queen, king) {
        let queenArr = []
        
        queenArr.push(parseInt(queen.piecePosition))

        // get the path to king
        const [ySrc, xSrc] = Tile.GetXYTile(queen.piecePosition)
        const [yDest, xDest] = Tile.GetXYTile(king.piecePosition)
        
        // Check if the movement is either horizontal, vertical, or diagonal
        const deltaY = Math.abs(yDest - ySrc)
        const deltaX = Math.abs(xDest - xSrc)

        // Check if the movement is horizontal
        if (ySrc === yDest) {
            const xDirection = xDest > xSrc ? 1 : -1; // Determine the direction (left or right)
        
            // Check each square on the horizontal path for obstructions
            for (let x = xSrc + xDirection; x !== xDest; x += xDirection) {
                queenArr.push(ySrc * 10 + x)
            }
        }
        // Check if the movement is vertical
        else if (xSrc === xDest) {
            const yDirection = yDest > ySrc ? 1 : -1; // Determine the direction (up or down)
        
            // Check each square on the vertical path for obstructions
            for (let y = ySrc + yDirection; y !== yDest; y += yDirection) {
                queenArr.push(y * 10 + xSrc)
            }
        }
        // Check if the movement is diagonal
        else if (deltaY === deltaX) {
            const yDirection = yDest > ySrc ? 1 : -1; // Determine the vertical direction (up or down)
            const xDirection = xDest > xSrc ? 1 : -1; // Determine the horizontal direction (left or right)
        
            // Check each square on the diagonal path for obstructions
            for (let i = 1; i < deltaY; i++) {
                const y = ySrc + i * yDirection;
                const x = xSrc + i * xDirection;
                queenArr.push(y * 10 + x)
            }
        }
        
        queenArr.push(parseInt(king.piecePosition))

        return queenArr
    }
}