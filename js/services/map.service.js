import { locService } from './loc.service.js';


export const mapService = {
    initMap,
    addMarker,
    panTo,
    addressToPos,
    getMarker
    //onSave
}



var gMap;
var gMarker;


function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            const elBtn = document.createElement("button");
            elBtn.setAttribute("onclick", "onGetUserPos()");
            elBtn.innerHTML = `<img class="my-location" src="mylocation.png">`;
            gMap.controls[google.maps.ControlPosition.TOP_CENTER].push(elBtn);
            console.log('Map!', gMap);
            gMap.addListener("click", (mapsMouseEvent) => addMarker(mapsMouseEvent.latLng))
        })
}

function addMarker(loc) {
    if (gMarker) {
        gMarker.setMap(null);
    }
    const contentString = `
    <input type="text" placeholder="Enter the locations name" id="posLocation" class="ms-2 form-control"">
    <button class="ms-2 btn btn-primary" style="width: 100%" onclick="onSave()">save</button>
    `

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            gMap,
            shouldFocus: false,
        });
    });
    gMarker = marker;
    console.log('gMarker.pos', marker.position);
    return marker;
}

// function onSave() {
//     var locationPos = document.getElementById('posLocation').value;
//     locService.addLoc(locationPos, gMarker.position);
//     location.reload()
// }

function getMarker() {
    return gMarker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function addressToPos(address) {
    const API_KEY = 'AIzaSyCKzNT2YpgIvKoDvFxzu0Mjob7W04jiQV0';
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(res => {
            var latLng = {
                lat: res.data.results[0].geometry.location.lat,
                lng: res.data.results[0].geometry.location.lng
            }
            return latLng;
        })
        .catch(err => {
            console.log('Had Issues', err)
            throw err
        })
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCKzNT2YpgIvKoDvFxzu0Mjob7W04jiQV0';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


