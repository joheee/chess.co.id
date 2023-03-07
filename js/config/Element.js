export function GetElement(type, flag) {
    if(type === 'class') return document.getElementsByClassName(flag)
    return document.getElementById(flag)
}

export function CreateElement(tag) {
    return document.createElement(tag)
}