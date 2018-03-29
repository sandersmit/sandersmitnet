// 'use strict';
/*jshint esversion: 6 */
console.log("init.js");
const adres1 = document.querySelector('.adres1');
const adres2 = document.querySelector('.adres2');
const adres3 = document.querySelector('.adres3');
const adres4 = document.querySelector('.adres4');
const adres5 = document.querySelector('.adres5');
const adres6 = document.querySelector('.adres6');
const module5 = document.querySelector('.module5');
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBzDUeHW9HM2ONlUsVuZn542aupdY9dE8o",
    authDomain: "voedselbank-1a8c7.firebaseapp.com",
    databaseURL: "https://voedselbank-1a8c7.firebaseio.com",
    projectId: "voedselbank-1a8c7",
    storageBucket: "voedselbank-1a8c7.appspot.com",
    messagingSenderId: "1069610669266"
};
firebase.initializeApp(config);
//invoerbutton
const invoerBtn = document.querySelector('.invoeren');
//get references
// const dbRefObject = firebase.database().ref();
// dbRefObject.once("value").then(function(snapshot) {
//     var key = snapshot.key; // "ada"
//     var theval = snapshot.val();
//     var childKey = snapshot.child("adressen").key; // "last"
//     // console.log(childKey);
//     console.log(childKey);
//     // console.log(theval);
// });
//1 MALIG OP de laatste CHILD_ADDED
// Retrieve new posts as they are added to our database

//Old
//
//firebase.database().ref("adressen").on("child_added", implement);

//NEW
//
firebase.database().ref("mijnadressen").on("child_added", implement);
let teller = 0;

function implement(snapshot, prevChildKey) {
    var hetadres = snapshot.val().adres;
    console.log("Het adres is: "+ hetadres );
    // console.log(newPost);
    // console.log( prevChildKey);
    teller++;
    checkTotaldrivers(teller);
    myCreativeFunction(snapshot , hetadres);
}
//1 MALIG OP de alle VALUE is het SNAPSHOT argument
// var adressenlijst = firebase.database().ref("adres");
// s = 1;
// adressenlijst.child().on("value", implement2);
// function implement2(snapshot) {
//    snapshot.forEach(function(data) {
//         console.log("id is " + data.key + " adres is " + data.val());
//         //const hetadres = snapshot.val();
//         console.log("test");
//        //myCreativeFunction(hetadres);
//    });
// }
var query = firebase.database().ref("mijnadressen");
query.once("value").then(function(snapshot) {
    const arrayIds = [];
    //const theKey = snapshot.child("-L8336y5iQlEFQXXr2Ro").val().actiefstatus;
    //console.log("childSnapshot: " + theKey);
    snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var status = childSnapshot.val().actiefstatus;
        console.log("id is " + key + " status is " + status);
        arrayIds.push(key);
    });
    readArrayIDs(arrayIds, snapshot);

    function readArrayIDs(arrayIds, snapshot) {
        console.log("arrayIds: "+ arrayIds);
        fillOrderSelection(arrayIds, snapshot);
    }
});


