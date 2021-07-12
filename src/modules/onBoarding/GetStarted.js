import * as React from 'react'
import {SafeAreaView,Image,StyleSheet,View,Text,Animated,Dimensions,Platform} from 'react-native'
import { Easing } from 'react-native-reanimated';

//custom imports
import {vh,vw} from '../../components/Dimension'
import {HeaderLogo} from '../../components/HeaderLogo'
const {width,height} = Dimensions.get(`window`);
const posterImg = require('../../assets/posterMovies.jpeg')

//export
export const GetStarted = (props) =>{

    const animVal = React.useRef(new Animated.Value(-height)).current;
    const animVal1 = React.useRef(new Animated.Value(height)).current;
    const animVal2 = React.useRef(new Animated.Value(height)).current;
    const animVal3 = React.useRef(new Animated.Value(height)).current;

    React.useEffect(()=>{
        Animated.timing(animVal,{
            toValue : 0,
            duration:1000,
            easing:Easing.linear,
            useNativeDriver:true
        }).start()
    })

    React.useEffect(()=>{
        Animated.timing(animVal1,{
            toValue : 0,
            duration:1000,
            easing:Easing.linear,
            useNativeDriver:true
        }).start((finished) => {
            finished ? Animated.timing(animVal2,{
                toValue : 0,
                duration:800,
                easing:Easing.linear,
                useNativeDriver:true
            }).start((finished) =>{
                finished ? Animated.timing(animVal3,{
                    toValue : 0,
                    duration:800,
                    easing:Easing.linear,
                    useNativeDriver:true
                }).start() : null
            }) : null
        })
    })


    return(
        <SafeAreaView style={styles.mainContainer}>
            <Animated.View style={[styles.posterView,{transform:[{translateY:animVal}]}]}>
                <Image  source={posterImg} style={styles.poster}/>
            </Animated.View>
            <Animated.View style={[styles.blank,{transform:[{translateY:animVal1}]}]}>
                <Animated.View style={[styles.logo,{transform:[{translateY:animVal2}]}]}>
                    <HeaderLogo width={150} height={60}/>
                </Animated.View>
                <Animated.View 
                style={{transform:[{translateY:animVal3}],borderRadius:vw(10), backgroundColor:'#00AAE1', padding:vw(12),marginTop:vw(20)}}>
                <Text 
                style={styles.txt}
                onPress={() => props.navigation.replace('login')}>{`Let's Get Started`}</Text>
                </Animated.View>
            </Animated.View>

        </SafeAreaView>
    );
}
//stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#232F3E'
    },
    poster:{
        width:vw(width/1.2),
        height:Platform.OS === 'ios' ? vw(width/1) : vw(width/1.15),
        borderBottomLeftRadius:vw(20),
        borderBottomRightRadius:vw(20)
    },
    blank:{
        backgroundColor:'white',
        height:vw(height),
        width:vw(width/1.4),
        position:'absolute',
        top:Platform.OS === 'ios' ? vw(width/0.74) : vw(width/0.9),
        borderTopLeftRadius:vw(20),
        borderTopRightRadius:vw(20),
        alignItems:'center',
    },
    logo:{
        marginTop:vw(50)
    },
    txt:{
        fontSize:vw(18),
        color:'white',
        //borderWidth:1,
        backgroundColor:'#00AAE1',
       
    }
});