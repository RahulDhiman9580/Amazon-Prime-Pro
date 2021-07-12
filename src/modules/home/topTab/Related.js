import * as React from 'react'
import {SafeAreaView, StyleSheet, View, Text,Dimensions} from 'react-native'
import {useSelector} from 'react-redux';


//custom imports
import {vw,vh} from '../../../components/Dimension'
import {MovieSlider} from '../../../components/MovieSlider'
import {CastViewer} from '../../../components/CastViewer'
import {EpisodeList} from '../../../components/EpisodeList'

//constants
const {width,height} = Dimensions.get(`window`)

export const Related = (props) =>{
   
    //image
    const episodeImg = props.route.params.episodeImage;

    const [similarMovies, setSimilarMovies] = React.useState('');
    const [episodes, setEpisodes] = React.useState('');
    const season = useSelector((state) => state.movieReducer.season)

    console.log("season", season);
    //api paths
    const similarMoviesApi1 = `https://api.themoviedb.org/3/movie/${props.route.params.movieId}/similar?api_key=377cadc0acb43dea98fea39bd50200a5&language=en-US&page=1`
    const similarMoviesApi2 = `https://api.themoviedb.org/3/tv/${props.route.params.movieId}/similar?api_key=377cadc0acb43dea98fea39bd50200a5&language=en-US&page=1`
    
    if(props.route.params.name === undefined){
    //similar api fetch
    React.useEffect(()=>{
        fetch(similarMoviesApi1).
        then(response => response.json()).
        then(responseJson => setSimilarMovies(responseJson.results)).
        catch(error => console.log(error));
    }, []);
    }

    else{
    //similar api fetch
    React.useEffect(()=>{
        fetch(similarMoviesApi2).
        then(response => response.json()).
        then(responseJson => setSimilarMovies(responseJson.results)).
        catch(error => console.log(error));
        },[]);

    //Episode Data api fetch
    React.useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${props.route.params.movieId}/season/${season}?api_key=377cadc0acb43dea98fea39bd50200a5&language=en-US`).
    then(response => response.json()).
    then(responseJson => setEpisodes(responseJson.episodes)).
    catch(error => console.log(error));
    },[season]);
}
    
    
    return(
        
        <SafeAreaView atyle={styles.mainConatiner}> 
            {
                episodes != undefined ? episodes.length != 0 ? 
                <View style={styles.episodeHolder}>
                    <EpisodeList  data={episodes} episodeImage={episodeImg} episodes={true}  />
                </View>
                :null : <View style={styles.episodeHolder}>
                <EpisodeList  data={episodes} episodeImage={episodeImg} />
            </View>
            }
            {
            similarMovies.length != 0?
            <View style={styles.similarMovies}>
            <MovieSlider headerTxt={`Similar`} data={similarMovies} {...props} />
            </View> : null}
            <View style={styles.castViewer}>
                <Text style={styles.castTxt}>{`Cast & Crew`}</Text>
                <View style={styles.subCastView1}>
                    <Text style={styles.detailTxt}>{`Details from`}</Text>
                    <Text style={styles.imdbTxt}>{`IMDB`}</Text>
                </View>
                <View style={styles.castImageHolder}>
                    <CastViewer />
                </View>
            </View>
           
        </SafeAreaView>
    );
}
//stylesheet
const styles = StyleSheet.create({
    mainConatiner:{
        flex:1,
    },
    similarMovies:{
        paddingHorizontal:vw(15)
    },
    castViewer:{
        paddingTop:vh(15)
    },
    castTxt:{
        fontSize:vw(18),
        color:'#232F3E',
        fontWeight:'bold',
        shadowColor: "#000",
        shadowOffset: {
	    width: vw(0),
	    height: vh(10),
        },
        elevation:6,
        paddingHorizontal:vw(15)
     },
    subCastView1:{
        paddingHorizontal:vw(15),
        marginTop:vh(5),
        flexDirection:'row'
    },
    detailTxt:{
        fontSize:vw(12),
        color:'#999999',
    },
    imdbTxt:{
        borderWidth:vw(1.3),
        paddingHorizontal:vw(5),
        borderRadius:vw(2),
        borderColor:'#999999',
        color:'#999999',
        fontWeight:'bold',
        fontSize:vw(11),
        marginLeft:vw(5)
    },
    castImageHolder:{
        flex:1,
    },
    episodeHolder:{
        // width:vw(width),
        // height:vh(350),
        // flex:3,
        // backgroundColor:'green'
    }
});