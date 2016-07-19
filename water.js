import {flowers, initialCheck} from "./index.js";
import {message} from './message.js';

function water() {
    // find flower by id and changes lastWaterTime to current, 
    // increments min and max water times by waterFrequency
    var name;    
    var radios = document.getElementsByName('group1');

    for (var i= 0; i<radios.length; i++){
        if (radios[i].checked){
            name = radios[i].value;
        }
    }
    
    var now = new Date();
    
    for (var i = 0; i < flowers.length; i++) {
        if ( name == flowers[i].name ) {
            if (flowers[i].lastWaterTime < flowers[i].minWaterTime){
                flowers[i].live = flowers[i].live - 1;
                //console.log("be careful -1 live");
                alert("Flower " + flowers[i].name + ' doesnt need water , be careful. It has only ' + flowers[i].live + ' lifes left ')
                message(2, i);
            }
            
           flowers[i].lastWaterTime = new Date(Date.parse(now)).toString();
           flowers[i].minWaterTime = new Date(Date.parse(now) + flowers[i].waterFrequency).toString();
           flowers[i].maxWaterTime = new Date(Date.parse(flowers[i].minWaterTime) + flowers[i].waterFrequency).toString();
           console.log("You have successfully watered " + flowers[i].name );
           console.log("Next watering of" + flowers[i].name + " at " + flowers[i].minWaterTime);
           console.log("Watering should be done until " + flowers[i].maxWaterTime);
        }
    }
    initialCheck();
}


export {water}