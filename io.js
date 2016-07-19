import {flowers} from './index.js' ;
import {viewPlants} from './view.js';


function savePlants() {   // save plants to localStorage
    localStorage["flowers"] = JSON.stringify(flowers);
    viewPlants(flowers);
    console.log(JSON.stringify(flowers));
};



function showPlants() {
    var str = '';
    for (var i = 0; i < flowers.length; i++) {
        console.log(flowers[i]);
    }
    viewPlants(flowers);
}

function deletePlant(){
    var name;    
    var radios = document.getElementsByName('group1');

    for (var i= 0; i<radios.length; i++){
        if (radios[i].checked){
            name = radios[i].value;
        }
    }
    
    var id;
    for (var i = 0; i < flowers.length; i++) {
        if (name == flowers[i].name) {
            id = i;
        }
    }
    flowers.splice(id,1); 
    viewPlants(flowers);
}

export {deletePlant, showPlants, savePlants};