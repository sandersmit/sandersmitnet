// console.log("testing");

// var map, infoWindow;
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



// function succes(position) {
//             var pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude
//             };
//             window.myCurrentPos = pos;
//              console.log("geo! active in browser"+window.myCurrentPos);
//             infoWindow.setPosition(pos);
//             infoWindow.setContent('Location found.');
//             infoWindow.open(map);
//             map.setCenter(pos);
//       }
// var options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
// };

// function error(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
// }
// navigator.geolocation.getCurrentPosition(succes, error, options);
// //navigator.geolocation.getCurrentPosition(succes, error);
// document.querySelector('.testingbtn').addEventListener('click', currentpos);

// function currentpos() {
//     console.log(window.myCurrentPos.lat);
//      console.log(window.myCurrentPos.lng);
// }