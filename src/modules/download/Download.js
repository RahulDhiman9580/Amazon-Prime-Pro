import * as React from 'react'
import {SafeAreaView,
        View,
        StyleSheet,
        BackHandler,
        Text,Image, Dimensions,Platform,Animated} from 'react-native'

//custom imports
import {vw,vh} from '../../components/Dimension'
import {HeaderLogo} from '../../components/HeaderLogo'
import {useSelector, useDispatch} from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { Easing } from 'react-native-reanimated'
import { RenderItem } from './RenderItem'


const downloadLogo = require('../../assets/no-download.png');

const {width,height} = Dimensions.get(`window`);

//export Home
export const Download = (props) =>{

    const downloadData = useSelector((state) => state.movieReducer.downloads); 
    const animValue = React.useRef(new Animated.Value(height)).current;
    const animValue1 = React.useRef(new Animated.Value(-height)).current;

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    //animation
    React.useEffect(()=>{
        Animated.timing(animValue,{
            toValue : 0,
            duration: 1000,
            easing : Easing.linear,
            useNativeDriver : true 
        }).start();
    })
    //animation
    React.useEffect(()=>{
        Animated.timing(animValue1,{
            toValue : 0,
            duration: 1000,
            easing : Easing.linear,
            useNativeDriver : true 
        }).start();
    })
     //renderItem
    const renderItem = ({item,index}) =>{
        console.log(props);
        return(
            <Animated.View style={[styles.renderView,{transform:[{translateY:animValue}]}]}>
                <RenderItem item={item} index={index} navigationProp={props}/>
            </Animated.View>
        );
    }
    
    return(
        <SafeAreaView style={styles.mainContainer}>
            <Animated.View style={[styles.header,{transform:[{translateY:animValue1}]}]}>
                <HeaderLogo width={150} height={50}/>
            </Animated.View>
            
                {
                    downloadData.length != 0 ? 
                    <Animated.View style={[styles.listHolder]}>
                    <FlatList  
                    data={downloadData}
                    keyExtractor={() => 'download'.concat(Math.random())}
                    renderItem={renderItem} /> 
                    </Animated.View>:
                    <Animated.View style={[styles.imgBg,{ transform: [{translateY : animValue}]}]}>
                    <Image source={downloadLogo} style={styles.imgLogo} />
                    </Animated.View>
                }

        </SafeAreaView>
    );
}
//stylesheet
const styles = StyleSheet.create({
mainContainer:{
    flex:1,
    paddingHorizontal:vw(15)
},
header:{
    alignItems:'center',
    marginTop:vw(20)
},
listHolder:{
    flex:1
},
imgLogo:{
    width:vw(200),
    height:vw(200),
    alignSelf:'center'
},
imgBg:{
    backgroundColor:'#232F3E',
    width:vw(300),
    height:vw(300),
    justifyContent:'center',
    alignSelf:'center',
    marginTop:vh(150),
    borderRadius:vw(400/2)
},
renderView:{
    alignItems:'center',
    backgroundColor:'#232F3E',
    paddingHorizontal:vw(15),
    paddingVertical:vh(10),
    marginHorizontal:vw(10),
    borderRadius:vw(10),
    marginVertical:vh(10),
    flexDirection:'row',
    shadowColor: "white",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.34,
shadowRadius: 6.27,

elevation: Platform.OS === 'ios' ? 6 : -10,
},

});