import * as React from 'react'
import {TouchableOpacity,Image,StyleSheet} from 'react-native'
import {useDispatch} from 'react-redux'
//custom imports
import {vw,vh} from './Dimension'
import {addSeason} from '../modules/home/movieAction'

//image path
const back = require('../assets/images/ic-back-btn.png')

//export BackButton
export const BackButton = (props) =>{
    const dispatch = useDispatch();
    return(
        <TouchableOpacity style={styles.button} onPress={() => {props.navigation.goBack(); dispatch(addSeason(1))}}>
            <Image source={back} style={styles.img} />
        </TouchableOpacity>
    );
}

//styelsheet
const styles = StyleSheet.create({
    button:{
        width:vw(20),
        height:vw(20)
    },
    img:{
        width:vw(20),
        height:vw(20)
    }
});