function fillOrderSelection(arrayIds, snapshot) {
    //console.log("key uit fillOrderSelection"+ key);
    const bezorgStatusUpdateBtn = document.querySelector(".bezorgStatusUpdate");
    //const Idbeschikbaarlopendebestellingen = key;
    const newSnap = snapshot;
    //const theKey2 = snapshot.child("-L87GMs7ELpgnWJRMEpd").val().actiefstatus;
    
    let adresArray = [];
    snapshot.forEach(function(childSnapshot) {
        var eenadres = childSnapshot.val().adres;
        console.log("eenadres: " + eenadres);
        adresArray.push(eenadres);
        
    });


    let OrderID = 0;
    arrayIds.forEach(function(data) {
         let newoption = document.createElement("option");
        newoption.value = arrayIds[OrderID];
        newoption.textContent = "bestelling: " + adresArray[OrderID];
        console.log("testing: "+OrderID);
         document.querySelector(".beschikbaarlopendebestellingen").appendChild(newoption);
        OrderID++;
    });

    bezorgStatusUpdateBtn.addEventListener("click", updatebestelling);

    function updatebestelling() {
        
        //status leeg of vol
        let beschikbaarlopendebestellingen = document.querySelector(".beschikbaarlopendebestellingen");
        let beschikbarheidVal = document.querySelector('input[name="beschikbaar"]:checked').value;
        let beschikbaarlopendebestellingenVal = beschikbaarlopendebestellingen.options[beschikbaarlopendebestellingen.selectedIndex].value;

        //status actief of inactief
        let actieflopendebestellingen = document.querySelector(".status");
        let statusVal = document.querySelector('input[name="actief"]:checked').value;
        //let statuslopendebestellingenVal = actieflopendebestellingen.options[actieflopendebestellingen.selectedIndex].value;


        console.log("selected bestelling "+ beschikbaarlopendebestellingenVal);
        console.log("selected update "+ beschikbarheidVal);
        console.log("selected update "+ statusVal);

        let newPostRef = newSnap.child(beschikbaarlopendebestellingenVal);
        // console.log("object"+ newPostRef);
        // console.log("id id: "+ newPostRef.key);
        // console.log("value from key in the Id: "+newPostRef.val().actiefstatus);

        //console.log("updatebestelling "+newSnap.child(event.target.value).val().actiefstatus);
        //var newPostRef = newSnap.child(event.target.value);
        
        /////////!!!!update!!

        let mijnUpdate = {
            beschikbaar:beschikbarheidVal,
            actiefstatus:statusVal
                }
        if (beschikbaarlopendebestellingenVal !== "selecteer bestelling") {
             console.log("bestelling geupdate! "+ beschikbaarlopendebestellingenVal);
             query.child(newPostRef.key).update(mijnUpdate);
        }else{
             console.log("geen bestelling geselecteerd!");
        }
       
        
        
    }
    //beschikbaarlopendebestellingen.options[select.selectedIndex].value = Idbeschikbaarlopendebestellingen;
    //beschikbaarlopendebestellingen.options[select.selectedIndex].textContent = Idbeschikbaarlopendebestellingen;
    //console.log(Idbeschikbaarlopendebestellingen);
}


function addingObject(invoerAdres) {

    // const invoerAdres = document.querySelector('.invoeradres').value;
    // console.log(invoeradres);
    // firebase.database().ref().child('adressen').push(invoerAdres);

    var query = firebase.database().ref("mijnadressen");
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // key will be "ada" the first time and "alan" the second time
            var key = childSnapshot.key;
            // childData will be the actual contents of the child
            var status = childSnapshot.val().actiefstatus;
            console.log("id is " + key + " status is " + status + " adres is: " + invoerAdres);
        });
    });
    var newPostRef = query.push();
    newPostRef.set({
        //L87spaH5tZTsi9MI6Zo:{
        adres: invoerAdres,
        actiefstatus: "ja",
        beschikbaar: "leeg",
        telefoon:"00000000"
        //}
    });
    //query.child('mijnadressen').push(invoerAdres);
}
// document.querySelector('.testingbtn').addEventListener('click', nieuwObject);

// function nieuwObject() {
//     //get elements
//     const invoerAdres = document.querySelector('.invoeradrestest').value;
//     console.log(invoerAdres);
//     addingObject(invoerAdres)
// }

function myCreativeFunction(snapshot, hetadres) {
    console.log("!!" + snapshot.val().adres);
    // console.log("!!" + snapshot);
    snapshot.forEach(function(childSnapshot) {
            // key will be "ada" the first time and "alan" the second time
            var key = childSnapshot.key;
            // childData will be the actual contents of the child
            var status = childSnapshot.val();
            console.log("id is " + key + " status is " + status + " adres is: ");
        });
    var listitem = document.createElement("li");
    var inputfield = document.createElement("input");
    inputfield.setAttribute('data-id', snapshot.key);
    inputfield.setAttribute('data-adres', snapshot.val().adres);
    inputfield.setAttribute('data-status', snapshot.val().actiefstatus);
    inputfield.setAttribute('data-ruimte', snapshot.val().beschikbaar);
    inputfield.setAttribute('data-telefoon', snapshot.val().telefoon);
    inputfield.setAttribute("type", "radio");
    inputfield.setAttribute("value", hetadres);
    inputfield.setAttribute("name", "adres");
    document.querySelector(".adresoverzicht").appendChild(listitem);
    listitem.appendChild(inputfield);
    inputfield.after(hetadres);
    inputfield.addEventListener("click", giveValue);
}

function giveValue(){
        console.log(event.target.value);
            var bekijkBtn = document.querySelector(".bekijk");
            bekijkBtn.value = event.target.value;
            bekijkBtn.addEventListener("click", selectVervoer);
    }



