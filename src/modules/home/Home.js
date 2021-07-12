import * as React from 'react'
import {SafeAreaView,
        View,
        StyleSheet,
        ScrollView,
        Text} from 'react-native'

//custom imports
import {vw,vh} from '../../components/Dimension'
import {HeaderLogo} from '../../components/HeaderLogo'
import { TopTab } from './topTab/TopTab'


//export Home
export const Home = (props) =>{

   

    return(
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={styles.scrollView} 
            showsVerticalScrollIndicator={false}>
            <View style={styles.headerLogo}>
                <HeaderLogo width={150} height={40}/>
            </View>
            <View style={styles.topTabView}>
                <TopTab/>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}
//stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        // backgroundColor:'white',
        paddingHorizontal:vw(10)
    },
    scrollView:{
        flex:1
    },
    headerLogo:{
        alignSelf:'center',
        marginTop:vh(20)
    },
    topTabView:{
        flex:1,
        marginTop:vh(15),
        paddingHorizontal:vw(5)
    }
});