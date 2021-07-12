import * as React from 'react'
import {Modal,
        StyleSheet,
        Image,
        Text,
        View,
    SafeAreaView} from 'react-native'

//custom imports
import {vw,vh} from './Dimension'

//image paths


//export CustomModal
export const PopUpModal = (props) =>{
    
    //onPressOk
    const onPressOk = () =>{
        props.handleCallBack();
    }

    return(
      
        <Modal 
        transparent={true}
        animationType={'fade'}
        visible={props.item.visible}>
            <View style={styles.mainView}>
                <View style={styles.mainConatiner}>
                    <Image source={props.item.logoImage} style={styles.logoImage} />
                    <Text style={styles.title}>{props.item.modalTitle}</Text>
                    <Text style={styles.body}>{props.item.modalBody}</Text>
                    <Text style={styles.okButton} onPress={() => onPressOk() }>{'Okay'}</Text>
                </View>
            </View>
        </Modal>
    
    );
}

//StyleSheet
const styles = StyleSheet.create({
    mainView:{
        flex:1,
        backgroundColor:'#03030380',
        justifyContent:'center'
    },
    mainConatiner:{
        width:vw(325),
        height:vw(300),
        alignSelf:'center',
        backgroundColor:'white',
        alignItems:'center',
        borderRadius:vh(10)
    },
    logoImage:{
        width:vw(80),
        height:vw(80),
        marginTop:vh(36),
    },
    title:{
        fontSize:vw(16),
        fontWeight:'bold',
        marginTop:vh(25)
    },
    body:{
        textAlign:'center',
        color:'rgb(89,89,89)',
        fontSize:vw(14),
        marginTop:vh(14.5),
        width:vw(236)
    },
    okButton:{
        color:'#232F3E',
        fontSize:vw(16),
        fontWeight:'bold',
        marginTop:vh(24.4)
    }
});