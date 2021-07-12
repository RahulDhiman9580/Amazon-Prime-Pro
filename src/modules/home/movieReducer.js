

const INITIAL_STATE = {
    watchlist : [],
    season : 1,
    downloads : []
};

export const movieReducer = (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case 'ADD_TO_WATCHLIST' :
            return {...state, watchlist : state.watchlist.includes(action.payload) ? state.watchlist : state.watchlist.concat(action.payload)}    
        case 'SEASON' : 
            return {...state, season : action.payload.season}
        case 'ADD_DOWNLOAD' :
            return {...state, downloads : state.downloads.includes(action.payload) ? state.downloads : state.downloads.concat(action.payload)}
        case 'DELETE_DOWNLOAD' :
            return {...state, downloads : state.downloads.filter((item,index) => index != action.payload)}
        case 'DELETE_WATCHLIST' :
                return {...state, watchlist : state.watchlist.filter((item,index) => index != action.payload)};
            default : 
            return state;
    }
}