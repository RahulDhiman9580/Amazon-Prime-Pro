import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


//custom imports
import {Related} from './Related'
import {MoreDetails} from './MoreDetails'
import { vw } from '../../../components/Dimension';

const Tab = createMaterialTopTabNavigator();

export const TopTabDetails = (props) => {
 
  return (
    <Tab.Navigator
    backBehavior='none'
    tabBarOptions={{
      activeTintColor:'#00A8E1' ,
      inactiveTintColor: '#8c8c8c',
      indicatorStyle:{ borderColor:'#00A8E1', borderWidth:1},
      labelStyle:{fontSize:vw(12),fontWeight:'bold'},
    }}>
      
      <Tab.Screen name="related" component={Related}
       options={{
        title:'Related'
      }} initialParams={{ movieId : props.movieId , name:props.name, season:props.season, episodeImage:props.episodeImage}} />
      <Tab.Screen name="moreDetails" component={MoreDetails}
       options={{
        title:'More Details'
      }} initialParams={{ movieId : props.movieId, name:props.name}} />
      
    </Tab.Navigator>
  );
}