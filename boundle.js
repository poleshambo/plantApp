(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addPlant = undefined;

var _index = require('./index.js');

var _view = require('./view.js');

var viewModule = _interopRequireWildcard(_view);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

    var newPot = new _index.Pot(nameTemp, minWaterTimeTemp, maxWaterTimeTemp, waterFrequency);

    _index.flowers.push(newPot);

    console.log("Successfully added new plant " + nameTemp);

    viewModule.viewPlants(_index.flowers);
}

exports.addPlant = addPlant;

},{"./index.js":2,"./view.js":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.flowers = undefined;
exports.Pot = Pot;
exports.initialCheck = initialCheck;

var _view = require('./view.js');

var _add = require('./add.js');

var _track = require('./track.js');

var _water = require('./water.js');

var _io = require('./io.js');

var _message = require('./message.js');

var elem = document.getElementById("content");

function app() {
    // does initial startup check of all flowers
    initialCheck();

    // track() - runs when application tab is open
    //var timeID= 
    setInterval((0, _track.track)(), 3000);
};

var flowers = exports.flowers = []; // array of flowers objects 

function Pot(name, minwt, maxwt, wf) {
    this.name = name;
    this.lastWaterTime = new Date().toString();
    this.minWaterTime = minwt;
    this.maxWaterTime = maxwt;
    this.waterFrequency = wf;
    this.live = 2;
}

function initialCheck() {
    var STARTED_TIME = new Date();

    console.log("It works!!!");

    if (flowers.length == 0) {
        loadPlants();
        console.log("Loaded plants form storage");
    }

    for (var i = 0; i < flowers.length; i++) {
        if (STARTED_TIME > flowers[i].maxWaterTime) {
            flowers[i].live = 0;
            (0, _message.message)(3, i);
        } else (0, _message.message)(0);
    }
}

function loadPlants() {
    exports.flowers = flowers = JSON.parse(localStorage["flowers"]); // ?? why doesn't it work in io.js 
    (0, _view.viewPlants)(flowers); // Error: "flowers" is read-only while parsing file:
    console.log(JSON.parse(localStorage["flowers"]));
};

document.getElementById('addPlant').onclick = function () {
    return (0, _add.addPlant)();
};

document.getElementById('water').onclick = function () {
    return (0, _water.water)();
};

document.getElementById('showPlants').onclick = function () {
    return (0, _io.showPlants)();
};

document.getElementById('deletePlant').onclick = function () {
    return (0, _io.deletePlant)();
};

document.getElementById('loadPlants').onclick = function () {
    return loadPlants();
};

document.getElementById('savePlants').onclick = function () {
    return (0, _io.savePlants)();
};

//app();

(0, _view.viewPlants)(flowers);

},{"./add.js":1,"./io.js":3,"./message.js":4,"./track.js":5,"./view.js":6,"./water.js":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.savePlants = exports.showPlants = exports.deletePlant = undefined;

var _index = require('./index.js');

var _view = require('./view.js');

function savePlants() {
    // save plants to localStorage
    localStorage["flowers"] = JSON.stringify(_index.flowers);
    (0, _view.viewPlants)(_index.flowers);
    console.log(JSON.stringify(_index.flowers));
};

function showPlants() {
    var str = '';
    for (var i = 0; i < _index.flowers.length; i++) {
        console.log(_index.flowers[i]);
    }
    (0, _view.viewPlants)(_index.flowers);
}

function deletePlant() {
    var name;
    var radios = document.getElementsByName('group1');

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            name = radios[i].value;
        }
    }

    var id;
    for (var i = 0; i < _index.flowers.length; i++) {
        if (name == _index.flowers[i].name) {
            id = i;
        }
    }
    _index.flowers.splice(id, 1);
    (0, _view.viewPlants)(_index.flowers);
}

