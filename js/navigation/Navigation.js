export class Navigation {
    constructor() {
        this.HandleButton()
    }
    HandleButton(){
        document.getElementById('login-button').addEventListener('click', () => {
            let modal = document.getElementById('login-modal')
            modal.style.display = 'flex'
        })
        document.getElementById('exit-button').addEventListener('click', () => {
            let modal = document.getElementById('login-modal')
            modal.style.display = 'none'
        })

        document.getElementById('new-button')

    }
}