import * as React from 'react'
import {StyleSheet, Image} from 'react-native'

//custom imports
import {vw,vh} from './Dimension'

//image paths
const imgPath = require('../assets/images/prime-video-logo.png');

//export HeaderLogo
export const HeaderLogo = (props) =>{

    return(
        <Image source={imgPath}  style={[styles.img, {width:vw(props.width ?? 200 ), height:vw(props.height ?? 50)}]}/>
    );
}

//stylesheet
const styles = StyleSheet.create({

});