exports.deletePlant = deletePlant;
exports.showPlants = showPlants;
exports.savePlants = savePlants;

},{"./index.js":2,"./view.js":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.message = undefined;

var _index = require('./index.js');

function message(mssgId, id, time) {
    // finds flower name by id, 

    // all id's are good
    if (mssgId == 0) {
        console.log('All plants are Live');
    }

    // id needs water, shows time until death,
    if (mssgId == 1) {
        console.log("Flower " + _index.flowers[id].name + ' needs water ');
        console.log("You have " + _index.flowers[id].live + " hours left until it dies");
    }

    // id doesn't need water, be careful, -1 Life,
    if (mssgId == 2) {
        console.log("Flower " + _index.flowers[id].name + ' doesnt need water , be careful');
        console.log('It has only ' + _index.flowers[id].live + ' lifes left');
    }
    // id is dead,
    if (mssgId == 3) {
        console.log("Flower " + _index.flowers[id].name + ' is dead. We are sorry :)) ');
    }
}

exports.message = message;

},{"./index.js":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.track = undefined;

var _index = require('./index.js');

var _message = require('./message.js');

function track() {
    // runs when application tab is open, 
    // monitors watering time
    // uses message function to send message to console ( with flower id, status id and time)
    // sends mssgId, id, time to message function
    var now = new Date();

    console.log('Track just worked!!!!!');
    for (var i = 0; i < _index.flowers.length; i++) {
        var tempTime = _index.flowers[i].maxWaterTime;

        if (now > _index.flowers[i].minWaterTime) {
            var timeLeft = -(tempTime.getHours() - now.getHours());
            (0, _message.message)(1, i, timeLeft);
        };
        if (now > _index.flowers[i].maxWaterTime) {
            (0, _message.message)(3, i);
        }
        if (_index.flowers[i].live == 0) {
            alert("Flower" + _index.flowers[i].name + " is dead now. We are sorry)");
            (0, _message.message)(3, i);
        } else continue;
    }
}

exports.track = track;

},{"./index.js":2,"./message.js":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.viewPlants = viewPlants;
function viewPlants(arr) {
    var tempHTML = '';

    for (var i = 0; i < arr.length; i++) {

        tempHTML += '<div id="' + [i] + '" class="alldivs">';
        tempHTML += '<input type="radio" name="group1" value="' + arr[i].name + '">';
        tempHTML += '<span>' + 'Flower name ' + arr[i].name + '</span>';
        tempHTML += '<span>' + ' Last watered at ' + arr[i].lastWaterTime + '</span>';
        tempHTML += '<span>' + ' Should be watered before ' + arr[i].maxWaterTime + '</span>';
        tempHTML += '<span>' + ' Do not water until ' + arr[i].minWaterTime + '</span>';
        tempHTML += '<span>' + ' Lives remaining ' + arr[i].live + '</span>';
        tempHTML += '<span>' + ' Watering frequency every ' + arr[i].waterFrequency / 3600000 + ' hours ' + '</span>';
        tempHTML += '</div>';
    }
    console.log(tempHTML);
    document.getElementById("content").innerHTML = tempHTML;
}

exports.viewPlants = viewPlants;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.water = undefined;

var _index = require('./index.js');

var _message = require('./message.js');

function water() {
    // find flower by id and changes lastWaterTime to current, 
    // increments min and max water times by waterFrequency
    var name;
    var radios = document.getElementsByName('group1');

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            name = radios[i].value;
        }
    }

    var now = new Date();

    for (var i = 0; i < _index.flowers.length; i++) {
        if (name == _index.flowers[i].name) {
            if (_index.flowers[i].lastWaterTime < _index.flowers[i].minWaterTime) {
                _index.flowers[i].live = _index.flowers[i].live - 1;
                //console.log("be careful -1 live");
                alert("Flower " + _index.flowers[i].name + ' doesnt need water , be careful. It has only ' + _index.flowers[i].live + ' lifes left ');
                (0, _message.message)(2, i);
            }

            _index.flowers[i].lastWaterTime = new Date(Date.parse(now)).toString();
            _index.flowers[i].minWaterTime = new Date(Date.parse(now) + _index.flowers[i].waterFrequency).toString();
            _index.flowers[i].maxWaterTime = new Date(Date.parse(_index.flowers[i].minWaterTime) + _index.flowers[i].waterFrequency).toString();
            console.log("You have successfully watered " + _index.flowers[i].name);
            console.log("Next watering of" + _index.flowers[i].name + " at " + _index.flowers[i].minWaterTime);
            console.log("Watering should be done until " + _index.flowers[i].maxWaterTime);
        }
    }
    (0, _index.initialCheck)();
}

