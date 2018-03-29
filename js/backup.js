// 'use strict';
/*jshint esversion: 6 */
console.log("init.js");
const adres1 = document.querySelector('.adres1');
const adres2 = document.querySelector('.adres2');

function passFromValue() {
    var x = 15;
    return x;
}

function passToValue(pos) {
    var y = passFromValue();
    console.log(y); //15
    console.log(pos);
    console.log(window.crd);
    // var b = startPostion();
    // console.log(b);//coordinates
}
//Set Es6
// let s = new Set()
// s.add("hello").add("goodbye").add("hello")
// s.size === 2
// s.has("hello") === true
// for (let key of s.values()) // insertion order
//     console.log(key)
// //Map Es6
// let m = new Map()
// let mysymbol = Symbol()
// m.set("hello", 42)
// m.set(s, 34)
// m.get(s) === 34
// m.size === 2
// for (let [ key, val ] of m.entries())
//     console.log(key + " = " + val)
//console.log("inputloging"+adres1.value);
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
// window.addEventListener('load',function(){
//   var script = document.createElement('script');
//   script.type = 'text/javascript';
//   script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCT5lbfVyUI0LqCbhgMJqpsNXcDXqKk2QY';
//   document.body.appendChild(script);
//   start();
// });
// var map, infoWindow;
// console.log('init map');
// var directionsService = new google.maps.DirectionsService();
// var directionsDisplay = new google.maps.DirectionsRenderer();
// map = new google.maps.Map(document.getElementById('map'), {
//     //center: {lat: -34.397, lng: 150.644}
//     zoom: 6
// });
// var myObject = {
//     directionsService: directionsService,
//     directionsDisplay: directionsDisplay,
//     testing() {
//         console.log(this.directionsService)
//     }
// }
// myObject.directionsDisplay.setMap(map);
// infoWindow = new google.maps.InfoWindow;



   
       
       // navigator.geolocation.getCurrentPosition(sander);

        // function sander(pos) {
        //     console.log('sander');
        //     var crd = pos.coords;
        //     window.crd = pos.coords;
        //     console.log('Your current position is:');
        //     console.log(`Latitude : ${crd.latitude}`);
        //     console.log(`Longitude: ${crd.longitude}`);
        //     console.log(`More or less ${crd.accuracy} meters.`);
        //     passToValue(pos);
        // }



//function sander(position) {
            // var pos = {
            //     lat: position.coords.latitude,
            //     lng: position.coords.longitude
            // };
            // window.myCurrentPos = pos.coords;
            //  console.log("geo! active in browser");
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            // map.setCenter(pos);
   //   }


var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function succes(pos) {
    var crd = pos.coords;
    window.crd = pos.coords;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    passToValue(pos);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
navigator.geolocation.getCurrentPosition(succes, error, options);
document.querySelector('.fetchingBtn2').addEventListener('click', currentpos);

function currentpos(pos) {
    console.log(window.myCurrentPos);
}
//var onClickHandler = function() {
function handlethis(myObject, myData, pos) {
    calcRoute(myObject, myData);
}
//  };
//}
function calcRoute(myObject, myData) {
    //var start = document.getElementById('start').value;
    //var end = document.getElementById('end').value;
    console.log("nieuw" + myData.vertrekpunt);
    console.log("nieuw" + myData.eindpunt);
    var request = {
        origin: myData.vertrekpunt,
        destination: myData.eindpunt,
        travelMode: 'DRIVING'
    };
    myObject.directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            myObject.directionsDisplay.setDirections(result);
        }
    });
}
document.querySelector('.fetchingBtn').addEventListener('click', getJson);

function getJson() {
    fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + adres1.value + '&destinations=' + adres2.value + '&key=AIzaSyCT5lbfVyUI0LqCbhgMJqpsNXcDXqKk2QY').then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        console.log(data.rows[0].elements[0].duration.text);
        console.log(data.rows[0].elements[0].distance.value / 1000);
        const reistijd = data.rows[0].elements[0].duration.text;
        const afstand = data.rows[0].elements[0].distance.value / 1000;
        const vertrekpunt = data.origin_addresses[0];
        const eindpunt = data.destination_addresses[0];
        const myData = {
            AllData: data,
            vertrekpunt: vertrekpunt,
            eindpunt: eindpunt
        }
        handlethis(myObject, myData);
        //let output = '';
        // data.forEach(function(dataItem) {
        //     console.log(dataItem);
        //     //output += `<li>${dataItem.title}</li>`;
        // })
        //document.getElementById('output2').innerHTML = output;
    }).then(function() {}).catch(function(error) {
        console.log(error);
    })
}

function getJson2(pos, myCurrentPos) {
    console.log("!!!" + window.crd);
    console.log("latitudePos: " + myCurrentPos);
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.lat + ',' + pos.lng + '&key=AIzaSyCT5lbfVyUI0LqCbhgMJqpsNXcDXqKk2QY').then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        // console.log(data.rows[0].elements[0].duration.text);
        // console.log(data.rows[0].elements[0].distance.value / 1000);
        // const reistijd = data.rows[0].elements[0].duration.text;
        // const afstand = data.rows[0].elements[0].distance.value / 1000;
        // const vertrekpunt = data.origin_addresses[0];
        // const eindpunt = data.destination_addresses[0];
        // const myData ={
        //  vertrekpunt:vertrekpunt,
        //  eindpunt:eindpunt
        // }
        // handlethis(myObject, myData);
        //let output = '';
        // data.forEach(function(dataItem) {
        //     console.log(dataItem);
        //     //output += `<li>${dataItem.title}</li>`;
        // })
        //document.getElementById('output2').innerHTML = output;
    }).then(function() {}).catch(function(error) {
        console.log(error);
    })
}

function fetchPromisemMapsApi() {
    console.log('from' + adres1.value);
    console.log('destination_addres' + adres2.value);
    //i++;
    return new Promise(function(resolve, reject) {
        //fetch('http://localhost:9999/mapsresults.json',{'mode': 'no-cors'})
        fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=hoorn&destinations=amsterdam&key=AIzaSyCT5lbfVyUI0LqCbhgMJqpsNXcDXqKk2QY', {
                method: 'POST',
                mode: 'no-cors',
                // credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'text',
                }
            })
            //fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ adres1.value +'&destinations='+ adres2.value +'&key=AIzaSyCT5lbfVyUI0LqCbhgMJqpsNXcDXqKk2QY');
            //fetch('https://jsonplaceholder.typicode.com/users')
            .then(function(response) {
                console.log(response);
                return response.json();
            }).then(function(data) {
                resolve(data);
                //countertest(data);
                //console.log('testing data: ' + data.photos[i].img_src);
                //console.log('testing data: ' + data);
                // let alldata = data.photos;
                console.log(data);
                // console.log(data.destination_addresses);
                // console.log(data.origin_addresses);
                // const reistijd = data.rows[0].elements[0].duration.text;
                // const afstand = data.rows[0].elements[0].distance.value / 1000;
                //  console.log("afstand: " + afstand);
                //  console.log("reistijd: " + reistijd);
                // data.photos.forEach(function(dataItems){
                //   console.log(dataItems);
                // });
                //addDataBlock(data);
                // data.rows.forEach(function(dataItems){
                //   console.log(dataItems);
                // });
            }).catch(function(error) {
                reject(error);
                console.log('this is the fetchNasaApi error');
            })
    });
}