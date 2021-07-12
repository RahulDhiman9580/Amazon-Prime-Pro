import * as React from 'react';
import {View, FlatList, Image, Text, StyleSheet, Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

//custom imports
import {vw,vh} from './Dimension'
const play = require('../assets/images/bottomTab/play-button.png')
const {width,height} = Dimensions.get(`window`);

export const EpisodeRender = (props) =>{
    return(
        <View style={styles.renderView}>
        <Image source={props.item.still_path === null ? {uri : `https://image.tmdb.org/t/p/original${props.episodeImage}`} : {uri: `https://image.tmdb.org/t/p/original${props.item.still_path}`}}
        style={styles.episodeLogo}   />
        <View style={styles.episodeHolder}>
            <Text style={styles.episodeNumber}>{`Episode ${props.item.episode_number}`}</Text>
            <Text style={styles.episodeName}>{`${props.item.name}`}</Text>
        </View>
        <View style={styles.playHolder}>
            <TouchableOpacity style={styles.playButton}>
                <Image source={play} style={styles.playImg} />
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    episodeHolder:{
        justifyContent:'center',
        marginLeft:vw(10),
        width:vw(250),
        //borderWidth:1
    },
    episodeNumber:{
        fontSize:vw(14),
        color:'#919191'
    },
    episodeName:{
        fontSize:vw(12),
        color:'#919191'
    },
    playImg:{
        width:vw(25),
        height:vw(25),
        tintColor:'#00A8E1'
    },
    playButton:{
        //borderWidth:1,
    },
    playHolder:{
        //borderWidth:1,
    },
    epiTxt:{
        fontSize:vw(12),
        color:'#919191',
        textAlign:'center'
    },
    renderView:{
        flexDirection:'row',
        alignItems:'center'
    },
    episodeLogo:{
        width:vw(60),
        height:vw(60),
        borderRadius:vw(width/2)
    },
});