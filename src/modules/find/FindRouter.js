import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'


//Custom imports
import {Find} from './Find'
import {Details} from './Details'
import {VideoScreen} from '../../components/VideoScreen'


//constants
const STACK = createStackNavigator();

export const FindRouter = () =>{
    return(
        <NavigationContainer
        independent={true}>
            <STACK.Navigator 
            headerMode={false}
            initialRouteName={'Find'}
            >
                <STACK.Screen   name='Find' component={Find} />   
                <STACK.Screen   name='movieDetail' component={Details} />   
                <STACK.Screen   name='Video' component={VideoScreen} />   
                
            </STACK.Navigator>
        </NavigationContainer>
    );
}