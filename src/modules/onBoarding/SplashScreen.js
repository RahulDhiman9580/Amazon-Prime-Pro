import * as React from 'react'
import {SafeAreaView,
        StyleSheet,
        Animated,
        Easing,Dimensions} from 'react-native'
import {useSelector} from 'react-redux'
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-root-toast'
import Snackbar from 'react-native-snackbar';

//custom imports
import {vw,vh} from '../../components/Dimension'

//constants
const imagePath = require('../../assets/images/prime-logo.png');
const {width,height} = Dimensions.get(`window`)

//export
export const SplashScreen = (props) =>{
    const {isLoggedIn} = useSelector((state) => state.authReducer);
    const animValue = React.useRef( new Animated.Value(0)).current;
  
    //animations
    
    React.useEffect(() => {
            Animated.timing(animValue, {
            toValue: 1,
            duration:  5000,
            easing : Easing.in(Easing.bounce),
            useNativeDriver:false
        }).start(
        (finished) => finished && isLoggedIn ? 
        props.navigation.replace('bottomTab') : props.navigation.replace('GetStarted'));

        NetInfo.fetch().then(state => {
        state.isConnected ? Snackbar.show({
            text: 'Connected to internet.',
            duration: Snackbar.LENGTH_SHORT,
          }) : Snackbar.show({
            text: 'Make Sure you are connected to internet.',
            duration: Snackbar.LENGTH_SHORT,
          })
          });
    });
    const size = animValue.interpolate({
        inputRange:[0,1],
        outputRange:[0,vw(200)]
    });

    return(
        <SafeAreaView style={styles.mainView}>
            <Animated.Image source={imagePath} style={{opacity:animValue, width:size, height:size}} />
        </SafeAreaView>
    );
};

//Stylesheet
const styles = StyleSheet.create({
    mainView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    animView:{
        width:vw(150),
        height:vh(100)
    },
    image:{
        width:vw(150),
        height:vh(100)
    }
});