export class LocalStorage{
    constructor(){
        this.UserKey = 'USER'
        this.SessionKey = 'SESSION'
        this.TimeKey = 'TIME'
    }

    SetTime(time){
        localStorage.setItem(this.TimeKey, time)
    }

    GetTime(){
        return localStorage.getItem(this.TimeKey)
    }

    LogoutUser(){
        localStorage.removeItem(this.SessionKey)
    }

    GetAllUser(){
        return JSON.parse(localStorage.getItem(this.UserKey))
    }
    
    GetUsernameFromEmail(email) {
        const atIndex = email.indexOf('@');
        if (atIndex !== -1) {
          return email.slice(0, atIndex);
        } else {
          return null; // or any other error handling as needed
        }
    }
      
    GetSpecificUser(email) {
        let allUser = this.GetAllUser()
        if(allUser === null) return undefined
        let user = allUser.filter(i => i.email === email)
        return user[0]
    }

    GetAuthUser(email,password) {
        let allUser = this.GetAllUser()
        if(allUser === null) return undefined
        let user = allUser.filter(i => i.email === email && password === atob(i.password))
        return user[0]
    }

    StoreUser(email, password) {
        let arr = this.GetAllUser() 
        let newUser = {
            email:email,
            password:btoa(password)
        }
        arr = arr === null ? [] : arr
        arr.push(newUser)
        localStorage.setItem(this.UserKey, JSON.stringify(arr))
    }

    GetSessionUser() {
        let user = localStorage.getItem(this.SessionKey)
        if(user === null) return undefined
        return user
    }

    StoreSessionUser(email) {
        let sesUser = {
            email: email,
            username: this.GetUsernameFromEmail(email)
        }
        localStorage.setItem(this.SessionKey, JSON.stringify(sesUser))
    }
}