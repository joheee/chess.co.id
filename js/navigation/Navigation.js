import { Variable } from "../config/Variable.js";
import { FormValidation } from "./FormValidation.js";
import { LocalStorage } from "./LocalStorage.js";

export class Navigation {
    constructor() {
        this.HandleButton()
    }

    HandleButton(){
        this.HandleLoginButton()      
        this.HandleRegisterButton()  
        this.HandleSessionUser()
        this.HandleLogoutUser()
        this.HandleNewGame()
    }

    ShowError(message){
        let errorMessage = document.getElementById('error-message')
        errorMessage.style.display = 'block';
        errorMessage.style.animation = 'popInAnimation 0.3s ease forwards';
        errorMessage.innerHTML = message
    }
    HideError(){
        let errorMessage = document.getElementById('error-message')
        errorMessage.style.animation = 'popOutAnimation 0.8s ease forwards';
        setTimeout(function() {
            errorMessage.style.display = 'none';
        }, 300);
        errorMessage.style.display = 'none'
    }

    HandleNewGame() {
        let local = new LocalStorage()
        if(local.GetTime() === null) {
            Variable.timePlayed = 5
            console.log(Variable.timePlayed)
            local.SetTime(Variable.timePlayed)
        }

        document.getElementById('time-dropdown').innerHTML = `${local.GetTime()} min`

        document.getElementById('new-button').addEventListener('click', () => {
            let modal = document.getElementById('new-modal')
            modal.style.display = 'flex'
        })
        document.getElementById('exit-new-button').addEventListener('click', () => {
            let modal = document.getElementById('new-modal')
            modal.style.display = 'none'
            this.HideError()
        })
        document.getElementById('time-dropdown').addEventListener('click', () => {
            let drop = document.getElementById('time-dropdown-container')
            const computedStyle = window.getComputedStyle(drop)
            if(computedStyle.getPropertyValue('display') == 'none') {
                drop.style.display = 'grid'
            }
            else{ 
                drop.style.display = 'none'
            }
        })       
        for(let i=0;i<30;i+=5){
            let minute = i === 0 ? 1 : i
            let key = `${minute}-min`
            let text = `${minute} min`
            document.getElementById(key).addEventListener('click', () => {
                document.getElementById('time-dropdown').innerHTML = text
                Variable.timePlayed = minute
            })
        }        
        document.getElementById('play').addEventListener('click', () => {
            if(Variable.timePlayed === 0) {
                this.ShowError('choose your playing time!')
                return
            }
            this.HideError()
            local.SetTime(Variable.timePlayed)
            let modal = document.getElementById('new-modal')
            modal.style.display = 'none'
            this.HideError()
            location.reload()
        }) 
    }

    HandleLogoutUser(){
        let logout = document.getElementById('logout-button')
        logout.addEventListener('click',() => {
            const local = new LocalStorage()
            local.LogoutUser()
            location.reload()
        })
    }

    HandleSessionUser(){
        // GET SESSION USER
        const local = new LocalStorage()
        let user = local.GetSessionUser()

        let login = document.getElementById('login-button')
        let register = document.getElementById('register-button')
        let logout = document.getElementById('logout-button')
        
        let tobBar = document.getElementById('top-bar')        

        if(user === undefined) {
            logout.style.display = 'none'
            tobBar.style.gridTemplateColumns = "auto auto auto";
        }else {
            login.style.display = 'none'
            register.style.display = 'none'
            tobBar.style.gridTemplateColumns = "auto auto";
        }
    }

    HandleLoginButton(){
        document.getElementById('login-button').addEventListener('click', () => {
            let modal = document.getElementById('login-modal')
            modal.style.display = 'flex'
        })
        document.getElementById('exit-button').addEventListener('click', () => {
            let modal = document.getElementById('login-modal')
            modal.style.display = 'none'
            this.HideError()
        })
        document.getElementById('login').addEventListener('click', () => {
            let email = document.getElementById('username').value
            let password = document.getElementById('password').value
            
            if(email === '' || password === '') {
                this.ShowError('all field must be filled!')
                return
            }

            if(!FormValidation.IsUserExist(email, password)) {
                this.ShowError('invalid credentials!')
                return
            }

            this.HideError()

            // all validation passed
            let local = new LocalStorage()
            console.log(local.GetAuthUser(email,password))
            local.StoreSessionUser(email)
            location.reload()
        }) 
    }

    HandleRegisterButton() {
        document.getElementById('register-button').addEventListener('click', () => {
            let modal = document.getElementById('register-modal')
            modal.style.display = 'flex'
        })
        document.getElementById('exit-register-button').addEventListener('click', () => {
            let modal = document.getElementById('register-modal')
            modal.style.display = 'none'
            this.HideError()
        })
        document.getElementById('register').addEventListener('click', () => {
            let email = document.getElementById('regist-username').value
            let password = document.getElementById('regist-password').value
            let conPass = document.getElementById('regist-confirm-password').value
            
            console.log(email,password, conPass)

            if(email === '' || password === '' || conPass === '') {
                this.ShowError('all field must be filled!')
                return
            }
            
            if(FormValidation.IsEmailExist(email)){
                this.ShowError('email already being used!')
                return
            }

            if(!FormValidation.ContainsGmail(email)) {
                this.ShowError('email is not valid!')
                return
            }

            if(!FormValidation.MinimumLength(password, 7) || !FormValidation.MinimumLength(conPass, 7)){
                this.ShowError('password length must be 7 character minimum!')
                return
            }

            if(!FormValidation.IsAplhaNumeric(password) || !FormValidation.IsAplhaNumeric(conPass)) {
                this.ShowError('password must be aplhanumeric!')
                return
            }

            if(password !== conPass) {
                this.ShowError('password must be equal with confirm password!')
                return
            }

            this.HideError()

            // all validation passed
            let local = new LocalStorage()
            local.StoreUser(email,password)
            local.StoreSessionUser(email)
            location.reload()
        }) 
    }
}