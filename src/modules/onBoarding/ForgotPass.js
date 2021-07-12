import * as React from 'react'
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Image, BackHandler} from 'react-native'
import {useSelector} from 'react-redux'

//custom imports
import {vw,vh} from '../../components/Dimension'
import {HeaderLogo} from '../../components/HeaderLogo'
import {CustomInput} from '../../components/CustomInput'
import {CustomButton} from '../../components/CustomButton'
import {PopUpModal} from '../../components/PopUpModal'

//image paths
const closeImg = require('../../assets/images/ic-back-btn.png');
const checkLogo = require('../../assets/images/icCheckGreen.png');
const errorLogo = require('../../assets/images/error.png');

//export ForgotPassword
export const ForgotPassword = (props) =>{
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/ ;
    const email = useSelector((state) => state.authReducer.email);
    const mobNumber = useSelector((state) => state.authReducer.mobNumber);
    const [disableButton, setDisableButton] = React.useState(true);
    const [inputHolder, setInputHolder] = React.useState('');
    const [modalObject,setModalObject] = React.useState({
        visible : false,
        modalTitle : '',
        modalBody : '',
        logoImage : ''
         });


        React.useEffect(() => {
            BackHandler.addEventListener('hardwareBackPress', () => true)
            return () =>
              BackHandler.removeEventListener('hardwareBackPress', () => true)
          }, [])
        const inputRef = React.useRef(null);
    
    
         //handleOnPressForward
         const handleOnPressForward = () =>{

            //handle empty input
            if(inputHolder === ''){
                setModalObject({
                    visible:true,
                    modalTitle:'Invalid',
                    modalBody:'Please enter correct email/mobile number.',
                    logoImage:errorLogo
                });}
            //user enters mobile number to reset password and that should be registered one
            if(phoneRegex.test(inputHolder) && mobNumber === inputHolder){
                inputRef.current.clear();
                setInputHolder('');
                props.navigation.navigate('otp',{mobNumber : inputHolder, nextRoute : 'resetPass'});
            } 
            //user enters email to reset password and that should be registered one
            else if(emailRegex.test(inputHolder) && email.toLowerCase().trim() === inputHolder.toLowerCase().trim()){
                inputRef.current.clear();
                setInputHolder('');
                 setModalObject({
                     visible:true,
                     modalTitle:'Link Sent',
                     modalBody:'A verfication link has been sent on your email.',
                     logoImage:checkLogo
                 });
             }
             else{
                setModalObject({
                    visible:true,
                    modalTitle:'Invalid',
                    modalBody:'Please enter correct email/mobile number.',
                    logoImage:errorLogo
                });
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
         }

    return(
        <SafeAreaView style={styles.mainContainer}>
                <View style={styles.imgContainer}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('login')} >
                    <Image source={closeImg} style={styles.closeImg}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.headerView}>
                    <HeaderLogo  />
                </View>
                <View style={styles.bodyTextView}>
                    <Text style={styles.body}>{"Don't worry just enter the email address or mobile number associated with your account."}</Text>
                </View>
                <View style={styles.inputView}>
                    <CustomInput  placeHolder={'Email address / Mobile number'}
                    onTextChange={(val) => {
                        val === '' ? setDisableButton(true) : setDisableButton(false);
                        setInputHolder(val)}}
                        refer={inputRef}
                    />
                </View>
                <View style={styles.buttonHolder}>
                    <CustomButton 
                    disabled={disableButton} 
                    onPressSubmit={() => handleOnPressForward()}
                    title={`Submit`}/>
                </View>
                { modalObject.visible &&
                <PopUpModal item={modalObject} handleCallBack={()=>callBackHandler()}/>
                }
           
        </SafeAreaView>
    );
}
//stylesheet
const styles = StyleSheet.create({
   mainContainer:{
        flex:1,
        backgroundColor:'white'
    },
   imgContainer:{
       marginLeft:vw(14.5),
       marginTop:vh(45),
   },
   closeImg:{
       width:vw(20.5),
       height:vh(20)
   },
   headerView:{
       alignSelf:'center',
       marginTop:vh(47.5)
   },
   bodyTextView:{
       width:vw(293),
       marginLeft:vw(30),
       marginTop:vh(40),
   },
   body:{
       fontSize:vw(14),
       color:'rgb(89,89,89)',
   },
   inputView:{
       marginLeft:vw(30),
       marginTop:vh(25)
   },
   buttonHolder:{
       paddingHorizontal:vw(25)
   }
});