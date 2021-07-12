import * as React from 'react'
import {StyleSheet,
        SafeAreaView,
        View,
        Text,
        Dimensions,
        BackHandler,
        } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

//custom imports
import {vw,vh} from '../../components/Dimension'
import {BackButton} from '../../components/BackButton' 
import {SwitchButton} from '../../components/Switch'

//constants
const {width} = Dimensions.get(`window`);

//export
export const StreamAndDownload = (props) =>{

    const [isEnabledNoti, setIsEnabledNoti] = React.useState(false);
    const toggleSwitchNoti = () => setIsEnabledNoti(previousState => !previousState);

    const [isEnabledPlay, setIsEnabledPlay] = React.useState(false);
    const toggleSwitchPaly = () => setIsEnabledPlay(previousState => !previousState);

    const [isEnabledStream, setIsEnabledStream] = React.useState(false);
    const toggleSwitchStream = () => setIsEnabledStream(previousState => !previousState);

    const [isEnabledData, setIsEnabledData] = React.useState(false);
    const toggleSwitchData = () => setIsEnabledData(previousState => !previousState);

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerView}>
                <View style={styles.back} >
                    <BackButton {...props}/>
                </View>
                <View style={styles.settings}>
                <Text style={styles.settingTxt}>{`Stream and Downloads`}</Text>
            </View>
            </View>
            
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
                <View style={styles.cell}>
                    <Text style={styles.header}>{`Streaming Quality`}</Text>
                    <Text style={styles.subHeader}>{`Good, Use Highest quality when on Wi-Fi`}</Text>
                </View> 

                <View style={styles.cell}>
                    <Text style={styles.header}>{`Download Quality`}</Text>
                    <Text style={styles.subHeader}>{`Always ask`}</Text>
                </View> 

                <View style={styles.cell}>
                    <Text style={styles.header}>{`Cast data usage`}</Text>
                    <Text style={styles.subHeader}>{`Unlimited`}</Text>
                </View> 

                <View style={styles.cell}> 
                    <Text style={styles.header}>{`Download on Wi-Fi only`}</Text>
                    <View style={styles.notiSwitch}>
                    <SwitchButton isEnabled={isEnabledNoti} toggleSwitch={toggleSwitchNoti} />
                    </View>
                </View>  

                <View style={styles.cell}> 
                    <Text style={styles.header}>{`Stream on Wi-Fi only`}</Text>
                    <View style={styles.notiSwitch}>
                    <SwitchButton isEnabled={isEnabledStream} toggleSwitch={toggleSwitchStream} />
                    </View>
                </View>  

                <View style={styles.cell}> 
                    <Text style={styles.header}>{`Notify when watching on mobile data`}</Text>
                    <View style={styles.notiSwitch}>
                    <SwitchButton isEnabled={isEnabledData} toggleSwitch={toggleSwitchData} />
                    </View>
                </View>  

                <View style={styles.cell}> 
                    <Text style={styles.header}>{`Auto Download`}</Text>
                    <Text style={styles.subHeader}>{isEnabledPlay ? `On` : `Off`}</Text>
                    <View style={styles.notiSwitch}>
                    <SwitchButton isEnabled={isEnabledPlay} toggleSwitch={toggleSwitchPaly} />
                    </View>
                </View>  
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
        paddingBottom:vw(10)
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
        paddingBottom:vh(20),
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
        bottom:vw(12)
    }
});