exports.water = water;

},{"./index.js":2,"./message.js":4}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWRkLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL2lvLmpzIiwic3JjL21lc3NhZ2UuanMiLCJzcmMvdHJhY2suanMiLCJzcmMvdmlldy5qcyIsInNyYy93YXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQTs7QUFDQTs7SUFBWSxVOzs7O0FBR1gsU0FBUyxRQUFULEdBQW9CO0FBQ2xCLFFBQUksTUFBTSxJQUFJLElBQUosRUFBVjtBQUNBLFFBQUksV0FBVyxPQUFPLG1CQUFQLEVBQTRCLEVBQTVCLENBQWY7QUFDQSxRQUFJLGlCQUFpQixPQUFPLG1DQUFQLEVBQTRDLEVBQTVDLENBQXJCO0FBQ0MsUUFBSSxNQUFNLGNBQU4sQ0FBSixFQUEyQjtBQUN2Qix5QkFBaUIsT0FBTyxvQ0FBUCxFQUE2QyxFQUE3QyxDQUFqQjtBQUNIO0FBQ0QscUJBQWlCLGlCQUFpQixPQUFsQztBQUNBLFFBQUksVUFBVSxRQUFRLCtCQUFSLENBQWQ7QUFDQSxRQUFJLGdCQUFKO0FBQ0EsUUFBSSxnQkFBSjs7QUFFQSxRQUFJLE9BQUosRUFBYTtBQUNULDJCQUFtQixJQUFJLElBQUosQ0FBUyxLQUFLLEtBQUwsQ0FBVyxHQUFYLElBQWtCLGNBQTNCLEVBQTJDLFFBQTNDLEVBQW5CO0FBQ0EsMkJBQW1CLElBQUksSUFBSixDQUFTLEtBQUssS0FBTCxDQUFXLGdCQUFYLElBQStCLGNBQXhDLEVBQXdELFFBQXhELEVBQW5CO0FBQ0g7O0FBRUEsUUFBSSxTQUFTLGVBQVEsUUFBUixFQUFrQixnQkFBbEIsRUFBb0MsZ0JBQXBDLEVBQXNELGNBQXRELENBQWI7O0FBRUQsbUJBQVEsSUFBUixDQUFhLE1BQWI7O0FBRUEsWUFBUSxHQUFSLENBQVksa0NBQWtDLFFBQTlDOztBQUVBLGVBQVcsVUFBWDtBQUNIOztRQUVPLFEsR0FBQSxR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OiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7Zmxvd2VycywgUG90fSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0ICogYXMgdmlld01vZHVsZSBmcm9tICcuL3ZpZXcuanMnO1xuXG5cbiBmdW5jdGlvbiBhZGRQbGFudCgpIHtcbiAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgdmFyIG5hbWVUZW1wID0gcHJvbXB0KCdFbnRlciBwbGFudCBuYW1lPycsICcnKTtcbiAgIHZhciB3YXRlckZyZXF1ZW5jeSA9IHByb21wdCgnRW50ZXIgd2F0ZXJpbmcgZnJlcXVlbmN5IGluIEhPVVJTJywgJycpO1xuICAgIGlmIChpc05hTih3YXRlckZyZXF1ZW5jeSkpIHtcbiAgICAgICAgd2F0ZXJGcmVxdWVuY3kgPSBwcm9tcHQoJ0VudGVyIE5VTUJFUiBvZiB3YXRlcmluZyBmcmVxdWVuY3knLCAnJyk7XG4gICAgfVxuICAgIHdhdGVyRnJlcXVlbmN5ID0gd2F0ZXJGcmVxdWVuY3kgKiAzNjAwMDAwO1xuICAgIHZhciB3YXRlcmVkID0gY29uZmlybSgnV2F0ZXIgdGhpcyBwbGFudCBhbmQgY2xpY2sgT0snKTtcbiAgICB2YXIgbWluV2F0ZXJUaW1lVGVtcDtcbiAgICB2YXIgbWF4V2F0ZXJUaW1lVGVtcDtcbiAgICBcbiAgICBpZiAod2F0ZXJlZCkgeyBcbiAgICAgICAgbWluV2F0ZXJUaW1lVGVtcCA9IG5ldyBEYXRlKERhdGUucGFyc2Uobm93KSArIHdhdGVyRnJlcXVlbmN5KS50b1N0cmluZygpO1xuICAgICAgICBtYXhXYXRlclRpbWVUZW1wID0gbmV3IERhdGUoRGF0ZS5wYXJzZShtaW5XYXRlclRpbWVUZW1wKSArIHdhdGVyRnJlcXVlbmN5KS50b1N0cmluZygpO1xuICAgIH1cbiAgICBcbiAgICAgdmFyIG5ld1BvdCA9IG5ldyBQb3QobmFtZVRlbXAsIG1pbldhdGVyVGltZVRlbXAsIG1heFdhdGVyVGltZVRlbXAsIHdhdGVyRnJlcXVlbmN5KTtcbiAgICBcbiAgICBmbG93ZXJzLnB1c2gobmV3UG90KTtcblxuICAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc2Z1bGx5IGFkZGVkIG5ldyBwbGFudCBcIiArIG5hbWVUZW1wKTtcbiAgICBcbiAgICB2aWV3TW9kdWxlLnZpZXdQbGFudHMoZmxvd2Vycyk7XG59XG5cbmV4cG9ydCB7YWRkUGxhbnR9IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge3ZpZXdQbGFudHN9ICBmcm9tICcuL3ZpZXcuanMnO1xuaW1wb3J0IHthZGRQbGFudH0gZnJvbSAnLi9hZGQuanMnO1xuaW1wb3J0IHt0cmFja30gZnJvbSAnLi90cmFjay5qcyc7XG5pbXBvcnQge3dhdGVyfSBmcm9tICcuL3dhdGVyLmpzJztcbmltcG9ydCB7c2hvd1BsYW50cywgZGVsZXRlUGxhbnQsIHNhdmVQbGFudHN9IGZyb20gJy4vaW8uanMnO1xuaW1wb3J0IHttZXNzYWdlfSBmcm9tICcuL21lc3NhZ2UuanMnO1xuXG52YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKTtcblxuZnVuY3Rpb24gYXBwKCkge1xuICAgIC8vIGRvZXMgaW5pdGlhbCBzdGFydHVwIGNoZWNrIG9mIGFsbCBmbG93ZXJzXG4gICAgICAgaW5pdGlhbENoZWNrKCk7XG4gICAgICAgXG4gICAvLyB0cmFjaygpIC0gcnVucyB3aGVuIGFwcGxpY2F0aW9uIHRhYiBpcyBvcGVuXG4gICAgICAgIC8vdmFyIHRpbWVJRD0gXG4gICAgICAgIHNldEludGVydmFsKHRyYWNrKCksMzAwMCk7XG5cbiB9O1xuXG4gXG5leHBvcnQgdmFyIGZsb3dlcnMgPSBbXTsgICAgICAgICAgICAgLy8gYXJyYXkgb2YgZmxvd2VycyBvYmplY3RzIFxuXG5cbmV4cG9ydCBmdW5jdGlvbiBQb3QobmFtZSwgbWlud3QsIG1heHd0LCB3ZiApIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubGFzdFdhdGVyVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLm1pbldhdGVyVGltZSA9IG1pbnd0O1xuICAgIHRoaXMubWF4V2F0ZXJUaW1lID0gbWF4d3Q7XG4gICAgdGhpcy53YXRlckZyZXF1ZW5jeSA9IHdmO1xuICAgIHRoaXMubGl2ZSA9IDI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsQ2hlY2soKSB7XG4gICAgdmFyIFNUQVJURURfVElNRSA9IG5ldyBEYXRlKCk7XG4gICAgXG4gICAgY29uc29sZS5sb2coXCJJdCB3b3JrcyEhIVwiKTtcbiAgICBcbiAgICBpZiAoZmxvd2Vycy5sZW5ndGggPT0gMCkge1xuICAgICAgICBsb2FkUGxhbnRzKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGVkIHBsYW50cyBmb3JtIHN0b3JhZ2VcIilcbiAgICB9XG4gICAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGk8Zmxvd2Vycy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmIChTVEFSVEVEX1RJTUUgPiBmbG93ZXJzW2ldLm1heFdhdGVyVGltZSkge1xuICAgICAgICAgICAgZmxvd2Vyc1tpXS5saXZlID0gMDtcbiAgICAgICAgICAgIG1lc3NhZ2UoMywgaSk7XG4gICAgICAgIH0gZWxzZSBcbiAgICAgICAgICAgIG1lc3NhZ2UoMCk7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGxvYWRQbGFudHMoKSB7XG4gICAgIGZsb3dlcnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVtcImZsb3dlcnNcIl0pOyAgLy8gPz8gd2h5IGRvZXNuJ3QgaXQgd29yayBpbiBpby5qcyBcbiAgICAgdmlld1BsYW50cyhmbG93ZXJzKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXJyb3I6IFwiZmxvd2Vyc1wiIGlzIHJlYWQtb25seSB3aGlsZSBwYXJzaW5nIGZpbGU6XG4gICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW1wiZmxvd2Vyc1wiXSkpO1xufTtcblxuXG5cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdhZGRQbGFudCcgKS5vbmNsaWNrID0gKCkgPT4gYWRkUGxhbnQoKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICd3YXRlcicgKS5vbmNsaWNrID0gKCkgPT4gd2F0ZXIoKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdzaG93UGxhbnRzJyApLm9uY2xpY2sgPSAoKSA9PiAgc2hvd1BsYW50cygpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RlbGV0ZVBsYW50JyApLm9uY2xpY2sgPSAoKSA9PiBkZWxldGVQbGFudCgpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2xvYWRQbGFudHMnICkub25jbGljayA9ICgpID0+IGxvYWRQbGFudHMoKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdzYXZlUGxhbnRzJyApLm9uY2xpY2sgPSAoKSA9PiBzYXZlUGxhbnRzKCk7XG5cblxuLy9hcHAoKTtcblxuXG52aWV3UGxhbnRzKGZsb3dlcnMpO1xuIiwiaW1wb3J0IHtmbG93ZXJzfSBmcm9tICcuL2luZGV4LmpzJyA7XG5pbXBvcnQge3ZpZXdQbGFudHN9IGZyb20gJy4vdmlldy5qcyc7XG5cblxuZnVuY3Rpb24gc2F2ZVBsYW50cygpIHsgICAvLyBzYXZlIHBsYW50cyB0byBsb2NhbFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2VbXCJmbG93ZXJzXCJdID0gSlNPTi5zdHJpbmdpZnkoZmxvd2Vycyk7XG4gICAgdmlld1BsYW50cyhmbG93ZXJzKTtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShmbG93ZXJzKSk7XG59O1xuXG5cblxuZnVuY3Rpb24gc2hvd1BsYW50cygpIHtcbiAgICB2YXIgc3RyID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbG93ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGZsb3dlcnNbaV0pO1xuICAgIH1cbiAgICB2aWV3UGxhbnRzKGZsb3dlcnMpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVQbGFudCgpe1xuICAgIHZhciBuYW1lOyAgICBcbiAgICB2YXIgcmFkaW9zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2dyb3VwMScpO1xuXG4gICAgZm9yICh2YXIgaT0gMDsgaTxyYWRpb3MubGVuZ3RoOyBpKyspe1xuICAgICAgICBpZiAocmFkaW9zW2ldLmNoZWNrZWQpe1xuICAgICAgICAgICAgbmFtZSA9IHJhZGlvc1tpXS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB2YXIgaWQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbG93ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChuYW1lID09IGZsb3dlcnNbaV0ubmFtZSkge1xuICAgICAgICAgICAgaWQgPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZsb3dlcnMuc3BsaWNlKGlkLDEpOyBcbiAgICB2aWV3UGxhbnRzKGZsb3dlcnMpO1xufVxuXG5leHBvcnQge2RlbGV0ZVBsYW50LCBzaG93UGxhbnRzLCBzYXZlUGxhbnRzfTsiLCJpbXBvcnQge2Zsb3dlcnN9IGZyb20gJy4vaW5kZXguanMnO1xuXG5mdW5jdGlvbiBtZXNzYWdlKG1zc2dJZCwgaWQsIHRpbWUpe1xuICAgIC8vIGZpbmRzIGZsb3dlciBuYW1lIGJ5IGlkLCBcbiAgICBcbiAgICAvLyBhbGwgaWQncyBhcmUgZ29vZFxuICAgIGlmIChtc3NnSWQgPT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQWxsIHBsYW50cyBhcmUgTGl2ZScpOyAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIC8vIGlkIG5lZWRzIHdhdGVyLCBzaG93cyB0aW1lIHVudGlsIGRlYXRoLFxuICAgIGlmIChtc3NnSWQgPT0gMSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZsb3dlciBcIiArIGZsb3dlcnNbaWRdLm5hbWUgKyAnIG5lZWRzIHdhdGVyICcgKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJZb3UgaGF2ZSBcIiArIGZsb3dlcnNbaWRdLmxpdmUgKyBcIiBob3VycyBsZWZ0IHVudGlsIGl0IGRpZXNcIik7XG4gICAgfVxuICAgIFxuICAgICAvLyBpZCBkb2Vzbid0IG5lZWQgd2F0ZXIsIGJlIGNhcmVmdWwsIC0xIExpZmUsXG4gICAgaWYgKG1zc2dJZCA9PSAyICkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZsb3dlciBcIiArIGZsb3dlcnNbaWRdLm5hbWUgKyAnIGRvZXNudCBuZWVkIHdhdGVyICwgYmUgY2FyZWZ1bCcgKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0l0IGhhcyBvbmx5ICcgKyBmbG93ZXJzW2lkXS5saXZlICsgJyBsaWZlcyBsZWZ0JyApO1xuICAgIH1cbiAgICAvLyBpZCBpcyBkZWFkLFxuICAgIGlmIChtc3NnSWQgPT0gMykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZsb3dlciBcIiArIGZsb3dlcnNbaWRdLm5hbWUgKyAnIGlzIGRlYWQuIFdlIGFyZSBzb3JyeSA6KSkgJyApO1xuICAgIH1cblxufVxuXG5leHBvcnQge21lc3NhZ2V9IiwiaW1wb3J0IHtmbG93ZXJzfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHttZXNzYWdlfSBmcm9tICcuL21lc3NhZ2UuanMnO1xuXG5mdW5jdGlvbiB0cmFjaygpeyBcbiAgICAvLyBydW5zIHdoZW4gYXBwbGljYXRpb24gdGFiIGlzIG9wZW4sIFxuICAgIC8vIG1vbml0b3JzIHdhdGVyaW5nIHRpbWVcbiAgICAvLyB1c2VzIG1lc3NhZ2UgZnVuY3Rpb24gdG8gc2VuZCBtZXNzYWdlIHRvIGNvbnNvbGUgKCB3aXRoIGZsb3dlciBpZCwgc3RhdHVzIGlkIGFuZCB0aW1lKVxuICAgIC8vIHNlbmRzIG1zc2dJZCwgaWQsIHRpbWUgdG8gbWVzc2FnZSBmdW5jdGlvblxuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdUcmFjayBqdXN0IHdvcmtlZCEhISEhJylcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8Zmxvd2Vycy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgdmFyIHRlbXBUaW1lID0gZmxvd2Vyc1tpXS5tYXhXYXRlclRpbWU7XG5cbiAgICAgICAgICAgICBpZiAobm93ID4gZmxvd2Vyc1tpXS5taW5XYXRlclRpbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZUxlZnQgPSAtKCB0ZW1wVGltZS5nZXRIb3VycygpIC0gbm93LmdldEhvdXJzKCkgKSA7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSgxLCBpLCB0aW1lTGVmdCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICBpZiAobm93ID4gZmxvd2Vyc1tpXS5tYXhXYXRlclRpbWUpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlKDMsIGkpXG4gICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICBpZiAoZmxvd2Vyc1tpXS5saXZlID09IDApIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIkZsb3dlclwiICsgZmxvd2Vyc1tpXS5uYW1lICsgXCIgaXMgZGVhZCBub3cuIFdlIGFyZSBzb3JyeSlcIilcbiAgICAgICAgICAgICAgICBtZXNzYWdlKDMsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBjb250aW51ZTtcbiAgICAgICAgfVxuICAgIFxuICAgIH1cblxuXG5leHBvcnQge3RyYWNrfSIsImV4cG9ydCBmdW5jdGlvbiB2aWV3UGxhbnRzKGFycikge1xuICAgIHZhciB0ZW1wSFRNTCA9ICcnO1xuICAgIFxuICAgIGZvciAodmFyIGk9MDsgaTxhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgXG4gICAgICAgIHRlbXBIVE1MICs9ICc8ZGl2IGlkPVwiJyArIFtpXSArICdcIiBjbGFzcz1cImFsbGRpdnNcIj4nO1xuICAgICAgICB0ZW1wSFRNTCArPSAnPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJncm91cDFcIiB2YWx1ZT1cIicgKyBhcnJbaV0ubmFtZSArJ1wiPic7XG4gICAgICAgIHRlbXBIVE1MICs9ICc8c3Bhbj4nICsgJ0Zsb3dlciBuYW1lICcgK2FycltpXS5uYW1lICsgJzwvc3Bhbj4nO1xuICAgICAgICB0ZW1wSFRNTCArPSAnPHNwYW4+JyArICcgTGFzdCB3YXRlcmVkIGF0ICcgKyBhcnJbaV0ubGFzdFdhdGVyVGltZSArICc8L3NwYW4+JztcbiAgICAgICAgdGVtcEhUTUwgKz0gJzxzcGFuPicgKyAnIFNob3VsZCBiZSB3YXRlcmVkIGJlZm9yZSAnICsgYXJyW2ldLm1heFdhdGVyVGltZSArICc8L3NwYW4+JztcbiAgICAgICAgdGVtcEhUTUwgKz0gJzxzcGFuPicgKyAnIERvIG5vdCB3YXRlciB1bnRpbCAnICsgYXJyW2ldLm1pbldhdGVyVGltZSArICc8L3NwYW4+JztcbiAgICAgICAgdGVtcEhUTUwgKz0gJzxzcGFuPicgKyAnIExpdmVzIHJlbWFpbmluZyAnICsgYXJyW2ldLmxpdmUgKyAnPC9zcGFuPic7XG4gICAgICAgIHRlbXBIVE1MICs9ICc8c3Bhbj4nICsgJyBXYXRlcmluZyBmcmVxdWVuY3kgZXZlcnkgJyArIChhcnJbaV0ud2F0ZXJGcmVxdWVuY3kvMzYwMDAwMCkgKyAnIGhvdXJzICcgKyAnPC9zcGFuPic7XG4gICAgICAgIHRlbXBIVE1MICs9ICc8L2Rpdj4nO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0ZW1wSFRNTCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpLmlubmVySFRNTCA9IHRlbXBIVE1MO1xufVxuXG5leHBvcnQge3ZpZXdQbGFudHN9IiwiaW1wb3J0IHtmbG93ZXJzLCBpbml0aWFsQ2hlY2t9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQge21lc3NhZ2V9IGZyb20gJy4vbWVzc2FnZS5qcyc7XG5cbmZ1bmN0aW9uIHdhdGVyKCkge1xuICAgIC8vIGZpbmQgZmxvd2VyIGJ5IGlkIGFuZCBjaGFuZ2VzIGxhc3RXYXRlclRpbWUgdG8gY3VycmVudCwgXG4gICAgLy8gaW5jcmVtZW50cyBtaW4gYW5kIG1heCB3YXRlciB0aW1lcyBieSB3YXRlckZyZXF1ZW5jeVxuICAgIHZhciBuYW1lOyAgICBcbiAgICB2YXIgcmFkaW9zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2dyb3VwMScpO1xuXG4gICAgZm9yICh2YXIgaT0gMDsgaTxyYWRpb3MubGVuZ3RoOyBpKyspe1xuICAgICAgICBpZiAocmFkaW9zW2ldLmNoZWNrZWQpe1xuICAgICAgICAgICAgbmFtZSA9IHJhZGlvc1tpXS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZsb3dlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCBuYW1lID09IGZsb3dlcnNbaV0ubmFtZSApIHtcbiAgICAgICAgICAgIGlmIChmbG93ZXJzW2ldLmxhc3RXYXRlclRpbWUgPCBmbG93ZXJzW2ldLm1pbldhdGVyVGltZSl7XG4gICAgICAgICAgICAgICAgZmxvd2Vyc1tpXS5saXZlID0gZmxvd2Vyc1tpXS5saXZlIC0gMTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYmUgY2FyZWZ1bCAtMSBsaXZlXCIpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmxvd2VyIFwiICsgZmxvd2Vyc1tpXS5uYW1lICsgJyBkb2VzbnQgbmVlZCB3YXRlciAsIGJlIGNhcmVmdWwuIEl0IGhhcyBvbmx5ICcgKyBmbG93ZXJzW2ldLmxpdmUgKyAnIGxpZmVzIGxlZnQgJylcbiAgICAgICAgICAgICAgICBtZXNzYWdlKDIsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgIGZsb3dlcnNbaV0ubGFzdFdhdGVyVGltZSA9IG5ldyBEYXRlKERhdGUucGFyc2Uobm93KSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgZmxvd2Vyc1tpXS5taW5XYXRlclRpbWUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKG5vdykgKyBmbG93ZXJzW2ldLndhdGVyRnJlcXVlbmN5KS50b1N0cmluZygpO1xuICAgICAgICAgICBmbG93ZXJzW2ldLm1heFdhdGVyVGltZSA9IG5ldyBEYXRlKERhdGUucGFyc2UoZmxvd2Vyc1tpXS5taW5XYXRlclRpbWUpICsgZmxvd2Vyc1tpXS53YXRlckZyZXF1ZW5jeSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgY29uc29sZS5sb2coXCJZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgd2F0ZXJlZCBcIiArIGZsb3dlcnNbaV0ubmFtZSApO1xuICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5leHQgd2F0ZXJpbmcgb2ZcIiArIGZsb3dlcnNbaV0ubmFtZSArIFwiIGF0IFwiICsgZmxvd2Vyc1tpXS5taW5XYXRlclRpbWUpO1xuICAgICAgICAgICBjb25zb2xlLmxvZyhcIldhdGVyaW5nIHNob3VsZCBiZSBkb25lIHVudGlsIFwiICsgZmxvd2Vyc1tpXS5tYXhXYXRlclRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluaXRpYWxDaGVjaygpO1xufVxuXG5cbmV4cG9ydCB7d2F0ZXJ9Il19
