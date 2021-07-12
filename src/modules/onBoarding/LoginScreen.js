import * as React from 'react'
import {SafeAreaView,
        StyleSheet,
        Text,
        View,
        Animated,
    BackHandler} from 'react-native'
import { Easing } from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux'

//custom imports
import {vw,vh} from '../../components/Dimension'
import {HeaderLogo} from '../../components/HeaderLogo'
import {CustomInput} from '../../components/CustomInput'
import {CustomButton} from '../../components/CustomButton'
import {PopUpModal} from '../../components/PopUpModal'
import {loggedIn} from './authAction'

//image paths
const errorLogo = require('../../assets/images/error.png')
const blockedLogo = require('../../assets/images/icCancelRed.png')
const succLogo = require('../../assets/images/icCheckGreen.png')

//export LoginScreen
export const LoginScreen = (props) =>{
    const dispatch = useDispatch();
    const [toggle, setToggle] = React.useState(true);
    const storeEmail = useSelector((state) => state.authReducer.email);
    const storeMobNumber = useSelector((state) => state.authReducer.mobNumber);
    const storePassword = useSelector((state) => state.authReducer.password);
    const storeName = useSelector((state) => state.authReducer.name);
    const [modalDetail, setModalDetail] = React.useState({
                                                            visible : false,
                                                            modalTitle : '',
                                                            modalBody : '',
                                                            logoImage : ''
                                                        });
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const emailRef = React.useRef(null);
    const passRef = React.useRef(null);

    const animValue = React.useRef( new Animated.Value(0)).current;


    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, []);
  

    React.useEffect(() => {
        Animated.timing(animValue, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver:false
        }).start()
    })

    const size = animValue.interpolate({
        inputRange:[0,1],
        outputRange:[0,vw(200)]
    });

    //onPressSubmitButton
    const onPressSubmitButton = () =>{
        /* 
          for successful login 
          => comparing the email and password entered with the stored email and password in redux-store
       */
        if(email === '' || password === ''){
          
            emailRef.current.clear();
            passRef.current.clear();
            setEmail('');
          setPassword('');
                setModalDetail({
                    visible:true,
                    modalTitle:'Invalid Credentials',
                    modalBody:'Eamil / Mobile number and Password entered by you are Invalid.',
                    logoImage:errorLogo
                });
             
        }
        else if((storeEmail.toLowerCase().trim() === email.toLowerCase().trim()) || ((storeMobNumber.toLowerCase().trim() === email.toLowerCase().trim()) ) && storePassword === password)
        {
          emailRef.current.clear();
          passRef.current.clear();
          setEmail('');
          setPassword('');
          setModalDetail({
          visible:true,
          modalTitle:'Login Successful',
          modalBody:`Welcome, ${storeName} to Prime Video.`,
          logoImage:succLogo
        });
        dispatch(loggedIn(true));
        props.navigation.replace('bottomTab');
      }
        
        //for blocked email (email : abc@gmail.com, password : 1234)
        else if(email.toLowerCase().trim()==='abc@gmail.com' && password==='1234')
        {     
              emailRef.current.clear();
              passRef.current.clear();
              setEmail('');
              setPassword('');
              setModalDetail({
              visible:true,
              modalTitle:'Blocked',
              modalBody:'Sorry but your account has been blocked by Prime Video.',
              logoImage:blockedLogo
          });
        }
       //if invalid creadentials or empty fields
       else{
        emailRef.current.clear();
        passRef.current.clear();
        setEmail('');
          setPassword('');
          setModalDetail({
              visible:true,
              modalTitle:'Invalid Credentials',
              modalBody:'Eamil / Mobile number and Password entered by you are Invalid.',
              logoImage:errorLogo
          });
       }
      }

    //callBackHandler
    const callBackHandler = () =>{
        setModalDetail({
            visible : false,
            modalTitle : '',
            modalBody : '',
            logoImage : ''
             });
    }

    return(
        <SafeAreaView style={styles.mainContainer}>
            <Animated.View style={[styles.headerLogo, {opacity:animValue, width:size, height:vh(50)} ]}>
                <HeaderLogo />
            </Animated.View>
            <View style={styles.signInHeader}>
                <Text style={styles.signInTxt}>{`Sign-In`}</Text>
            </View>
            <View style={styles.inputHolder}>
                <CustomInput placeHolder='Email or Phone Number'
                onTextChange={val => setEmail(val)} 
                refer={emailRef}
                value={email}
                onSubmit={() => passRef.current.focus()}/>
                <CustomInput placeHolder='Password' 
                secure={toggle} 
                value={password}
                maxLength={8}
                onToggle={()=>setToggle(!toggle)}
                onTextChange={val => setPassword(val)}
                refer={passRef}
                 />
            
            <Text style={styles.forgotTxt}
            onPress={() => props.navigation.navigate('forgotPass')}>{`Forgot Password?`}</Text>
            <CustomButton title='Sign-In' onPressSubmit={()=>onPressSubmitButton()} />
            </View>
            <View style={styles.termsView}>
                <Text style={styles.outerTermTxt}>{`By continuing, you agree to`}<Text style={styles.innerTermTxt}>{` Amazon's Conditionsof Use `}</Text>{`and`}<Text style={styles.innerTermTxt}>{` Privacy Notice.`}</Text></Text>
            </View>
            <View style={styles.seperator}>
                <View style={styles.empty}></View>
                <Text style={styles.emptyTxt}>{`New to Prime Video?`}</Text>
                <View style={styles.empty}></View>
            </View>
            <View style={styles.buttonHolder}>
                <CustomButton title='Create a new account' 
                onPressSubmit={() => props.navigation.navigate('signUp')}
                />
            </View>
            <View style={styles.footerView}>
                <Text style={styles.footerTxt}>{`Condtions of Use`}</Text>
                <Text style={styles.footerTxt}>{`Privacy Notice`}</Text>
                <Text style={styles.footerTxt}>{`Help?`}</Text>
            </View>
            <View style={styles.copyrightView}>
                <Text style={styles.copyrightTxt}>{`© 1996-2021, Amazon.com, Inc. or its affiliates`}</Text>
            </View>
                { modalDetail.visible &&
                <PopUpModal item={modalDetail} handleCallBack={()=>callBackHandler()}/>
                }
        </SafeAreaView>
    );
};

