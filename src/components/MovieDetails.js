import * as React from 'react'
import {SafeAreaView,
    Image,
    View,
    StyleSheet,
    Text,Dimensions, Animated,Easing,TouchableOpacity, Modal, ScrollView, BackHandler} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {useDispatch, useSelector} from 'react-redux'
import Toast from 'react-native-root-toast'
import Snackbar from 'react-native-snackbar';



//custom import 
import {vw,vh} from './Dimension'
import {BackButton} from './BackButton'
import { TopTabDetails } from '../modules/home/topTab/TopTabDetails'
import {addToWatchList, addDownload} from '../modules/home/movieAction'
import {addSeason} from '../modules/home/movieAction'



//image paths
const close = require('../assets/images/letter-x.png')
const playButton = require('../assets/images/bottomTab/play-button.png')
const addButton = require('../assets/images/bottomTab/plus.png')
const {width,height} = Dimensions.get('window');
const downloadLogo = require('../assets/download-circular-button.png')


//export MovieDetails
export const MovieDetails = (props) =>{
    const movieData = props.route.params.routeData;
    const dispatch = useDispatch();
    const [modalVisible,setModalVisible] = React.useState(false);
    const selected = useSelector((state) => state.movieReducer.season)
    const animValue = React.useRef( new Animated.Value(0)).current;
 
 
    const [seasons, setSeasons] = React.useState([1]);

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])
    
    //fetching seasons
     React.useEffect(()=>{
         fetch(`https://api.themoviedb.org/3/tv/${movieData.id}?language=en-US&api_key=377cadc0acb43dea98fea39bd50200a5`).
         then(response => response.json()).
         then(responseJson => {setSeasons(responseJson.seasons);console.log(responseJson.seasons)}).
         catch(error => console.log(error));
         dispatch(addSeason(1));
     }, []);
   
    React.useEffect(() => {
        Animated.timing(animValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver:false
        }).start()
    })
 
    const size = animValue.interpolate({
        inputRange:[0,0.1,0.2,0.5,1],
        outputRange:[vw(10),vw(50),vw(150),vw(200),vw(width)]
    });
 
    React.useEffect(() => {},[selected])
    //onPressSeason
    const onPressSeason = () =>{ 
     setModalVisible(true);
    }
    //playButton
    const playButtonPress = () =>{
        props.navigation.navigate('Video');
    }
    //onPressModal
    const onPressModal = (index) =>{ 
        dispatch(addSeason(index+1));
        //setSelected(index+1);
        setModalVisible(false);
     }
     //onPressModalVisible
     const onPressModalVisible = () =>{
         setModalVisible(false);
     }
     //onPressWatchDown
     const onPressWatchDown = (str) =>{
         if(str === 'watch'){
             dispatch(addToWatchList(movieData)); 
             Snackbar.show({
                text: 'Added to watchlist.',
                duration: Snackbar.LENGTH_SHORT,
              });
         }
         else{
             dispatch(addDownload(movieData)); 
             Snackbar.show({
                text: 'Added to downloads.',
                duration: Snackbar.LENGTH_SHORT,
              });
         }
     }
     
 
     return(
         
         <SafeAreaView style={styles.mainContainer}>
             
             <View style={{flex:1}}>
                 <ScrollView
                 nestedScrollEnabled={true}>
             <View style={[styles.imgHolder]}>
                 <Image blurRadius={4.5} source={{uri : `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}} 
                 style={styles.img}/>
                 <LinearGradient
                 colors={['transparent', 'rgba(255,255,255,0.9)']}
                 style={styles.absolute}
                 >
                     <View style={{width:width,height:vh(150)}}></View>
                 </LinearGradient>
                 <View style={styles.posterHolder}>
                     <Image source={{uri : `https://image.tmdb.org/t/p/original${movieData.poster_path}`}}
                     style={styles.poster} />
                 </View>
             </View>
             <View style={styles.backButtonView}>
                 <BackButton {...props}/>
             </View>
             <View style={styles.titleView}>
                 <Text style={styles.title}>{movieData.name ?? movieData.original_title}</Text>
             </View>
             {   movieData.name ? 
             <View   style={styles.dropDown}>
                 <TouchableOpacity onPress={() => onPressSeason()}>
                     <Text style={styles.seasonTxt}>{`Season ${selected}`}</Text>
                 </TouchableOpacity>
             </View>
             : null}
 
             <View style={styles.contentView}>
                 <Text style={styles.primeTxt}>{`prime`}</Text>
                 <Text style={styles.subPrimeTxt}>{`Watch for ₹0 with Prime`}</Text>
                 <View style={styles.button}>
                     <Text style={styles.buttonTxt}>{`Watch with Prime`}</Text>
                 </View>
                 <Animated.View style={[styles.buttonContainer, {opacity:animValue, width:size, height:vw(50)}]}>
                     <TouchableOpacity onPress={() => playButtonPress()}>
                     <View style={styles.buttonView}>
                         <Image source={playButton} style={styles.playButton} />
                         <Text style={styles.playButtonTxt}>{`Play`}</Text>
                     </View>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => onPressWatchDown('watch')}>
                     <View style={styles.buttonView}>
                         <Image source={addButton} style={styles.playButton} />
                         <Text style={styles.playButtonTxt}>{`Watchlist`}</Text>
                     </View>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => {onPressWatchDown('download')}}>
                     <View style={styles.buttonView}>
                         <Image source={downloadLogo} style={styles.playButton} />
                         <Text style={styles.playButtonTxt}>{`Download`}</Text>
                     </View>  
                     </TouchableOpacity>          
                 </Animated.View>
             </View>
             <View style={styles.description}>
                 <Text 
                 style={styles.descriptionTxt}
                 numberOfLines={3}>{movieData.overview}</Text>
             </View>
             <View style={styles.imbdContainer}>
                 <Text style={styles.imdbTxt}>{`IMDB`}</Text>
                 <Text style={styles.rating}>{movieData.vote_average}</Text>
                 <Text style={styles.rating}>{`  Drama | Action | Thriller`}</Text>
             </View>
             <View style={styles.dateContainer}>
                 <Text style={styles.imdbTxt}>{movieData.release_date ? movieData.release_date.substring(0,4) : 2021}</Text>
                 <Text style={styles.rating}>{`123 mins`}</Text>
                 <Text style={styles.adultTxt}>{`U/A 13+`}</Text>
                 <Text style={styles.adultTxt}>{`4K UHD`}</Text>
             </View>
             <View style={styles.languageHolder}>
                 <Text style={styles.rating}>{`Languages:  English . Hindi . Telgu`}</Text>
             </View>
             <View style={styles.tabHolder}>
                 <TopTabDetails movieId={movieData.id} name={movieData.name} season={selected === 0 ? 1 : selected}  episodeImage={movieData.backdrop_path}/>
             </View>
             </ScrollView>
             <Modal
             animationType={'fade'}
             transparent={true}
             visible={modalVisible}
             onRequestClose={() => setModalVisible(false)}>
                 <View style={styles.modalContainer}>
                
                 <View style={styles.modalList}>
                     {   seasons ?
                     <>
                          <TouchableOpacity onPress={()=> onPressModalVisible()} style={styles.closeButton}>
                          <Image source={close} style={styles.close} />
                      </TouchableOpacity>
                         <ScrollView
                         showsVerticalScrollIndicator={false}
                         >
                         {    
                         seasons.map((item,index) => <Text key={'seasonModal'.concat(Math.random()).toString()}
                         onPress={() => onPressModal(index)}
                         style={styles.seasonTxtModal}>{`Season ${index+1}`}</Text>)
                         } 
                         </ScrollView></>: null
                     }
                 </View>
                 </View>
             </Modal>
             </View>
         </SafeAreaView>  
     );
 };
 //stylesheet
 const styles = StyleSheet.create({
     mainContainer:{
         flex:1,
             },
     scrollView:{
         
             },
     img:{
         height:vh(250),
         width:vh(height),
     },
     backButtonView:{
         backgroundColor:'white',
         padding:vw(8),
         borderRadius:vw(40),
         position:'absolute',
         top:vh(30),
         left:vw(15),
         shadowColor: "white",
         shadowOffset: {
         width: 0,
         height: 3,
         },
         shadowOpacity: 0.27,
         shadowRadius: 4.65,
         elevation: 6,
     },
     absolute:{
         position:'absolute',
         bottom:vh(0)
     },
     titleView:{
         marginTop:vh(10),
         marginLeft:vw(15)
     },
     title:{
         fontSize:vw(25),
         fontWeight:'bold',
         color:'#232F3E'
     },
     contentView:{
         paddingHorizontal:vw(15),
         marginTop:vh(20)
     },
     primeTxt:{
         fontSize:vw(18),
         fontWeight:'bold',
         color:'#00A8E1',
     },
     button:{
         alignItems:'center',
         paddingVertical:vh(15),
         backgroundColor:'#e8a405',
         marginTop:vh(15),
         borderRadius:vw(5),
         shadowColor: "#000",
         shadowOffset: {
         width: 0,
         height: 3,
         },
         shadowOpacity: 0.27,
         shadowRadius: 4.65,
         elevation: 2,
     },
     buttonTxt:{
         color:'white',
         fontSize:vw(13),
         fontWeight:'bold'
     },
     subPrimeTxt:{
         fontSize:vw(12),
         marginTop:vh(5),
         color:'#999999'
     },
     buttonContainer:{
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'space-between',
         paddingHorizontal:vw(60),
         marginTop:vh(25),
         
        // borderWidth:1,
         alignSelf:'center'
     },
     buttonView:{
         alignItems:'center',
     },
     playButton:{
         tintColor:'#999999',
         width:vw(38),
         height:vw(38),
     },
     playButtonTxt:{
         fontSize:vw(11),
         //fontWeight:'bold',
         color:'#999999',
         marginTop:vh(5),
         textAlign:'center',
         shadowColor: "#000",
         shadowOffset: {
         width: 0,
         height: 3,
         },
         shadowOpacity: 0.27,
         shadowRadius: 4.65,
         elevation: 2,
     },
     description:{
         paddingHorizontal:vw(15),
         marginTop:vh(25),
     },
     descriptionTxt:{
         textAlign:'justify',
         fontSize:vw(12),
         color:'#232F3E'
     },
     imbdContainer:{
         paddingHorizontal:vw(15),
         marginTop:vh(10),
          flexDirection:'row'
     },
     imdbTxt:{
         fontSize:vw(12),
         color:'#999999'
     },
     rating:{
         fontSize:vw(12),
         color:'#999999',
         marginLeft:vw(5)
     },
     dateContainer:{
         paddingHorizontal:vw(15),
         flexDirection:'row',
         marginTop:vh(10),
         alignItems:'center'
     },
     adultTxt:{
         fontSize:vw(10),
         color:'#999999',
         marginLeft:vw(5),
         borderWidth:vw(1.2),
         paddingVertical:vh(2),
         paddingHorizontal:vw(5),
         borderRadius:vw(2),
         borderColor:'#999999'
     },
     languageHolder:{
         paddingHorizontal:vw(15),
         flexDirection:'row',
         marginTop:vh(10),
         alignItems:'center'
     },
     tabHolder:{
         marginTop:vh(10),
     },
     posterHolder:{
         position:'absolute',
         alignSelf:'center',
         top:vh(15)
     },
     poster:{
         width:vw(140),
         height:vh(220),
         borderRadius:vw(10)
     },
     dropDown:{
         marginLeft:vw(15),
         marginTop:vh(15),
         width:vw(100)
     },
     seasonTxt:{
         borderWidth:vw(1.5),
         textAlign:'center',
         fontSize:vw(15),
         paddingVertical:vh(8),
         borderColor:'#00A8E1',
         borderRadius:vw(6),
         fontWeight:'bold',
         fontStyle:'italic',
         color:'#00A8E1'
     },
     modalContainer:{
         justifyContent:'center',
         alignItems:'center',
         flex:1,
         backgroundColor:'#0d0d0d80'
     },
     modalList:{
         width:vw(300),
         height:vh(300),
         backgroundColor:'#232F3E',
         borderRadius:vw(20),
         alignItems:'center',
         paddingVertical:vh(50),
         shadowColor: "white",
 shadowOffset: {
     width: 0,
     height: 5,
 },
 shadowOpacity: 0.34,
 shadowRadius: 6.27,
 
 elevation: 10,
     },
     seasonTxtModal:{
         fontSize:vw(20),
         paddingVertical:vh(5),
         color:'white',
         marginTop:vh(5),
         textAlign:'center'
     },
     close:{
         width:vw(20),
         height:vh(20),
         tintColor:'#00A8E1'
     },
     closeButton:{
         position:'absolute',
         left:vw(25),
         top:vh(20)
     },
     backgroundVideo: {
         flex:1,
         position: 'absolute',
         top: 0,
         left: 0,
         bottom: 0,
         right: 0,
       },
 });