import * as React from 'react'
import {StyleSheet,
        SafeAreaView,
        View,
        Text,
        Dimensions,
        BackHandler
        } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

//custom imports
import {vw,vh} from '../../components/Dimension'
import {BackButton} from '../../components/BackButton' 


const {width} = Dimensions.get(`window`);

//export
export const ContactUs = (props) =>{

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
                <Text style={styles.settingTxt}>{`Contact Us`}</Text>
            </View>
            </View>
            
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
                <View style={styles.cell}>
                    <Text style={styles.header}>{`Phone Number`}</Text>
                    <Text style={styles.subHeader}>{`+91-9815272884`}</Text>
                </View> 
                <View style={styles.cell}>
                    <Text style={styles.header}>{`Email Us at`}</Text>
                    <Text style={styles.subHeader}>{`rahul.dhiman@appinventiv.com`}</Text>
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