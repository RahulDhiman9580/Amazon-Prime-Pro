import * as React from 'react'
import {SafeAreaView,
        View,
        Text,
        StyleSheet,
        ScrollView,
        Animated,
        BackHandler,
        Easing} from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'

//custom imports
import {vw,vh} from '../../components/Dimension'
import {HeaderLogo} from '../../components/HeaderLogo'
import {CustomInput} from '../../components/CustomInput'
import { CustomButton } from '../../components/CustomButton'
import {addUser} from '../onBoarding/authAction'

//export SignUp
export const SignUp = (props) =>{
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const mobRegex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
    const nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/;
    const passRegex = /^(?=.*\d)(?=.*[a-z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{6,8}$/;
    const dispatch = useDispatch();
    const [toggle, setOnToggle] = React.useState(true);
   
    const nameRef = React.useRef();
    const emailRef = React.useRef();
    const mobRef = React.useRef();
    const passwordRef = React.useRef();
    const animValue = React.useRef( new Animated.Value(0)).current;

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    //animations
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


    //handleOnSubmitSignUpForm
    const handleOnSubmitSignUpForm = (values) =>{
            dispatch(addUser(values));
            props.navigation.navigate('otp',{mobNumber : values.mobNumber, nextRoute : 'login'});
    }

    return(
        <ScrollView style={styles.scrollView}>
        <SafeAreaView style={styles.mainContainer}>
            <Animated.View style={[styles.headerLogo,{opacity:animValue, width:size, height:vh(50)}]}>
                <HeaderLogo />
            </Animated.View>
            <View style={styles.signUpHeader}>
                <Text style={styles.signUpTxt}>{`Sign Up`}</Text>
            </View>
            <View style={styles.formikView}>
            <Formik
            initialValues={{
                name : '',
                email : '',
                mobNumber : '',
                password : '',
            }}
            validationSchema={
                Yup.object({
                    name : Yup.string().required('Name is required.').matches(nameRegex,"Name can only contain letters and space in-between. "),
                    email : Yup.string().required('Email is required.').matches(emailRegex,"Email is invalid"),
                    mobNumber : Yup.string().required('Mobile number is required.').matches(mobRegex,'Invalid mobile number.'),
                    password : Yup.string().required('Password is required.').min(6,'Password is too-short, should be 6-chars min.').max(8,'Can have max 8-chars').matches(passRegex,'Atleast 1 uppercase, lowercase and a digit.')
                })
            }
            onSubmit={(values) => handleOnSubmitSignUpForm(values)}
            >
            {
                props =>(
                    <View>
                    
                    <View style={styles.nameView}>
                        <CustomInput placeHolder={'Enter your name'}
                        refer={nameRef}
                        onBlur={props.handleBlur('name')}
                        value={props.values.name}
                        onTextChange={props.handleChange('name')}
                        onSubmit={()=>emailRef.current.focus()}  />
                        {
                            props.touched.name && props.errors.name ? 
                            <Text style={styles.errorText}>{`* ${props.errors.name}`}</Text> :
                            null
                        }
                    </View>
                    
                    <View style={styles.emailView}> 
                    <CustomInput placeHolder={'Email Address'}
                        refer={emailRef}
                        value={props.values.email}
                        onBlur={()=>props.handleBlur('email')}
                        onTextChange={props.handleChange('email')}
                        onSubmit={()=>mobRef.current.focus()}  />
                        {
                            props.touched.email && props.errors.email ? 
                            <Text style={styles.errorText}>{`* ${props.errors.email}`}</Text> :
                            null
                        }
                    </View>
                    
                    <View style={styles.mobView}>
                        <CustomInput placeHolder={'Mobile Number'}
                        value={props.values.mobNumber}
                        refer={mobRef}
                        keyboardType={'numeric'}
                        onBlur={()=>props.handleBlur('mobNumber')}
                        onTextChange={props.handleChange('mobNumber')}
                        onSubmit={()=>{passwordRef.current.focus()}}  />
                        {
                            props.touched.mobNumber && props.errors.mobNumber ? 
                            <Text style={styles.errorText}>{`* ${props.errors.mobNumber}`}</Text> :
                            null
                        }
                    </View>
                    
                    <View style={styles.creatPassView}>
                        <CustomInput placeHolder={'Create Password'}
                        secure={toggle} 
                        value={props.values.password}
                        onToggle={()=>setOnToggle(!toggle)}
                        refer={passwordRef}
                        onBlur={()=>props.handleBlur('password')}
                        onTextChange={props.handleChange('password')}
                        onSubmit={()=>{}}  />
                        {
                            props.touched.password && props.errors.password ? 
                            <Text style={styles.errorText}>{`* ${props.errors.password}`}</Text> :
                            null
                        }
                    </View>

                    <View style={styles.buttonView}>
                        <CustomButton 
                        onPressSubmit={props.handleSubmit}
                        title={`Sign-Up`} />
                    </View>
                    </View>
                )
            }
            </Formik>
            <View style={styles.alreadyView}>
                <Text style={styles.alreadyTxt}
                onPress={() => props.navigation.navigate('login')}>{`Already have an account?`}</Text>
            </View>
            <View style={styles.termsView}>
                <Text style={styles.outerTermTxt}>{`By creating an account, you agree to`}<Text style={styles.innerTermTxt}>{` Amazon's Conditionsof Use `}</Text>{`and`}<Text style={styles.innerTermTxt}>{` Privacy Notice.`}</Text></Text>
            </View>

            <View style={styles.footerView}>
                <Text style={styles.footerTxt}>{`Condtions of Use`}</Text>
                <Text style={styles.footerTxt}>{`Privacy Notice`}</Text>
                <Text style={styles.footerTxt}>{`Help?`}</Text>
            </View>
            <View style={styles.copyrightView}>
                <Text style={styles.copyrightTxt}>{`© 1996-2021, Amazon.com, Inc. or its affiliates`}</Text>
            </View>
           
            </View>
        </SafeAreaView>
        </ScrollView>
    );
}
//stylesheet
const styles = StyleSheet.create({
    scrollView:{
        flex:1,
        backgroundColor:'white'
    },
    mainContainer:{
        flex:1,
        backgroundColor:'white'
    },
    headerLogo:{
        alignSelf:'center',
        marginTop:vh(30)
    },
    signUpHeader:{
        marginLeft:vw(30),
        marginTop:vh(60)
    },
    signUpTxt:{
        fontSize:vw(23),
        fontWeight:'bold',
        color:'#232F3E'
    },
    backBtnView:{
        width:vw(20),
        height:vh(20),
        marginLeft:vw(15),
        marginTop:vh(32)
    },
    headerView:{
        marginTop:vh(42),
        marginLeft:vw(30)
    },
    bodyView:{
        marginLeft:vw(30),
        marginTop:vh(25)
    },
    body:{
        fontSize:vw(15),
        color:'rgb(35,35,35)',
        fontWeight:'bold',
    },
    nameView:{
        marginLeft:vw(30),
        marginTop:vh(25)
    },
    emailView:{
        marginLeft:vw(30),
    },
    mobView:{
        marginLeft:vw(30)
    },
    creatPassView:{
        marginLeft:vw(30),
    },
    errorText:{
        color:'red',
        fontSize:vw(12)
    },
    buttonView:{
        marginTop:vh(25),
        paddingHorizontal:vw(25)
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
    footerView:{
        marginTop:vh(30),
        marginBottom:vh(10),
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
    },
    alreadyView:{
        alignSelf:'center',
        marginTop:vh(20)
    },
    alreadyTxt:{
        color:'#00A8E1',
        fontWeight:'bold',
        fontSize:vw(14)
    }
  
});