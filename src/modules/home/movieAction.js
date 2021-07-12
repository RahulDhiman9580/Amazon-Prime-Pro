export const addToWatchList = (data) =>({
    type : 'ADD_TO_WATCHLIST',
    payload : data
});

export const addSeason = (season) =>({
    type : 'SEASON',
    payload : {season : season}
});

export const addDownload = (data) =>({
    type : 'ADD_DOWNLOAD',
    payload : data
});
export const deleteDownload = (index) =>{
    
    return(
    {
    type : 'DELETE_DOWNLOAD',
    payload : index
})}

export const deleteWatchList = (index) =>{
    
    return(
    {
    type : 'DELETE_WATCHLIST',
    payload : index
})}