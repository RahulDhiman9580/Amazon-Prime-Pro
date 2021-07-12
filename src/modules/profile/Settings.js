import * as React from 'react'
import {StyleSheet,
        SafeAreaView,
        View,
        Text,
        TouchableOpacity,
        Dimensions,
        ScrollView,
        BackHandler,
        } from 'react-native'
import {useDispatch} from 'react-redux'

//custom imports
import {vw,vh} from '../../components/Dimension'
import {BackButton} from '../../components/BackButton' 
import {SwitchButton} from '../../components/Switch'
import { loggedIn } from '../onBoarding/authAction'


const {width} = Dimensions.get(`window`);

//export
export const Settings = (props) =>{
    const dispatch = useDispatch();
    const [isEnabledNoti, setIsEnabledNoti] = React.useState(false);
    const toggleSwitchNoti = () => setIsEnabledNoti(previousState => !previousState);

    const [isEnabledPlay, setIsEnabledPlay] = React.useState(false);
    const toggleSwitchPaly = () => setIsEnabledPlay(previousState => !previousState);

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    //onPressNavigate
    const onPressNavigate = (toRouter) =>{
        props.navigation.navigate(toRouter);
    }

    //onPressSignOut
    const onPressSignOut = (toRouter) =>{
        dispatch(loggedIn(false));
        props.navigation.replace(toRouter);
    }

    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerView}>
                <View style={styles.back} >
                    <BackButton {...props}/>
                </View>
                <View style={styles.settings}>
                <Text style={styles.settingTxt}>{`Settings`}</Text>
            </View>
            </View>
            
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity onPress={() => onPressNavigate('Stream')}>
                <View style={styles.cell}>
                    <Text style={styles.header}>{`Stream & Download`}</Text>
                    <Text style={styles.subHeader}>{`Manage quality and Wi-Fi`}</Text>
                </View> 
                </TouchableOpacity>

                <View style={styles.cell}>
                    
                    <Text style={styles.header}>{`Notifications`}</Text>
                    <Text style={styles.subHeader}>{isEnabledNoti ? `On` : `Off`}</Text>
                    <View style={styles.notiSwitch}>
                    <SwitchButton isEnabled={isEnabledNoti} toggleSwitch={toggleSwitchNoti} />
                    </View>
                  
                </View>  

                <View style={styles.cell}>
                    <Text style={styles.header}>{`Auto Play`}</Text>
                    <Text style={styles.subHeader}>{`Play the next episode automatically`}</Text>
                    <View style={styles.notiSwitch}>
                    <SwitchButton isEnabled={isEnabledPlay} toggleSwitch={toggleSwitchPaly} />
                    </View>
                </View> 

                <TouchableOpacity onPress={() => onPressNavigate('Parent')}>
                <View style={styles.cell}>
                    <Text style={styles.header}>{`Parental Control`}</Text>
                    <Text style={styles.subHeader}>{`Control what you can watch`}</Text>
                </View>  
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressSignOut('login')}>
                <View style={styles.cell}>
                    <Text style={styles.header}>{`Sign out`}</Text>
                </View>            
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onPressNavigate('About')}>    
                <View style={styles.cell}>
                    <Text style={styles.header}>{`About & Legal`}</Text>
                </View> 
                </TouchableOpacity> 
                <TouchableOpacity onPress={() => onPressNavigate('ContactUs')}>
                <View style={styles.cell}>
                    <Text style={styles.header}>{`Contact Us`}</Text>
                </View>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    );
}

//stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    headerView:{
        alignItems:'center',
        marginTop:vw(15),
        width:width,
        marginBottom:vh(10)
       // borderWidth:1
    },
    settings:{
        marginHorizontal:vw(15),
    },
    settingTxt:{
        fontSize:vw(20),
        //fontWeight:'bold',
        color:'#00AAE1',
        textAlign:'center',
        paddingBottom:vw(5)
    },
    back:{
        position:'absolute',
        top:vw(4),
        left:vw(15)
    },
    cell:{
        borderBottomWidth:1,
        marginHorizontal:vw(15),
        marginTop:vw(20),
        paddingBottom:vh(10),
        borderColor:"#999999"
    },
    header:{
        fontSize:vw(14),
        fontWeight:'bold'
    },
    subHeader:{
        fontSize:vw(11),
        marginTop:vw(2),
        color:'#999999'
    },
    notiSwitch:{
        position:'absolute',
        right:vw(10),
    }
});