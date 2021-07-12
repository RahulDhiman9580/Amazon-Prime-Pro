import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

//Custom imports
import {Home} from '../home/Home'
import {MovieDetails} from '../../components/MovieDetails'
import {FullList} from '../../components/FullList'
import {VideoScreen} from '../../components/VideoScreen'

//constants
const STACK = createStackNavigator();

export const HomeRouter = () =>{
    return(
        <NavigationContainer
        independent={true}>
            <STACK.Navigator 
            headerMode={false}
            initialRouteName={'home'}
            >
                <STACK.Screen   name='home' component={Home} />   
                <STACK.Screen   name='movieDetail' component={MovieDetails} />   
                <STACK.Screen   name='fullList' component={FullList} />   
                <STACK.Screen   name='Video' component={VideoScreen} />   
            </STACK.Navigator>
        </NavigationContainer>
    );
}