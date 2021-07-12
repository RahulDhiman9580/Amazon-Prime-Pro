import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

//Custom imports
import {SplashScreen} from '../modules/onBoarding/SplashScreen'
import {LoginScreen} from '../modules/onBoarding/LoginScreen'
import {SignUp} from '../modules/onBoarding/SignUp'
import {OTP} from '../modules/onBoarding/OTP'
import {ForgotPassword} from '../modules/onBoarding/ForgotPass'
import {ResetPassword} from '../modules/onBoarding/ResetPass'
import {BottomTab} from './BottomTab'
import {GetStarted} from '../modules/onBoarding/GetStarted'
import {ProfileRouter} from '../modules/profile/ProfileRouter'

//constants
const STACK = createStackNavigator();

export const Router = () =>{
    return(
        <NavigationContainer>
            <STACK.Navigator 
            headerMode={false}
            independent={false}
            initialRouteName={'splash'}
            >
                <STACK.Screen   name='splash' component={SplashScreen} />
                <STACK.Screen   name='login' component={LoginScreen} />
                <STACK.Screen   name='signUp' component={SignUp} />
                <STACK.Screen   name='otp' component={OTP} />
                <STACK.Screen   name='forgotPass' component={ForgotPassword} />
                <STACK.Screen   name='resetPass' component={ResetPassword} />
                <STACK.Screen   name='bottomTab' component={BottomTab} />
                <STACK.Screen   name='GetStarted' component={GetStarted} />
                <STACK.Screen   name='Profile' component={ProfileRouter} />

            </STACK.Navigator>
        </NavigationContainer>
    );
}