import * as React from 'react'
import {SafeAreaView,
        FlatList,
        StyleSheet,
        Image,
        Text,
        ScrollView,
        View,
        TouchableOpacity,
        BackHandler
        } from 'react-native'
import {useRoute} from '@react-navigation/native';

//custom imports
import {vw,vh} from './Dimension'
import {FullListRender} from './FullListRender'
import {HeaderLogo} from './HeaderLogo'
import {BackButton} from './BackButton'

export const FullList = (props) =>{
  
    const route = useRoute();
    const movieData = props.route.params.movieData;

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])
    const renderItem = ({item, index}) =>{
        return(
            <FullListRender item={item} {...props} />
        );
    }

    //keyExtractor
    const keyExtractor = () => Math.random().toString();
    
    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerView}>
                <View style={styles.back}>
                    <BackButton {...props} />
                </View>
                <View style={{alignSelf:'center'}}>
                     <HeaderLogo width={150} height={40}/>
                </View>
            </View>
            
            <View style={styles.movieCountView}>
                <Text style={styles.countTxt}>{`Total `+movieData.length}</Text>
            </View>
            <FlatList  
            data={movieData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={2}
            extraData={movieData}
            maxToRenderPerBatch={8}
            initialNumToRender={8}
            windowSize={15}
            showsVerticalScrollIndicator={false}
             />
        </SafeAreaView>
    );
};

//stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        paddingHorizontal:vw(10)
    },
    headerView:{
        justifyContent:'center',
        marginTop:vh(20),
       // borderWidth:1
    },
    back:{
     position: 'absolute',
     left:vw(10)
    },
    renderView:{
        flex:1,
       // borderWidth:1,
        marginVertical:vh(10),
        marginLeft:vw(12)
      
    },
    img:{
        width:vw(160),
        height:vh(240),
        borderRadius:vw(10)
    },
    movieCountView:{
        marginLeft:vw(15),
        marginTop:vh(20)
    },
    countTxt:{
        color:'#999999',
        fontSize:vw(13),
        fontStyle:'italic'
    }
});