//stylesheet
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'white'
    },
    headerLogo:{
        alignSelf:'center',
        marginTop:vh(50)
    },
    signInHeader:{
        marginLeft:vw(30),
        marginTop:vh(60)
    },
    signInTxt:{
        fontSize:vw(23),
        fontWeight:'bold',
        color:'#232F3E'
    },
    inputHolder:{
        marginTop:vh(10),
        alignItems:'center'
    },
    forgotTxt:{
        fontSize:vw(14),
        alignSelf:'flex-end',
        marginRight:vw(30),
        marginTop:vh(15),
        color:'#919191'
    },
    termsView:{
        alignSelf:'center',
        alignItems:'center',
        paddingHorizontal:vw(25),
        marginTop:vh(20)
    },
    outerTermTxt:{
        fontSize:vw(12)
    },
    innerTermTxt:{
        fontSize:vw(12),
        color:'#00A8E1',
        fontWeight:'bold'
    },
    seperator:{
        flexDirection:'row',
        paddingHorizontal:vw(25),
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:vh(50)
    },
    empty:{
        borderWidth:0.5,
        height:vh(0),
        width:vw(100),
        borderColor:'#919191'
    },
    emptyTxt:{
        fontSize:vw(11),
        color:'#919191'
    },
    buttonHolder:{
        paddingHorizontal:vw(25),
    },
    footerView:{
        marginTop:vh(50),
        flexDirection:'row',
        paddingHorizontal:vw(25),
        justifyContent:'space-between'
    },
    footerTxt:{
        color:'#00A8E1',
        fontSize:vw(12)
    },
    copyrightView:{
        paddingHorizontal:vw(25),
        justifyContent:'center',
        alignItems:'center',
        marginTop:vh(10)
    },
    copyrightTxt:{
        fontSize:vw(10),
        color:'#232F3E'
    }
    
});