import * as React from 'react'
import {SafeAreaView, StyleSheet, View,Dimensions, Platform} from 'react-native'
import Video from 'react-native-video';

//custom imports
import {vh,vw} from './Dimension'
const {width,height} = Dimensions.get(`window`);
import {BackButton} from './BackButton'

const video = require('../assets/sample.mov')

export const VideoScreen = (props) =>{
    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.back}>
                <BackButton {...props} />
            </View>
            <Video source={video}  
            repeat={false}
            style={styles.backgroundVideo} 
            fullscreen={true}
            controls={true}
            /> 
        </SafeAreaView>
    );
}

//stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:'center',
    },
    backgroundVideo:{
        width:vw(width),
        height:vw(width),
        paddingHorizontal:vw(10),
        alignItems:'center',
        alignSelf:'center'  
    },
    back:{
        position:'absolute',
        top:Platform.OS === 'ios' ? vw(50): vw(30),
        left:Platform.OS === 'ios' ? vw(20) : vw(10)
    }

});