import { BlackPieces, WhitePieces } from "../index.js"

export function Index(i) {
    return i-1
}

export function GetKeyPieces(id) {
    let key = id.split('-')
    let front = ''
    
    if(key[0] === 'wp') {
        front = 'WhitePawn'
        let res = front + '_' + key[1]
        if(res === 'WhitePawn_1') return WhitePieces.WhitePawn_1
        if(res === 'WhitePawn_2') return WhitePieces.WhitePawn_2
        if(res === 'WhitePawn_3') return WhitePieces.WhitePawn_3
        if(res === 'WhitePawn_4') return WhitePieces.WhitePawn_4
        if(res === 'WhitePawn_5') return WhitePieces.WhitePawn_5
        if(res === 'WhitePawn_6') return WhitePieces.WhitePawn_6
        if(res === 'WhitePawn_7') return WhitePieces.WhitePawn_7
        if(res === 'WhitePawn_8') return WhitePieces.WhitePawn_8
    }
    if(key[0] === 'wr') {
        front = 'WhiteRook'
        let res = front + '_' + key[1]
        if(res === 'WhiteRook_1') return WhitePieces.WhiteRook_1
        if(res === 'WhiteRook_2') return WhitePieces.WhiteRook_2
    }
    if(key[0] === 'wn') {
        front = 'WhiteKnight'
        let res = front + '_' + key[1]
        if(res === 'WhiteKnight_1') return WhitePieces.WhiteKnight_1
        if(res === 'WhiteKnight_2') return WhitePieces.WhiteKnight_2
    }
    if(key[0] === 'wb') {
        front = 'WhiteBishop'
        let res = front + '_' + key[1]
        if(res === 'WhiteBishop_1') return WhitePieces.WhiteBishop_1
        if(res === 'WhiteBishop_2') return WhitePieces.WhiteBishop_2

    }
    if(key[0] === 'wq') return WhitePieces.WhiteQueen
    if(key[0] === 'wk') return WhitePieces.WhiteKing

    if (key[0] === 'bp') {
        front = 'BlackPawn';
        let res = front + '_' + key[1];
        if (res === 'BlackPawn_1') return BlackPieces.BlackPawn_1;
        if (res === 'BlackPawn_2') return BlackPieces.BlackPawn_2;
        if (res === 'BlackPawn_3') return BlackPieces.BlackPawn_3;
        if (res === 'BlackPawn_4') return BlackPieces.BlackPawn_4;
        if (res === 'BlackPawn_5') return BlackPieces.BlackPawn_5;
        if (res === 'BlackPawn_6') return BlackPieces.BlackPawn_6;
        if (res === 'BlackPawn_7') return BlackPieces.BlackPawn_7;
        if (res === 'BlackPawn_8') return BlackPieces.BlackPawn_8;
      }
    if (key[0] === 'br') {
        front = 'BlackRook';
        let res = front + '_' + key[1];
        if (res === 'BlackRook_1') return BlackPieces.BlackRook_1;
        if (res === 'BlackRook_2') return BlackPieces.BlackRook_2;
    }
    if (key[0] === 'bn') {
        front = 'BlackKnight';
        let res = front + '_' + key[1];
        if (res === 'BlackKnight_1') return BlackPieces.BlackKnight_1;
        if (res === 'BlackKnight_2') return BlackPieces.BlackKnight_2;
    }
    if (key[0] === 'bb') {
        front = 'BlackBishop';
        let res = front + '_' + key[1];
        if (res === 'BlackBishop_1') return BlackPieces.BlackBishop_1;
        if (res === 'BlackBishop_2') return BlackPieces.BlackBishop_2;
    }
      
    if(key[0] === 'bq') return BlackPieces.BlackQueen
    if(key[0] === 'bk') return BlackPieces.BlackKing

    return null
}