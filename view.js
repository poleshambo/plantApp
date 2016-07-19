import {flowers} from './index.js';

function viewPlants(flowers) {
    var tempHTML = '';
    
    for (var i=0; i<flowers.length; i++) {
        
        tempHTML += '<div id="' + [i] + '" class="alldivs">';
        tempHTML += '<input type="radio" name="group1" value="' + flowers[i].name +'">';
        tempHTML += '<span>' + 'Flower name ' +flowers[i].name + '</span>';
        tempHTML += '<span>' + ' Last watered at ' + flowers[i].lastWaterTime + '</span>';
        tempHTML += '<span>' + ' Should be watered before ' + flowers[i].maxWaterTime + '</span>';
        tempHTML += '<span>' + ' Do not water until ' + flowers[i].minWaterTime + '</span>';
        tempHTML += '<span>' + ' Lives remaining ' + flowers[i].live + '</span>';
        tempHTML += '<span>' + ' Watering frequency every ' + (flowers[i].waterFrequency/3600000) + ' hours ' + '</span>';
        tempHTML += '</div>';
    }
    document.getElementById("content").innerHTML = tempHTML;
}

export {viewPlants}