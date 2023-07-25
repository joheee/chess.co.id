import { BlackPieces, WhitePieces } from "../index.js"

export function Index(i) {
    return i-1
}

export function GetKeyPieces(id) {
    let key = id.split('-')
    let front = ''
    let res = ''
    
    if(key[0] === 'wp') {
        front = 'WhitePawn'
        res = front + '_' + key[1]
    }
    if(key[0] === 'wr') {
        front = 'WhiteRook'
        res = front + '_' + key[1]
    }
    if(key[0] === 'wn') {
        front = 'WhiteKnight'
        res = front + '_' + key[1]
    }
    if(key[0] === 'wb') {
        front = 'WhiteBishop'
        res = front + '_' + key[1]

    }
    if(key[0] === 'wq') {
        front = 'WhiteQueen'
        res = front + '_' + key[1]

    }
    if(key[0] === 'wk') return WhitePieces.WhiteKing

    if (key[0] === 'bp') {
        front = 'BlackPawn';
        res = front + '_' + key[1];
      }
    if (key[0] === 'br') {
        front = 'BlackRook';
        res = front + '_' + key[1];
    }
    if (key[0] === 'bn') {
        front = 'BlackKnight';
        res = front + '_' + key[1];
    }
    if (key[0] === 'bb') {
        front = 'BlackBishop';
        res = front + '_' + key[1];
    }
      
    if(key[0] === 'bq') {
        front = 'BlackQueen'
        res = front + '_' + key[1]

    }
    if(key[0] === 'bk') return BlackPieces.BlackKing

    let split = key[0].split('')
    if(split[0] === 'w') return WhitePieces[res]
    else return BlackPieces[res]

}