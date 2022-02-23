import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { utilService } from './services/utilService.js'
import { storageService } from './services/storage-service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onRemove = onRemove;
window.onGetLocs = onGetLocs;
window.onSave = onSave;
window.onGetUserPos = onGetUserPos;
window.onSave = mapService.onSave;
window.onSearch = onSearch;
// window.onSave = mapService.onSave;


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
    renderLocationsTable()
}

function renderLocationsTable() {
    locService.getLocs()
        .then(res => {
            console.log('locations', res);
            var elTBody = res.map(tr =>
                `
            <tr>         
             <td>${tr.name}</td>
             <td>
                 <button onclick="onPanTo(${tr.lat}, ${tr.lng})" class="btn btn-success">Go</button>
                 <button onclick="onRemove('${tr.id}')" class="btn btn-danger">delete</button>
             </td>                                      
            </tr>
            `).join('')
            document.getElementById('my-positions').innerHTML = elTBody
        })
}

function onRemove(idx) {
    console.log('idx', idx);
    locService.onDelete(idx)
    renderLocationsTable()
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            // console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            mapService.panTo(pos.coords.latitude, pos.coords.longitude);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo(lat, lng) {
    console.log('Panning the Map');
    mapService.panTo(lat, lng);
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onSearch() {
    var address = document.getElementById('search-input').value;
    mapService.addressToPos(address)
        .then(res => {
            locService.addLoc(address, res)
            mapService.panTo(res.lat, res.lng)
        })
    function onSave() {
        var marker = mapService.getMarker()
        var locationPos = document.getElementById('posLocation').value;
        locService.addLoc(locationPos, marker.position);
        renderLocationsTable()
    }