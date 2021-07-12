import * as React from 'react';
import {View, FlatList, Image, Text, StyleSheet, Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

//custom imports
import {vw,vh} from './Dimension'
const play = require('../assets/images/bottomTab/play-button.png')
const {width,height} = Dimensions.get(`window`);

export const MovieSliderRender = (props) =>{
    return(
        <View style={styles.container2}>
                <TouchableOpacity onPress={() => {props.navigation.push('movieDetail',{routeData : props.item, routeName : props.route.name})}}>
                    <Image  source={{uri : `https://image.tmdb.org/t/p/original${props.item.poster_path}`}} style={[styles.img,props.headerTxt==='Upcoming Movies' || props.headerTxt==='Popular Shows' ? {width:vw(180),height:vh(250)} : {}]} />
                </TouchableOpacity>
         </View>
    );
}

const styles = StyleSheet.create({
    container2:{
         borderRadius:vw(5),
         paddingHorizontal:vw(5),
         marginBottom:vh(10)
     },
     img:{
         width:vw(105),
         height:vh(150),
         borderRadius:vw(5),
         marginHorizontal:vw(1),
     },
});