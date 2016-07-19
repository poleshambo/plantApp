'use strict';

import {viewPlants}  from './view.js';
import {addPlant} from './add.js';
import {track} from './track.js';
import {water} from './water.js';
import {showPlants, deletePlant, savePlants} from './io.js';
import {message} from './message.js';

var elem = document.getElementById("content");
var self = this;

function app() {
    // does initial startup check of all flowers
       initialCheck();
       
   // track() - runs when application tab is open
        //var timeID= 
        setInterval(self.track(),3000);   // with "" works setInterval, without "" works track();

 };

 
export var flowers = [];             // array of flowers objects 


export function Pot(name, minwt, maxwt, wf ) {
    this.name = name;
    this.lastWaterTime = new Date().toString();
    this.minWaterTime = minwt;
    this.maxWaterTime = maxwt;
    this.waterFrequency = wf;
    this.live = 2;
}

export function initialCheck() {
    var STARTED_TIME = new Date();
    
    if (flowers.length == 0) {
        loadPlants();
        console.log("Loaded plants form storage")
    }
    
    for (var i = 0; i<flowers.length; i++){
        if (STARTED_TIME > flowers[i].maxWaterTime) {
            flowers[i].live = 0;
            message(3, i);
        } else 
            message(0);
    }
}


function loadPlants() {
     flowers = JSON.parse(localStorage["flowers"]);  // ?? why doesn't it work in io.js 
     viewPlants(flowers);                            // Error: "flowers" is read-only while parsing file:
     console.log(JSON.parse(localStorage["flowers"]));
};




document.getElementById( 'addPlant' ).onclick = () => addPlant();

document.getElementById( 'water' ).onclick = () => water();

document.getElementById( 'showPlants' ).onclick = () =>  showPlants();

document.getElementById( 'deletePlant' ).onclick = () => deletePlant();

document.getElementById( 'loadPlants' ).onclick = () => loadPlants();

document.getElementById( 'savePlants' ).onclick = () => savePlants();


app();


viewPlants(flowers);
