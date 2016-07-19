import {flowers, Pot} from "./index.js";
import * as viewModule from './view.js';


 function addPlant() {
   var now = new Date();
   var nameTemp = prompt('Enter plant name?', '');
   var waterFrequency = prompt('Enter watering frequency in HOURS', '');
    if (isNaN(waterFrequency)) {
        waterFrequency = prompt('Enter NUMBER of watering frequency', '');
    }
    waterFrequency = waterFrequency * 3600000;
    var watered = confirm('Water this plant and click OK');
    var minWaterTimeTemp;
    var maxWaterTimeTemp;
    
    if (watered) { 
        minWaterTimeTemp = new Date(Date.parse(now) + waterFrequency).toString();
        maxWaterTimeTemp = new Date(Date.parse(minWaterTimeTemp) + waterFrequency).toString();
    }
    
     var newPot = new Pot(nameTemp, minWaterTimeTemp, maxWaterTimeTemp, waterFrequency);
    
    flowers.push(newPot);

    console.log("Successfully added new plant " + nameTemp);
    
    viewModule.viewPlants(flowers);
}

export {addPlant}