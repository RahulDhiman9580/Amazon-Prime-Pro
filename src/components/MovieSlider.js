import * as React from 'react'
import {View, 
        StyleSheet,
        TouchableOpacity,
        Image,
        Text,
        FlatList} from 'react-native'
import {useRoute} from '@react-navigation/native';

//custom import 
import {vw,vh} from './Dimension'
import {MovieSliderRender} from './MovieSliderRender'

//image path
const arrow = require('../assets/images/arrow-point-to-right.png');

//export MovieSlider
export const MovieSlider = (props) =>{
    const route = useRoute(); 
    //customRenderItem
    const customRenderItem = ({item,index}) => {
        
        return(
            <View style={styles.container2}>
               <MovieSliderRender {...props} item={item}  />
            </View>
        );
    }
    //keyExtractor
    const keyExtractor = (index) => index.toString().concat(Math.random()).toString();

    return(
        <View>
            { 
            (props.data != undefined ) ?
            <View>
            <TouchableOpacity onPress={() => props.navigation.navigate('fullList',{movieData : props.data})}>
            <View style={styles.container1}>
                <Text style={styles.headerTxt}>{props.headerTxt}</Text>
                <Image source={arrow} style={styles.arrow} />
            </View>
            </TouchableOpacity>
            <View style={styles.listHolder}>
                <FlatList
                data={props.data}
                renderItem={customRenderItem}
                keyExtractor={keyExtractor}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                extraData={props.data}
                initialNumToRender={6}
                maxToRenderPerBatch={6}
                windowSize={15}
                 />
            </View>
            </View>
            : null
            }
        </View>
        
    );
};

//stylesheet
const styles = StyleSheet.create({
    headerTxt:{
        fontSize:vw(18),
        color:'#232F3E',
        fontWeight:'bold',
    },
    container1:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:vh(10),
    },
    arrow:{
        width:vw(15),
        height:vh(15),
        tintColor:'#232F3E',
        marginLeft:vw(5)
    },
    container2:{
       // borderWidth:1,
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