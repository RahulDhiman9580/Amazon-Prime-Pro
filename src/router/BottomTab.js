import * as React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

//custom imports
import {vw,vh} from '../components/Dimension'

import {FindRouter} from '../modules/find/FindRouter'
import {downloadRouter} from '../modules/download/downloadRouter'
import {HomeRouter} from '../modules/home/HomeRouter'
import { ProfileRouter } from '../modules/profile/ProfileRouter'

//image paths
const homeImg = require('../assets/images/bottomTab/home.png')
const findImg = require('../assets/images/bottomTab/loupe.png')
const downloadImg = require('../assets/images/bottomTab/download.png')
const profileImg = require('../assets/images/bottomTab/user.png')



//export BottomTab
export const BottomTab = (props) =>{
    const Tab = createBottomTabNavigator();
   

    return(
        
        <Tab.Navigator
        tabBarOptions={{
            keyboardHidesTabBar:true,
            showLabel:false,
            style:{
                height:vh(70),
                backgroundColor:'#232F3E',
                justifyContent:'space-between',   
            },
            activeTintColor:'#00A8E1' ,
            inactiveTintColor: 'white',
        }}
        >
            <Tab.Screen name='homeRouter' component={HomeRouter}
            options={{
                tabBarIcon : ({focused, color})=> <Image source={homeImg} style={[styles.icon,{tintColor:color, width:focused ? vw(25) : vw(20),height: focused ? vw(25) : vw(20)}]}/>
            }} />
            <Tab.Screen name='FindRouter' component={FindRouter}
            options={{
                unmountOnBlur: true, 
                tabBarIcon : ({focused, color})=> <Image source={findImg} style={[styles.icon,{tintColor:color, width:focused ? vw(25) : vw(20),height: focused ? vw(25) : vw(20)}]}/>
            }} />
            <Tab.Screen name='DownloadRouter' component={downloadRouter}
            options={{
                unmountOnBlur: true, 
                tabBarIcon : ({focused, color})=> <Image source={downloadImg} style={[styles.icon,{tintColor:color, width:focused ? vw(25) : vw(20),height: focused ? vw(25) : vw(20)}]}/>
            }} />
            <Tab.Screen name='ProfileRouter' component={ProfileRouter}
            options={{
                unmountOnBlur: true,
                tabBarIcon : ({focused, color})=><View><Image source={profileImg} style={[styles.icon,{tintColor:color, width:focused ? vw(25) : vw(20),height: focused ? vw(25) : vw(20)}]}/></View> 
            }} />
        
        </Tab.Navigator>

    );
}
//stylesheet
const styles = StyleSheet.create({
    icon:{
    
    }
});