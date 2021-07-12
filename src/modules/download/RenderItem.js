import * as React from 'react'
import {SafeAreaView,
        View,
        StyleSheet,
        Text,Image,TouchableOpacity} from 'react-native'
import {useDispatch} from 'react-redux'

//custom imports
import {vw,vh} from '../../components/Dimension'
import {deleteDownload} from '../home/movieAction'
import {deleteWatchList} from '../home/movieAction'

//constants
const bin = require('../../assets/bin.png')
const playImg = require('../../assets/images/bottomTab/play-button.png')

export const RenderItem = (props) =>{
    const dispatch = useDispatch();
    return(
        <>
        <TouchableOpacity style={styles.button} onPress={() => props.reducer === 'watchlist' ? dispatch(deleteWatchList(props.index)) : dispatch(deleteDownload(props.index))} >
        <Image source={bin} style={styles.bin}/>
        </TouchableOpacity>
                 <View style={styles.imageHolder}>
                    <Image source={{uri : `https://image.tmdb.org/t/p/original${props.item.backdrop_path}`}} style={styles.img} />
                    <TouchableOpacity style={styles.playButton} onPress={() => props.navigationProp.navigation.navigate('Video')} >
                        <Image source={playImg} style={styles.playImg} />
                    </TouchableOpacity>
                </View>
                <View style={styles.detailHolder}>
                    <Text style={styles.title}>{props.item.title ?? props.item.name}</Text>
                    <Text style={styles.rating}>{`IMDB rating ${props.item.vote_average}`}</Text>
                    <Text style={styles.date}>{`Release Date : ${props.item.release_date}`}</Text>
                </View>
            </>
    );
}

//stylesheet
const styles = StyleSheet.create({
    img:{
        width:vw(120),
        height:vw(100),
        borderRadius:vw(15),
    },
    detailHolder:{
        justifyContent:'center',
        marginLeft:vw(20),
        width:vw(160),
    },
    title:{
        fontSize:vw(15),
        width:vw(120),
        color:'#00AAE1',
        fontWeight:'bold',
    },
    rating:{
        fontSize:vw(12),
        fontStyle:'italic',
        marginTop:vh(5),
        color:'#808080'
    },
    date:{
        fontSize:vw(12),
        fontStyle:'italic',
        marginTop:vh(10),
        color:'#808080'
    },
    bin:{
        width:vw(18),
        height:vw(18),
        tintColor:'white'
    },
    button:{
        position:'absolute',
        right:vw(14),
        top:vh(14),
    },
    playImg:{
        width:vw(60),
        height:vw(60),
        tintColor:'#232F3E'
    },
    playButton:{
        position:'absolute',
        alignSelf:'center',
        top:vw(18),
    }
});