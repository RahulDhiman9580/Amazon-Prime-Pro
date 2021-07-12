import * as React from'react'
import {TouchableOpacity,
        Text,
        StyleSheet,
        View}
         from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

//custom imports
import {vw,vh} from './Dimension'


//export CustomButton
export const CustomButton = (props) =>{
   
    return(
        <LinearGradient
        colors={['#00A8E1','#232F3E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}
        >
        <View style={{backgroundColor: props.disabled ? '#ffffff90' : null}}>
        <TouchableOpacity style={styles.button} 
        onPress={()=>props.onPressSubmit()}
        disabled={props.disabled}
        >
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
        </View>
        </LinearGradient>
    );
}

//Stylesheet
const styles = StyleSheet.create({
    linearGradient:{
        marginTop:vh(25),
        borderRadius:vw(5)
    },
    button:{
        width:vw(315),
        alignSelf:'center',
        height:vw(45),
        borderRadius:vw(5),
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        color:'white',
        fontSize:vw(15),
        fontWeight:'bold'
    }

    
});