import * as React from 'react'
import {View,SafeAreaView,StyleSheet,Text, BackHandler} from 'react-native'
import {useDispatch} from 'react-redux'

//custom imports
import {vw,vh} from '../../components/Dimension'
import {BackButton} from '../../components/BackButton'
import {HeaderLogo} from '../../components/HeaderLogo'
import {CustomInput} from '../../components/CustomInput'
import {CustomButton} from '../../components/CustomButton'
import {PopUpModal} from '../../components/PopUpModal'
import {resetPass} from './authAction'

//image path
const errorLogo = require('../../assets/images/error.png');
const succLogo = require('../../assets/images/icCheckGreen.png');

//export ResetPassword
export const ResetPassword = (props) =>{
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const dispatch = useDispatch();
    const [toggle, setOnToggle] = React.useState(true);
    const [navigate,setNavigate] = React.useState('false');
    const [disableButton, setDisableButton] = React.useState(true);
    const [inputHolder, setInputHolder] = React.useState('');
    const [modalObject,setModalObject] = React.useState({
        visible : false,
        modalTitle : '',
        modalBody : '',
        logoImage : ''
         });
    const inputRef = React.useRef();

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])
    //handleOnPressForward
    const handleOnPressForward = () =>{

        //password must have : Minimum eight characters, at least one letter and one number

        //correct password setting
        if(passRegex.test(inputHolder)){
            setModalObject({
                visible:true,
                modalTitle:'Successfull',
                modalBody:'Successfully Reset the password.',
                logoImage:succLogo
            });
            setNavigate(true);
        } 
        //wrong password format entered
         else{
            setModalObject({
                visible:true,
                modalTitle:'Waring',
                modalBody:`Your password must have: \n 1. Minimun eight characters \n 2. Atleast one letter and one number.`,
                logoImage:errorLogo
            });
            inputRef.current.clear();
            setInputHolder('');
         }
     }

     //callBackHandler
     const callBackHandler = () =>{
        setModalObject({
        visible : false,
        modalTitle : '',
        modalBody : '',
        logoImage : ''
         });
         if(navigate === true)
         {
             props.navigation.navigate('login');
             dispatch(resetPass(inputHolder));
             inputRef.current.clear();
             setInputHolder('');
             setNavigate(false);
         }
     }
    

    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.backView}>
                <BackButton {...props}/>
            </View>
            <View style={styles.headerView}>
                <HeaderLogo  />  
            </View>
            <View style={styles.bodyView}>
                <Text style={styles.body}>{`Please enter a new password for you account`}</Text>
            </View>
            <View style={styles.inputView}>
                <CustomInput placeHolder={'Password'} 
                secure={toggle}
                onToggle={()=>setOnToggle(!toggle)}
                onTextChange={(val) => {
                val === '' ? setDisableButton(true) : setDisableButton(false);
                setInputHolder(val)}}
                refer={inputRef}/>
            </View>
            <View style={styles.forwardButton}>
                <CustomButton 
                disabled={disableButton} 
                onPressSubmit={() => handleOnPressForward()}
                title={`Submit`} />
            </View>
            { modalObject.visible &&
                <PopUpModal item={modalObject} handleCallBack={()=>callBackHandler()}/>
                }
        </SafeAreaView>
    );
}

//Stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'white'
    },
    backView:{
        marginLeft:vw(15),
        marginTop:vh(32),
    },
    headerView:{
        marginTop:vh(47.5),
        alignSelf:'center'
    },
    bodyView:{
        width:vw(307),
        marginLeft:vw(30),
        marginTop:vh(40)
    },
    body:{
        fontSize:vw(14),
        color:'rgb(89,89,89)',
    },
    inputView:{
        marginLeft:vw(30),
        marginTop:vh(25)
    },
    timmer:{
        color:'rgb(45,190,123)',
        fontSize:vw(14),
        fontWeight:'bold',
        marginLeft:vw(75.5),
        marginTop:vh(15)
    },
    resendButton:{
        marginLeft:vw(30),
        marginTop:vh(25)
    },
    forwardButton:{
        paddingHorizontal:vw(25)
    }
});