// function afstandCheck(straal, vervoerselectie, beschikbaarheidselectie) {
//     var selectElement = document.querySelector(".straal");
//     var straal = selectElement.options[select.selectedIndex].value;
//     console.log("straal: " + straal + "km");
//     selectVervoer(vervoerselectie, beschikbaarheidselectie, straal);
// }
// var select = document.querySelector(".straal");
// select.addEventListener('change', afstandCheck);
invoerBtn.addEventListener('click', nieuwadres);

function nieuwadres(invoeradres) {
    //get elements  
    const invoerAdres = document.querySelector('.invoeradres').value;
    console.log(invoeradres);
    addingObject(invoerAdres)
   // firebase.database().ref().child('adressen').push(invoerAdres);
}

function checkTotaldrivers(teller) {
    console.log("tellen" + teller);
    document.querySelector('.counter').textContent = teller;
}

var map, infoWindow;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
map = new google.maps.Map(document.getElementById('map'), {
    //center: {lat: -34.397, lng: 150.644}
    zoom: 10
});
var myObject = {
    directionsService: directionsService,
    directionsDisplay: directionsDisplay,
    testing() {
        console.log(this.directionsService)
    }
}
myObject.directionsDisplay.setMap(map);
infoWindow = new google.maps.InfoWindow;

