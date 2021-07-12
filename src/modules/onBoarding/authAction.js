export const addUser = (obj) =>({
    type : 'ADD_USER',
    payload : obj
})

export const resetPass = (newPass) =>({
    type : 'RESET_PASSWORD',
    payload : {
        password : newPass
    } 
})

export const loggedIn = (value) =>({
    type : 'LOGGED_IN',
    payload : value
})