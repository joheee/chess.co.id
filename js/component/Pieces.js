import { CreateElement } from "../config/Element.js "

export function Pieces(sourcePath, id) {
    const piece = CreateElement('img')
    piece.setAttribute('id', id)
    piece.setAttribute('src', sourcePath)
    return piece
}