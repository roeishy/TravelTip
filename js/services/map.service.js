export const mapService = {
    initMap,
    addMarker,
    panTo
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
    const contentString = '<input type="text" placeholder="Enter the locations name" ><button>save</button>';//TODO onclick addLoc name and gMarker
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
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
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