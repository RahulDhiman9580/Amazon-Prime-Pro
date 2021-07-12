import * as React from 'react';
import {View, FlatList, Image, Text, StyleSheet, Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

//custom imports
import {vw,vh} from './Dimension'
const play = require('../assets/images/bottomTab/play-button.png')
const {width,height} = Dimensions.get(`window`);

export const FullListRender = (props) =>{
    return(
        <View style={styles.renderView}>
                <TouchableOpacity onPress={() => {props.navigation.push('movieDetail',{routeData : props.item, routeName : props.route.name})}}>
                    <Image source={{uri : `https://image.tmdb.org/t/p/original${props.item.poster_path}`}} style={[styles.img]}   />
                </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    img:{
        width:vw(160),
        height:vh(240),
        borderRadius:vw(10)
    },
    renderView:{
        flex:1,
       // borderWidth:1,
        marginVertical:vh(10),
        marginLeft:vw(12)
      
    },
});