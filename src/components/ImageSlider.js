import * as React from 'react'
import { SliderBox } from "react-native-image-slider-box";

//custom imports
import {vw,vh} from './Dimension'

//export ImageSlider

export const ImageSlider = (props) =>{
    return(
        <SliderBox images={props.imageData}
        sliderBoxHeight={vh(180)} 
        ImageComponentStyle={{width:vw(380), height: vh(200)}}
        autoplay={true}
        circleLoop={true}
        style={{height:vw(190), width:vw(365)}}/>
    );
}