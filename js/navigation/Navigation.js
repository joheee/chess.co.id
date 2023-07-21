import { FormValidation } from "./FormValidation.js";
import { LocalStorage } from "./LocalStorage.js";

export class Navigation {
    constructor() {
        this.HandleButton()
    }

    HandleButton(){
        this.HandleLoginButton()      
        this.HandleRegisterButton()  
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