import {flowers} from './index.js';

function message(mssgId, id, time){
    // finds flower name by id, 
    
    // all id's are good
    if (mssgId == 0) {
        console.log('All plants are Live');        
    }
    
    // id needs water, shows time until death,
    if (mssgId == 1) {
        console.log("Flower " + flowers[id].name + ' needs water ' );
        console.log("You have " + flowers[id].live + " hours left until it dies");
    }
    
     // id doesn't need water, be careful, -1 Life,
    if (mssgId == 2 ) {
        console.log("Flower " + flowers[id].name + ' doesnt need water , be careful' );
        console.log('It has only ' + flowers[id].live + ' lifes left' );
    }
    // id is dead,
    if (mssgId == 3) {
        console.log("Flower " + flowers[id].name + ' is dead. We are sorry :)) ' );
    }

}

export {message}