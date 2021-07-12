import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

//Custom imports
import {Profile} from './Profile'
import {Settings} from './Settings'
import {StreamAndDownload} from './StreamAndDownload'
import {ParentialControl} from './ParentialControl'
import {AboutAndLegal} from './AboutAndLegal'
import {ContactUs} from './ContactUs'
import {VideoScreen} from '../../components/VideoScreen'

//constants
const STACK = createStackNavigator();

export const ProfileRouter = () =>{
    return(
        
            <STACK.Navigator 
            independent={true}
            headerMode={false}
            initialRouteName={'Profile'}
            >
                <STACK.Screen   name='Profile' component={Profile} />    
                <STACK.Screen   name='Settings' component={Settings} />    
                <STACK.Screen   name='Stream' component={StreamAndDownload} />    
                <STACK.Screen   name='Parent' component={ParentialControl} />    
                <STACK.Screen   name='About' component={AboutAndLegal} />    
                <STACK.Screen   name='ContactUs' component={ContactUs} />    
                <STACK.Screen   name='Video' component={VideoScreen} />    
                
            </STACK.Navigator>
       
    );
}