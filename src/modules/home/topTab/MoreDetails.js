import * as React from 'react'
import {StyleSheet,
        View,
        Text,
        SafeAreaView
        } from 'react-native'

//custom imports
import {vw,vh} from '../../../components/Dimension'

export const MoreDetails = (props) =>{
    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.header}>{`Genres`}</Text>
                <Text style={styles.subHeader}>{`Drama | Romance | Thriller`}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>{`Directors`}</Text>
                <Text style={styles.subHeader}>{`Amit Masurkar | Rahul Dhiman`}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>{`Starring`}</Text>
                <Text style={styles.subHeader}>{`Vidya Balan | Sharat Saxena | Vijay Raaz`}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>{`Support Team`}</Text>
                <Text style={styles.subHeader}>{`Neeraj Kabi | Brjinder Kala | Mukul Chadda | Ila Arun`}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>{`Studios`}</Text>
                <Text style={styles.subHeader}>{`Abundanti Entertainments | T series | Critical Mass Films`}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>{`Maturity`}</Text>
                <Text style={styles.subHeader}>{`U/A 13+`}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>{`Viewing Rights`}</Text>
                <Text style={styles.subHeader}>{`Prime Video titles are available for streaming by tapping Watch Now if you're an Amazon Prime Member`
                +`. You can Download Prime Videos title as long as it remains in Prime Videos.`}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>{`Customer Reviews`}</Text>
                <Text style={styles.subHeader}>{`We don't have any customer reviews.`}</Text>
            </View>
        </SafeAreaView>
    );
}
//stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        paddingHorizontal:vw(20),
    },
    container:{
        marginTop:vh(20),
        borderBottomWidth:1,
        paddingBottom:vh(15),
        borderColor:'#adadad'
    },
    header:{
        color:'#232F3E',
        fontSize:vw(13),
        fontWeight:'bold'
    },
    subHeader:{
        fontSize:vw(12),
        color:'#00A8E1',
        marginTop:vh(5)
    }

});