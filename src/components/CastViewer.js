import * as React from 'react'
import {StyleSheet,
        View,
        Text,
        FlatList,
        Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

//custom imports
import {vw,vh} from './Dimension'
import {castData} from '../dummyData/castData'


export const CastViewer = () =>{

    
    //renderItem
    const renderItem = ({item,index}) =>{
        return(
            <View style={styles.renderView}>
            <Image source={{uri : item}} style={styles.img} />
            <LinearGradient
                colors={['transparent', 'rgba(255,255,255,0.9)']}
                style={styles.absolute}
                >
                    <View style={{width:vw(100),height:vh(50)}}></View>
                </LinearGradient>
            </View>
        );
    }

    return(
        <View style={StyleSheet.mainContainer}> 
            <FlatList
            data={castData}
            renderItem={renderItem}
            keyExtractor={() => 'cast'.concat(Math.random()).toString()}   
            numColumns={3}
            extraData={castData}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            />
        </View>
    );
}
//stylesheet
const styles = StyleSheet.create({
    img:{
        width:vw(100),
        height:vh(150),
        alignSelf:'center',
        borderRadius:vw(5)
    },
    mainContainer:{
        alignItems:'center',
        paddingLeft:vw(15),
        marginTop:vh(20),
        flex:1
    },
    renderView:{
       marginHorizontal:vw(12),
       marginVertical:vh(10)
    },
    absolute:{
        position:'absolute',
        bottom:0
    }
});