function succes(position) {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    window.myCurrentPos = pos;
    console.log("geo! active in browser" + window.myCurrentPos);
    console.log("  my latitude: " + pos.lat + " my latitude: " + pos.lng)
    infoWindow.setPosition(pos);
    infoWindow.setContent('Hier bent u nu');
    infoWindow.open(map);
    map.setCenter(pos);
}
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
navigator.geolocation.getCurrentPosition(succes, error, options);
//navigator.geolocation.getCurrentPosition(succes, error);
function currentpos() {
    console.log(window.myCurrentPos.lat);
    console.log(window.myCurrentPos.lng);
}
//var onClickHandler = function() {
function handlethis(myObject, myData, pos) {
    calcRoute(myObject, myData);
}
//  };
//}
function calcRoute(myObject, myData) {
    console.log("route aangevraagd!");
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

function showInfoDriver(myData, myData2) {
    
    const TheselectedAdres = document.querySelector('.adresoverzicht input[name="adres"]:checked');

    const selectedAdres = TheselectedAdres.getAttribute("data-adres");
    const selectedStatus = TheselectedAdres.getAttribute("data-status");
    const selectedbeschikbaar = TheselectedAdres.getAttribute("data-ruimte");
    const selectedTelefoon = TheselectedAdres.getAttribute("data-telefoon");
    //if (selectedAdres) {
            console.log("selected Adres is : "+ selectedAdres);
      //  }

    const dataLijst = document.querySelector('.statusList');
    
    dataLijst.setAttribute('data-afstand', myData.afstand);
    dataLijst.setAttribute('data-reistijd', myData.reistijd);
    dataLijst.setAttribute('data-beschikbaarheid', selectedbeschikbaar);
    dataLijst.setAttribute('data-actiefselectie', selectedStatus);
    dataLijst.setAttribute('data-telefoon', selectedTelefoon);
    dataLijst.setAttribute('data-adresselectie', selectedAdres);
    
    const afstandData = dataLijst.getAttribute("data-afstand");
    const reistijdData = dataLijst.getAttribute("data-reistijd");
    const beschikbaarheidData = dataLijst.getAttribute("data-beschikbaarheid");
    const actiefselectie = dataLijst.getAttribute("data-actiefselectie");
    const telefoonselectie = dataLijst.getAttribute("data-telefoon");
    const adresselectie = dataLijst.getAttribute("data-adresselectie");
    
    document.querySelector(".adres").textContent = adresselectie;
    document.querySelector(".afstand").textContent = afstandData;
    document.querySelector(".tijd").textContent = reistijdData;
    document.querySelector(".telefoon").textContent = telefoonselectie;
    document.querySelector(".beschikbaar").textContent = beschikbaarheidData;
    document.querySelector(".actief").textContent = actiefselectie;
}


document.querySelector('.fetchingBtn').addEventListener('click', getJson);
//document.querySelector('.fetchingBtnUpdate').addEventListener('click', getJson);

function getJson(myData2) {
    module5.scrollIntoView({ block: "start" });
    console.log("myData2: " + myData2)
    var customVertrekpunt = adres1.value;
    var customBezorgpunt = adres2.value;
    if (myData2.vertrekpunt) {
        console.log("autovertrekpunt: " + myData2.vertrekpunt)
        customVertrekpunt = myData2.vertrekpunt;
        customBezorgpunt = myData2.myselectedAdres;
    }
    if (adres3.value !== "") {
        customBezorgpunt = adres3.value;
        console.log("adres3 output!!!!");
    }
    fetch('https://maps.googleapis.com/maps/api/distancematrix/json?mode=' + myData2.vervoerselectie + '&units=imperial&origins=' + customVertrekpunt + '&destinations=' + customBezorgpunt + '&key=AIzaSyCT5lbfVyUI0LqCbhgMJqpsNXcDXqKk2QY').then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        console.log(data.rows[0].elements[0].duration.text);
        console.log(data.rows[0].elements[0].distance.value / 1000);
        const reistijd = data.rows[0].elements[0].duration.text;
        const afstand = data.rows[0].elements[0].distance.value / 1000;
        const vertrekpunt = data.origin_addresses[0];
        if (myData2.vertrekpunt) {
            const vertrekpunt = myData2.vertrekpunt;
        }
        const eindpunt = data.destination_addresses[0];
        const myData = {
            AllData: data,
            vertrekpunt: vertrekpunt,
            eindpunt: eindpunt,
            reistijd: reistijd,
            afstand: afstand
        }
        handlethis(myObject, myData);
        showInfoDriver(myData, myData2);
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
document.querySelector('.fetchingBtn2').addEventListener('click', getJson2);

function selectVervoer(beschikbaarheidselectie, vervoerselectie, actiefselectie) {
    const vervoerInput = document.querySelectorAll('.vervoerselectie');
    vervoerInput.forEach(function(newdata) {
        //console.log(newdata.value);
        console.log("selectVervoer!!")
        if (newdata.checked) {
            //console.log("checked!" + newdata.value);
            vervoerselectie = newdata.value;
            //console.log("checked!" + newdata.value);
            // getJson2(vervoerselectie);
            selectBeschikbaarheid(beschikbaarheidselectie, vervoerselectie, actiefselectie);
        }
    })
}



function selectBeschikbaarheid(beschikbaarheidselectie, vervoerselectie, actiefselectie) {
    console.log("selectBeschikbaarheid");
    const beschikbaarheidsInput = document.querySelectorAll('.beschikbaarheidselectie');
    beschikbaarheidsInput.forEach(function(newdata) {
        //newdata.addEventListener('click', selectBeschikbaarheid);
        if (newdata.checked) {
            console.log("beschikbaarheidscheck: " + newdata.value);
            beschikbaarheidselectie = newdata.value;
            selectActief(beschikbaarheidselectie, vervoerselectie, actiefselectie);
        }
    })
}

function selectActief(beschikbaarheidselectie, vervoerselectie, actiefselectie) {
    console.log("actiefselectie");
    const actiefheidsInput = document.querySelectorAll('.actiefselectie');
    actiefheidsInput.forEach(function(newdata) {
        //newdata.addEventListener('click', selectBeschikbaarheid);
        if (newdata.checked) {
            console.log("actiefheidsInput: " + newdata.value);
            actiefselectie = newdata.value;
            getJson2(beschikbaarheidselectie, vervoerselectie, actiefselectie);
        }
    })
}
//selectBeschikbaarheid();
function getJson2(beschikbaarheidselectie, vervoerselectie, actiefselectie) {
    console.log("actiefselectie: " + actiefselectie);
    console.log("selectieVervoer: " + vervoerselectie);
    console.log("selectieBeschikbaarheid: " + beschikbaarheidselectie);
    const myselectedAdres = event.target.value;
    console.log("myCurrentpos: " + window.myCurrentPos.lat);
    console.log("myCurrentpos: " + window.myCurrentPos.lng);
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + window.myCurrentPos.lat + ',' + window.myCurrentPos.lng + '&key=AIzaSyCT5lbfVyUI0LqCbhgMJqpsNXcDXqKk2QY').then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log("nieuwData getJson2:" + data);
        const vertrekpunt = data.results[0].formatted_address;
        console.log("nieuwVertrekpunt!!!!!:" + vertrekpunt);
        const myData2 = {
            AllData: data,
            vertrekpunt: vertrekpunt,
            myselectedAdres: myselectedAdres,
            vervoerselectie: vervoerselectie,
            beschikbaarheidselectie: beschikbaarheidselectie,
            actiefselectie: actiefselectie
        }
        getJson(myData2)
        //handlethis(myObject, myData);
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
    }).then(function() {}).catch(function(error) {
        console.log(error);
    })
}

