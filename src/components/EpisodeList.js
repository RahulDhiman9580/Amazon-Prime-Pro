import * as React from 'react';
import {View, FlatList, Image, Text, StyleSheet, Dimensions, ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

//custom imports
import {vw,vh} from './Dimension'
import {EpisodeRender} from './EpisodeRender'

const {width,height} = Dimensions.get(`window`);
const play = require('../assets/images/bottomTab/play-button.png')
//export EpisodeList
export const EpisodeList = (props) =>{
    
    //renderItem
    const renderItem = ({item, index}) =>{
        return(
            <View style={styles.renderView}>
               <EpisodeRender {...props} item={item}  />
            </View>
        );
    }

    return(
        <View style={props.data !== undefined ? (props.data.length >= 5 ? styles.mainContainer : styles.mainContainer1 ) : {height:vw(height/10),
            marginBottom:vw(20)}}>
            <Text style={styles.header}>{`Episodes`}</Text>
           
            { props.data != undefined ? 
            <FlatList 
            nestedScrollEnabled={true}
            data={props.data}
            keyExtractor={(index) => 'episodes'.concat(Math.random()).concat(index)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            listKey={'list'.concat(Math.random())}
            scrollEnabled={true}
              />
              : <Text style={styles.epiTxt}>{`Episodes coming soon.`}</Text>
            }
           
        </View>
    );
}

//stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        height:vw(height/2.2),
        marginBottom:vw(20),
        //borderWidth:1
    },
    mainContainer1:{
        marginBottom:vw(20)
    },
    renderView:{
        marginVertical:vh(5),
        marginLeft:vw(15),
        flexDirection:'row',
        alignItems:'center',
        //borderWidth:1
    },
    episodeLogo:{
        width:vw(60),
        height:vw(60),
        borderRadius:vw(width/2)
    },
    header:{
        fontSize:vw(18),
        color:'#232F3E',
        fontWeight:'bold',
        marginTop:vh(10),
        marginLeft:vw(15),
        marginBottom:vw(20)
    },
    epiTxt:{
        fontSize:vw(12),
        color:'#919191',
        textAlign:'center'
    }
    
});