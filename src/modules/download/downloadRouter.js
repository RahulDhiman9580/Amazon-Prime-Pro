import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

//Custom imports
import {VideoScreen} from '../../components/VideoScreen'
import {Download} from './Download'



//constants
const STACK = createStackNavigator();

export const downloadRouter = () =>{
    return(
        <NavigationContainer
        independent={true}>
            <STACK.Navigator 
            headerMode={false}
            initialRouteName={'Download'}
            >
                <STACK.Screen   name='Download' component={Download} />   
                <STACK.Screen   name='Video' component={VideoScreen} />   
                
            </STACK.Navigator>
        </NavigationContainer>
    );
}