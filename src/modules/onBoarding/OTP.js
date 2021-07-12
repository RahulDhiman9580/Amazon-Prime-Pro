import * as React from 'react'
import {View,SafeAreaView,StyleSheet,Text,TouchableOpacity,BackHandler} from 'react-native'

//custom imports
import {vw,vh} from '../../components/Dimension'
import {BackButton} from '../../components/BackButton'
import {CustomInput} from '../../components/CustomInput'
import {HeaderLogo} from '../../components/HeaderLogo'
import {PopUpModal} from '../../components/PopUpModal'
import { CustomButton } from '../../components/CustomButton'

//image path
const errorLogo = require('../../assets/images/error.png');
const succLogo = require('../../assets/images/icCheckGreen.png');

//export OTP
export const OTP = (props) =>{
    const INITIAL_MIN = 1;
    const INITIAL_SEC = 5;
    const NEXT_ROUTE = props.route.params.nextRoute;
    const [minutes, setMinutes ] = React.useState(INITIAL_MIN);
    const [seconds, setSeconds ] =  React.useState(INITIAL_SEC);
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
    

    //timer function
    React.useEffect(()=>{
        let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
            },1000)
            return ()=> {
                clearInterval(myInterval);
              };
        },[seconds]);
   
    //handleOnPressForward
    const handleOnPressForward = () =>{
        /*
            - if this screen been navigated from 'SignUp' then it has to navigate to SignIn,
              otherwise to Reset Password.
            - So for this we have passed nextRoute as params in this screen.
        */
     
        //correct otp entered (=>958031<=)
        if(inputHolder === '958031'){
            if(NEXT_ROUTE === 'login')
            {   setModalObject({
                visible:true,
                modalTitle:'Successful',
                modalBody:'Your account has been created successfully.',
                logoImage:succLogo
            });
            }
            else{
                inputRef.current.clear();
                setInputHolder('');
                props.navigation.navigate(NEXT_ROUTE);
            }
        } 
        //wrong otp entered
         else{
            setModalObject({
                visible:true,
                modalTitle:'Wrong OTP',
                modalBody:'Please enter the correct OTP.',
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
        if(inputHolder === '958031')
        {
            inputRef.current.clear();
            setInputHolder('');
            props.navigation.popToTop();
        }
     }
    
    //resend style
    const resend = {
        fontSize:vw(15),
        fontWeight:'bold',
        color: (minutes === 0 && seconds === 0 ?  '#00A8E1' :'rgb(191,191,191)')
    }

    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.backView}>
                <BackButton {...props}/>
            </View>
            <View style={styles.headerView}>
                <HeaderLogo title="OTP Verification" />
                {   minutes === 0 && seconds === 0 ? null :
                    <Text style={styles.timmer}>{'0'}{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</Text>
                }       
            </View>
            <View style={styles.bodyView}>
                <Text style={styles.body}>{`Please enter the 6 digit verification code sent to you on ${props.route.params.mobNumber}`}</Text>
            </View>
            <View style={styles.inputView}>
                <CustomInput placeHolder={'Enter OTP'} 
                keyboardType={'numeric'}
                onTextChange={(val) => {
                    val === '' ? setDisableButton(true) : setDisableButton(false);
                    setInputHolder(val)}}
                refer={inputRef}/>
            </View>
            <TouchableOpacity style={styles.resendButton}
             disabled={minutes === 0 && seconds === 0 ? false : true}
             onPress={() => {setMinutes(INITIAL_MIN); setSeconds(INITIAL_SEC)}}>
                <Text style={resend} >{'Resend OTP'}</Text>
            </TouchableOpacity>
            <View style={styles.forwardButton}>
               <CustomButton disabled={disableButton} title={`Submit`} onPressSubmit={() => handleOnPressForward()} />
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
        alignItems:'center',
        paddingHorizontal:vw(25)
    },
    bodyView:{
        width:vw(307),
        marginLeft:vw(30),
        marginTop:vh(15)
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
        color:'#00A8E1',
        fontSize:vw(14),
        fontWeight:'bold',
        alignSelf:'flex-end',
        marginTop:vh(15)
    },
    resendButton:{
        marginLeft:vw(30),
        marginTop:vh(25),
    },
    forwardButton:{
        paddingHorizontal:vw(25)
    }
});