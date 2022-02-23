'use strict'

var gMarkers = []

function init() {
    initMap()
}

function initMap(lat = 29.557849020050103, lng = 34.95217964484439, locationName = 'hello world') {
    var elMap = document.getElementById('map');
    var options = {
        center: { lat, lng },
        zoom: 16
    };

    var map = new google.maps.Map(
        elMap,
        options
    );

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: locationName
    });
    gMarkers.push(marker)
    const elBtn = document.createElement("button");
    elBtn.setAttribute("onclick", "onMyLocation()");
    elBtn.innerHTML = `<img class="my-location" src="mylocation.png">`;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(elBtn);
    map.addListener("click", (mapsMouseEvent) => onClickMap(mapsMouseEvent))
}


//TODO save pos as var and call showLocation with the pos
function onMyLocation() {
    navigator.geolocation.getCurrentPosition(showLocation);
}


function showLocation(position) {
    initMap(position.coords.latitude, position.coords.longitude);
}

//TODO add modal to HTML
function onClickMap(ev) {
    document.querySelector('#clicked-pos').innerText = `${JSON.stringify(ev.latLng)}`
    document.getElementById('modal-container').style.display = "block";
}

function closeModal(event) {
    var elModal = document.getElementById('modal-container')
    var elSaveBtn = document.querySelector('#save')
    if (event.target === elModal || event.target === elSaveBtn) {
        elModal.style.display = "none";
    }
}

//TODO add save button to the modal
function onSave() {
    var pos = JSON.parse(document.querySelector('#clicked-pos').innerText);
    let name = document.querySelector('#pos-name').value
    createLocation(pos, name);
    renderSavedLocations()
}

//TODO render to 222
function renderSavedLocations() {
    const pos = getSavedPos();
    let strHTMLs = pos.map(pos =>
        `<div class="pos">
        ${pos.name}
     </div>`
    )

    document.querySelector('.saved-locations').innerHTML = strHTMLs.join('');
}