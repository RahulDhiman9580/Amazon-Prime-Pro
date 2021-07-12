import * as React from 'react'
import {SafeAreaView,
        View,
        StyleSheet,
        Text,
        TextInput,
         Image,
         FlatList,
         BackHandler,
        TouchableOpacity,Animated, Dimensions, Platform} from 'react-native'
import { Easing } from 'react-native-reanimated'


//custom imports
import {vw,vh} from '../../components/Dimension'
import {HeaderLogo} from '../../components/HeaderLogo'
import { PopUpModal } from '../../components/PopUpModal'

//const
const searchLogo = require('../../assets/images/magnifying-glass.png')
const background = require('../../assets/background.jpeg')
const errorPic = require('../../assets/error.png')

const {width,height} = Dimensions.get(`window`);

//export Home
export const Find = (props) =>{

    const [inputTxt,setInputTxt] = React.useState('');
    const [inputStyle, setInputStyle] = React.useState({});
    const [searchData, setSearchData] = React.useState('');
    const [noData, setNoData] = React.useState(false);
    const inputRef = React.useRef();
    const animVal = React.useRef(new Animated.Value(0)).current;
    const animVal1 = React.useRef(new Animated.Value(0)).current;
    const animVal2 = React.useRef(new Animated.Value(height)).current;

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    //onPressSearch
    const onPressSearch = () => {
        Animated.timing(animVal,{
            toValue : -15,
            duration:800,
            easing : Easing.linear,
            useNativeDriver:true
        }).start();
        Animated.timing(animVal1,{
            toValue : 0,
            duration:800,
            easing : Easing.linear,
            useNativeDriver:true
        }).start();
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=377cadc0acb43dea98fea39bd50200a5&language=en-US&page=1&include_adult=false&query=${inputTxt}`).
        then(response => response.json()).
        then(responseJson => {setSearchData(responseJson)
            responseJson.errors ? setNoData(true) : setNoData(false)}).
        catch(error => {console.log(error)});
        inputRef.current.clear();    
    }

    React.useEffect(() => 
    Animated.timing(animVal1,{
        toValue : 10,
        duration:height,
        easing : Easing.linear,
        useNativeDriver:true
    }).start(),[]);

    React.useEffect(() => 
    Animated.timing(animVal2,{
        toValue : 0,
        duration:800,
        easing : Easing.linear,
        useNativeDriver:true
    }).start(),[]);
    //onPress
    const onPress = () =>{
        Animated.timing(animVal,{
            toValue : 15,
            duration:800,
            easing : Easing.linear,
            useNativeDriver:true
        }).start();
        
    };
    //onFocus
     const onFocus = () =>{
        console.log('hello input')
        setInputStyle({
            borderWidth : 1,
            borderColor : '#00A8E1'
        });
    }   
    //callbackHandler
    const callBackHandler = () =>{
        setNoData(false);
    }
    //renderItem
    const renderItem = ({item,index}) =>{
        return(
            <View style={styles.renderView}>
                <TouchableOpacity onPress={() => props.navigation.navigate('movieDetail', {routeData : item})} style={styles.render1}>
                <Text style={styles.prime}>{`Prime`}</Text>
                <Image source={{uri : `https://image.tmdb.org/t/p/original${item.poster_path}`}} style={styles.poster} />
                <View style={styles.detailHolder}>
                    <Text style={styles.name}>{`${item.original_title ?? item.name}`}</Text>
                    <Text style={styles.rating}>{`IMDB rating ${item.vote_average}`}</Text>
                    <Text style={styles.media}>{`Media Type : ${item.media_type}`}</Text>
                </View>
                </TouchableOpacity>
            </View>
        );
    }
    //keyExtractor
    const keyExtractor = () => 'search'.concat(Math.random());

    return(
        <SafeAreaView style={styles.mainContainer}>
            
            <View style={styles.overlay}>
            <Animated.View style={[styles.header,{opacity:animVal1,transform:[{translateY : animVal2}]}]}>
                <Animated.Image source={background} style={[styles.bgImg,{opacity:animVal1,transform:[{translateY : animVal2}]}]} blurRadius={2.5}/>   
                <HeaderLogo width={180} height={60}/>
            </Animated.View>
            <Animated.View style={{transform:[{translateY : animVal1}]}}>
                <Animated.Text onPress={onPress} style={[styles.searchTxt]} >{`Search`}</Animated.Text>
            </Animated.View>
            <Animated.View style={[styles.inputHolder,{opacity:animVal, transform:[{translateY : animVal}]}]}>
            <TextInput
            ref={inputRef}
            style={[styles.input,inputStyle]}
            onChangeText={(val) => setInputTxt(val)}
            onFocus={() => onFocus()}    />
            <View style={styles.logoHolder}>
                <TouchableOpacity onPress={onPressSearch}>
                    <Image  source={searchLogo} style={styles.logo}   />
                </TouchableOpacity>
            </View>
            </Animated.View>
            {
                searchData.hasOwnProperty('results') ? 
            <View style={styles.flatList}>
            <FlatList   
            data={searchData.results}
            keyExtractor={keyExtractor}
            renderItem={renderItem} 
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={15}
            showsVerticalScrollIndicator={false} />
            </View> : <PopUpModal item={{
                visible : noData,
                modalTitle:'No Results Found.',
                logoImage : errorPic
            }} handleCallBack={() => callBackHandler()} {...props} />}
            
          
            </View>
            
        </SafeAreaView>
    );
}
//stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    },
    header:{
        alignSelf:'center',
        alignItems:'center',
        position:'absolute',
        top: Platform.OS === 'ios' ? vw(width/2) : vw(width/2)
    },
    input:{
        backgroundColor:'white',
        paddingVertical:Platform.OS === 'ios' ? vw(15) : vw(10),
        borderRadius:vw(5),
        paddingHorizontal:vw(8)
      
    },
    inputHolder:{
       //borderWidth:1,
    },
    logoHolder:{
        position:'absolute',
        right:vw(28),
        top:vw(10)
    },
    logo:{
        width:vw(25),
        height:vw(25),
        tintColor:'#00A8E1'
    },
    moviesSearch:{
        marginTop:vh(20),
    },
    searchTxt:{
        color:'#00A8E1',
        fontSize:vw(25),
        textAlign:'center',
        width:vw(120),
        paddingVertical:vh(8),
        alignSelf:'center',
        marginTop:vh(0),
    },
    buttonHolder:{
        flexDirection:'row'
    },
    bgImg:{
        flex:1,
        width:vw(300),
        height:vw(300),
        borderRadius:vw(width/2),
        alignSelf:'center'
    },
    overlay:{
        flex:1,
        paddingHorizontal:vw(15),
    },
    renderView:{
        backgroundColor:'#232F3E',
        marginVertical:vh(10),
        paddingVertical:vh(15),
        paddingHorizontal:vw(10),
        borderRadius:vw(10),
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    poster:{
        width:vw(100),
        height:vw(100),
        borderRadius:vw(height/2),
        borderWidth:5,
        borderColor:'white',
        marginLeft:vw(10)
    },
    flatList:{
        flex:1,
        marginTop:vh(20),
        paddingHorizontal:vw(10),
        borderRadius:vw(8),
    },
    detailHolder:{
        justifyContent:'center',
        marginLeft:vw(20)
    },
    name:{
        color:'#999999',
        fontSize:vw(16),
        fontWeight:'bold',
        width:vw(180)
    },
    rating:{
        color:'#999999',
        fontSize:vw(10),
        fontStyle:'italic',
        marginTop:vh(2)
    },
    media:{
        color:'#999999',
        fontSize:vw(12),
        marginTop:vh(5)
    },
    error:{
        width:vw(80),
        height:vh(80)
    },
    flatListError:{
        width:vw(300),
        height:vh(300),
        marginTop:vh(150),
        backgroundColor:'#232F3E',
        paddingHorizontal:vw(10),
        borderRadius:vw(8),
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    errorTxt:{
        color:'red',
        fontSize:vw(18),
        marginTop:vh(15)
    },
    prime:{
        position:'absolute',
        right:vw(10),
        fontSize:vw(15),
        color:'#00AAE1',
        fontWeight:'bold'
    },
    render1:{
        flex:1,
        flexDirection:'row'
    }
   
});