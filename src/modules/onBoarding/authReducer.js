const INITIAL_STATE = {
    name : '',
    email : '',
    mobNumber : '',
    password : '',
    isLoggedIn : false
}

export const authReducer = (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case 'ADD_USER' :
            return {...state, ...action.payload};
        case 'RESET_PASSWORD' :
            return {...state, ...action.payload};
        case 'LOGGED_IN' :
            return {...state, isLoggedIn : action.payload};
        default :
            return state;
    }
}