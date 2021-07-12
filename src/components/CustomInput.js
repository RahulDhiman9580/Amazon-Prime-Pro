import * as React from 'react'
import {TextInput,
        View,
        StyleSheet,
        TouchableOpacity,
        Image, Platform, Dimensions} from 'react-native'

//custom import
import {vw,vh} from './Dimension'

const {width,height} = Dimensions.get(`window`);
//image paths
const eyeEnable = require('../assets/images/eyeEnable.png');
const eyeDisabled = require('../assets/images/eyeDisable.png');

//export CustomInput
export const CustomInput  = (props) =>{

    //TextInput style
            const [inputText, setInputText] = React.useState( {
            backgroundColor:'rgb(244,244,244)',
            width: vw(315),
            height:vh(width/7.9),
            paddingVertical:vw(10),
            paddingLeft:vw(14),
            marginTop:vh(15),
            fontSize:vw(13),
            borderRadius:vw(5),
            color:'black'
            });
    const onFocus = () =>{
       
            setInputText({
            backgroundColor:'rgb(244,244,244)',
            width: vw(315),
            height:vh(width/7.9),
            paddingVertical:vw(10),
            paddingLeft:vw(14),
            marginTop:vh(15),
            borderRadius:vw(5),
            borderWidth:1,
            borderColor:'#00A8E1',
            fontSize:vw(12),
            color:'black'
        })
}

    const onBlur = () =>{
           setInputText({
            backgroundColor:'rgb(244,244,244)',
            width: vw(315),
            height:vh(width/7.9),
            paddingVertical:vh(16),
            paddingLeft:vw(14),
            marginTop:vh(15),
            borderRadius:vw(5),
            fontSize:vw(13),
            color:'black'
            });
            props.onBlur;
    }
 
    return(
        <View style={styles.mainContainer}>
            <TextInput
            placeholder={props.placeHolder}
            style={inputText} 
            placeholderTextColor="#999999"
            secureTextEntry={props.secure}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={props.maxLength}
            onChangeText={props.onTextChange}
            ref={props.refer}
            value={props.value}
            onSubmitEditing={() => props.onSubmit ? props.onSubmit() : {}}
            keyboardType={props.keyboardType}
            />
            {
            (props.placeHolder === 'Password' || props.placeHolder === 'Create Password') && 
            <TouchableOpacity style={styles.touchable} onPress={() => props.onToggle()}>
                <Image source={ props.secure === true ? eyeDisabled : eyeEnable} style={styles.eye}/>
            </TouchableOpacity>
            }
        </View>
    );
}

//Stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:'center',
        marginTop:vh(10)
    },
    touchable:{
        width:vw(35.5),
        height:vh(27.5),
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        left:vw(275),
        top:vw(24)
    },
    eye:{
        width:vw(20),
        height:vh(20)
    }
});