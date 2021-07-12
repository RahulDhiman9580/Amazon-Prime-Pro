import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//custom imports
import {TvShowScreen} from './TvShowScreen'
import {MoviesScreen} from './MoviesScreen'
import {KidsScreen} from './KidsScreen'
import { vw } from '../../../components/Dimension';

const Tab = createMaterialTopTabNavigator();

export const TopTab = () => {
  return (
    <Tab.Navigator
    backBehavior='none'
    tabBarOptions={{
      activeTintColor:'#00A8E1' ,
      inactiveTintColor: '#8c8c8c',
      indicatorStyle:{ borderColor:'#00A8E1', borderWidth:1},
      labelStyle:{fontSize:vw(13),fontWeight:'bold'},
    }}>
      
      <Tab.Screen name="Movies" component={MoviesScreen}
       options={{
        title:'Movies'
      }} />
      
      <Tab.Screen name="TvShow" component={TvShowScreen}
       options={{
        title:'Tv Show'
      }} />
      
      <Tab.Screen name="Kids" component={KidsScreen}
       options={{
        title:'Kids'
      }} />
    </Tab.Navigator>
  );
}