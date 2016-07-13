function app() {
    // does initial startup check of all flowers
       initialCheck();
       
   // track() - runs when application tab is open
       var timeID= setInterval("track()",3000);

 }
 
var flowers = [];             // array of flowers objects 


function initialCheck() {
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



   function track(){ 
    // runs when application tab is open, 
    // monitors watering time
    // uses message function to send message to console ( with flower id, status id and time)
    // sends mssgId, id, time to message function
        var now = new Date();
        
        
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
                message(3, i);
            }
            else continue;
        }
    
    }


function water(name) {
    // find flower by id and changes lastWaterTime to current, 
    // increments min and max water times by waterFrequency
    var now = new Date();
    
    for (var i = 0; i < flowers.length; i++) {
        if ( name == flowers[i].name ) {
            if (flowers[i].lastWaterTime < flowers[i].minWaterTime){
                flowers[i].live = flowers[i].live - 1;
                //console.log("be careful -1 live");
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

function savePlants() {   // save plants to localStorage
    localStorage["flowers"] = JSON.stringify(flowers);
    console.log(JSON.stringify(flowers));
};

function loadPlants() {
     flowers = JSON.parse(localStorage["flowers"]);
     console.log(JSON.parse(localStorage["flowers"]));
};


function addPlant() {
   var now = new Date();
   var nameTemp = prompt('Enter plant name?', '');
   var waterFrequency = prompt('Enter watering frequency in HOURS', '');
    if (isNaN(waterFrequency)) {
        waterFrequency = prompt('Enter NUMBER of watering frequency', '');
    }
    waterFrequency = waterFrequency * 3600000;
    var watered = confirm('Water this plant and lick OK');
    var minWaterTimeTemp;
    var maxWaterTimeTemp;
    
    if (watered) { 
        minWaterTimeTemp = new Date(Date.parse(now) + waterFrequency).toString();
        maxWaterTimeTemp = new Date(Date.parse(minWaterTimeTemp) + waterFrequency).toString();
    }

    flowers.push({name: nameTemp, 
                  lastWaterTime: new Date(), 
                  minWaterTime: minWaterTimeTemp,
                  maxWaterTime: maxWaterTimeTemp,
                  waterFrequency: waterFrequency,
                  live: 2
    });
    console.log("Successfully added new plant " + nameTemp);
}

function showPlants() {
    var str = '';
    for (var i = 0; i < flowers.length; i++) {
        console.log(flowers[i]);
    }
}

function deletePlant(name){
    var id;
    for (var i = 0; i < flowers.length; i++) {
        if (name == flowers[i].name) {
            id = i;
        }
    }
    flowers.splice(id,1); 
}

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


app();
