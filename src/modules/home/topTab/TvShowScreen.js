import * as React from 'react'
import {SafeAreaView,
        View,
        StyleSheet,
        ScrollView,
        Image
        } from 'react-native'

//custom Imports
import{vw,vh} from '../../../components/Dimension'
import {posterData} from '../../../dummyData/tvShowPoster'
import {ImageSlider} from '../../../components/ImageSlider'
import {MovieSlider} from '../../../components/MovieSlider'

//api paths
const topRatedShowApi = 'https://api.themoviedb.org/3/tv/top_rated?api_key=377cadc0acb43dea98fea39bd50200a5&language=en-US&page=1'
const popularShowApi = 'https://api.themoviedb.org/3/tv/popular?api_key=377cadc0acb43dea98fea39bd50200a5&language=en-US&page=1';
const nowPlayingapi = 'https://api.themoviedb.org/3/tv/airing_today?api_key=377cadc0acb43dea98fea39bd50200a5&language=en-US&page=1';

const loaderImg = require('../../../assets/6.gif');
//export MoviesScreen
export const TvShowScreen = (props) =>{

    const [topRatedShow, setTopRatedShow] = React.useState('');
    const [popularshows, setPopularShows] = React.useState('');
    const [nowPlaying, setNowPlaying] = React.useState('');
    const [loader1, setLoader1] = React.useState(false);
    const [loader2, setLoader2] = React.useState(false);
    const [loader3, setLoader3] = React.useState(false);
    //topRatedShow api fetch
    React.useEffect(()=>{
        fetch(topRatedShowApi).
        then(response => response.json()).
        then(responseJson => { 
            setLoader3(false);
            if(responseJson){
                setLoader3(true);
                setTopRatedShow(responseJson.results);
            }
    }).
        catch(error => console.log(error));
    }, []);

    //popular-shows api fetch
    React.useEffect(()=>{
        fetch(popularShowApi).
        then(response => response.json()).
        then(responseJson =>{ 
            setLoader1(false);
            if(responseJson){
                setLoader1(true);
                setPopularShows(responseJson.results);
            }
    }).
        catch(error => console.log(error));
    }, []);

    //nowplaying-movie api fetch
    React.useEffect(()=>{
        fetch(nowPlayingapi).
        then(response => response.json()).
        then(responseJson => { 
            setLoader2(false);
            if(responseJson){
                setLoader2(true);
                setNowPlaying(responseJson.results);
            }
    }).
        catch(error => console.log(error));
    }, []);
    
    return(
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={styles.scrollView}>
            <View style={styles.sliderHolder}>
                <ImageSlider  imageData={posterData} />
            </View>
            {  loader3 && loader1 && loader2 ?
            <View>
            <View style={styles.upComingView}>
                <MovieSlider headerTxt={`Now Playing`} data={nowPlaying} {...props} />
            </View>
            <View style={styles.upComingView}>
                <MovieSlider headerTxt={`Popular Shows`} data={popularshows} {...props} />
            </View> 
            <View style={styles.upComingView}>
                <MovieSlider headerTxt={`Top Rated TV Shows`} data={topRatedShow} {...props} />
            </View>
            
            </View> : 
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <Image  source={loaderImg} style={styles.loader} />
        </View>
            }
            </ScrollView>
        </SafeAreaView>
    );
}
//stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    },
    scrollView:{
        flex:1
    },
    sliderHolder:{
        paddingVertical:vh(5)
    }, 
    loader:{
        alignSelf:'center', 
        width:vw(50), 
        height:vw(50),
        marginTop:vh(50)
    }  
});