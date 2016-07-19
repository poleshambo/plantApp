import {flowers} from "./index.js";
import {message} from './message.js';

function track(){ 
    // runs when application tab is open, 
    // monitors watering time
    // uses message function to send message to console ( with flower id, status id and time)
    // sends mssgId, id, time to message function
        var now = new Date();
        
        console.log('Track just worked!!!!!')
        for (var i = 0; i<flowers.length; i++){
             var tempTime = flowers[i].maxWaterTime;

             if (now > flowers[i].minWaterTime) {
                var timeLeft = -( tempTime.getHours() - now.getHours() ) ;
                message(1, i, timeLeft);
                };
             if (now > flowers[i].maxWaterTime) {
                message(3, i)
            }   
            if (flowers[i].live == 0) {
                alert("Flower" + flowers[i].name + " is dead now. We are sorry)")
                message(3, i);
            }
            else continue;
        }
    
    }


export {track}