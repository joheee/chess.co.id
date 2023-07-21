export class LocalStorage{
    constructor(){
        this.UserKey = 'USER'
    }

    GetAllUser(){
        return JSON.parse(localStorage.getItem(this.UserKey))
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
}