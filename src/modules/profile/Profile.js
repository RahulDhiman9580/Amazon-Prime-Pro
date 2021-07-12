import { transform } from '@babel/core'
import * as React from 'react'
import {SafeAreaView,
        View,
        StyleSheet,
        Image,
        TouchableOpacity,
        BackHandler,
        Text,Dimensions, FlatList, Animated, Platform, Modal} from 'react-native'
import { Easing } from 'react-native-reanimated'
import {useSelector} from 'react-redux'

//custom imports
import {vw,vh} from '../../components/Dimension'
import {HeaderLogo} from '../../components/HeaderLogo'
import {RenderItem} from '../download/RenderItem'

//image paths
const settingLogo = require('../../assets/settings.png')
const userImg = require('../../assets/profile.png')
const errorLogo = require('../../assets/error.png')

const {width,height} = Dimensions.get(`window`)

//export Home
export const Profile = (props) =>{

    const [visible, setVisible] = React.useState(false);
    const animVal = React.useRef(new Animated.Value(height)).current;
    const animValue1 = React.useRef(new Animated.Value(-height)).current;
    const {name,email,mobNumber} = useSelector((state) => state.authReducer);
    const {watchlist} = useSelector((state) => state.movieReducer);
    
    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    //animation
    React.useEffect(()=>{
        Animated.timing(animValue1,{
            toValue : 0,
            duration: 1000,
            easing : Easing.linear,
            useNativeDriver : true 
        }).start();
    })
    //animation
    React.useEffect(()=>{
        Animated.timing(animVal,{
            toValue : 0,
            duration: 1000,
            easing : Easing.linear,
            useNativeDriver : true
        }).start();
    })

    //renderItem
    const renderItem = ({item,index}) =>{
        return(
            <Animated.View style={[styles.renderView,{transform:[{translateX:animValue1}]}]}>
            <RenderItem item={item} index={index} reducer={'watchlist'} navigationProp={props}   />
            </Animated.View>
        );
    }

    //onPressNavigate
    const onPressNavigate = (toRoute) =>{
        props.navigation.navigate(toRoute);
    }

    //onPressSetVisibility
    const onPressSetVisibility = () =>{
        setVisible(!visible);
    }
   
    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={{flex:1}}>
            { visible ? 
            <Modal
            visible={visible}
            transparent={true}
            animationType={'fade'}
            onRequestClose={() => setVisible(false)}>
                
                <View style={styles.modalView}>
                    <View style={styles.modal}>
                        <View style={styles.imgHolder}>
                            <Image source={userImg} style={styles.image}/>
                        </View>
                        <View style={styles.txtHolder}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={{marginTop:vw(20), alignSelf:'center'}}><Text style={styles.emailouter}>{`E-mail Id : `}</Text><Text style={styles.email}>{email.toLowerCase()}</Text></Text>
                            <Text style={{marginTop:vw(20), alignSelf:'center'}}><Text style={styles.emailouter}>{`Mobile Number : `}</Text><Text style={styles.email}>{mobNumber.toLowerCase()}</Text></Text>
                            
                            <Text style={styles.close} onPress={() => setVisible(!visible)}>{`Close`}</Text>
                        </View>
                    </View>
                </View>
                
            </Modal>
             : null}
            <Animated.View style={[styles.headerContainer,{transform:[{translateX:animValue1}]}]}>
                <View style={styles.headerLogo}>
                    <HeaderLogo width={150} height={60} />
                </View>
                <View style={styles.settingView}>
                    <TouchableOpacity onPress={() => onPressNavigate('Settings') } >
                        <Image source={settingLogo} style={styles.settingImg} />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.userView}>
                <TouchableOpacity onPress={() => onPressSetVisibility()}>
                    <Image source={userImg} style={styles.userImg} />
                </TouchableOpacity>
                </View>
                
            </Animated.View>
            <Animated.View style={[styles.watchHeaderView,,{transform:[{translateY:animValue1}]}]}>
                    <Text style={styles.watchHeader}>{`Watchlist`}</Text>
            </Animated.View>
            {
                watchlist.length != 0 ?
            <View style={styles.flatList}>
                <FlatList
                data={watchlist} 
                keyExtractor={() => 'watch'.concat(Math.random())}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                />
            </View> : 
            <Animated.View style={[styles.errorView,{transform : [{translateY:animVal}]}]}>
                    <Image source={errorLogo} style={styles.errorLogo} />
                    <Text style={styles.errorTxt}>{`No WatchList`}</Text>
            </Animated.View>
            }
            </View>
        </SafeAreaView>
    );
}
//stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    headerContainer:{
        marginTop:vw(20),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        //borderWidth:1
    },
    headerLogo:{
        alignSelf:'center'
    },
    settingImg:{
        width:vw(22),
        height:vw(22),
        tintColor:'#232F3E'
    },
    settingView:{
        position:'absolute',
        right:vw(15)
    },
    watchHeaderView:{
        alignSelf:'center',
        marginTop:vw(10),
        borderBottomWidth:1,
        width:width,
        borderColor:'#999999'
    },
    watchHeader:{
        fontSize:vw(18),
        color:'#00AAE1',
        textAlign:'center',
        paddingBottom:vh(5),
    },
    errorLogo:{
        width:vw(80),
        height:vw(80),
    },
    errorView:{
        backgroundColor:'#232F3E',
        width:vw(300),
        height:vw(300),
        borderRadius:vw(height/2),
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        alignSelf:'center',
        top:vh(height/3)
    },
    errorTxt:{
        color:'white',
        fontWeight:'bold',
        fontSize:vw(16),
        marginTop:vw(20)
    },
    renderView:{
        alignItems:'center',
        backgroundColor:'#232F3E',
        paddingHorizontal:vw(15),
        paddingVertical:vh(10),
        marginHorizontal:vw(10),
        borderRadius:vw(10),
        marginVertical:vh(10),
        flexDirection:'row',
        shadowColor: "white",
    shadowOffset: {
        width: 0,
        height: -5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    
    elevation: Platform.OS === 'ios' ? 6 : -10,
    },
    userImg:{
        width:vw(40),
        height:vw(40),
    },
    userView:{
        position:'absolute',
        left:vw(10),
        bottom:vw(13)
    },
    modalView:{
        backgroundColor:'#99999970',
        flex:1
    },
    modal:{
      flex:Platform.OS === 'ios' ? 0.55 : 0.59,
       //paddingVertical:vw(20),
        marginTop:vw(width/1.5),
        marginHorizontal:vw(width/15),
        borderRadius:vw(20),
        backgroundColor:'white'
    },
    image:{
        width:vw(90),
        height:vw(90),
    },
    imgHolder:{
        borderRadius:vw(width/2),
        //backgroundColor:'white',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:vw(-50)
    },
    txtHolder:{
        marginHorizontal:vw(20),
        marginTop:vw(20),
       // borderWidth:1,
        flex:1,
        justifyContent:'center'
    },
    name:{
        alignSelf:'center',
        fontSize:vw(17),
        color:'#00AAE1',
        fontWeight:'bold'
    },
    email:{
        fontSize:vw(13),
        marginTop:vw(15),
        alignSelf:'center',
    },
    emailouter:{
        fontSize:vw(13),
        marginTop:vw(15),
        alignSelf:'center',
        color:'#232F3E',
        fontWeight:'bold'
    },
    close:{
        alignSelf:'center',
        fontSize:vw(15.5),
        marginTop:vw(60),
        color:'#00AAE1'
    }

    

});