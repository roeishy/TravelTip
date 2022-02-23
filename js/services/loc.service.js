import { utilService } from "./utilService.js";
import { storageService } from "./storage-service.js";

export const locService = {
    getLocs,
    addLoc
}

const STORAGE_KEY = 'savesLocs'
var locs = [];

locs = storageService.loadFromStorage(STORAGE_KEY) || [];
console.log(locs);

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function addLoc(name, location) {

    var pos = typeof (location.lat) === 'number' ? location : JSON.parse(JSON.stringify(location.toJSON(), null, 2));

    console.log('pos:', pos);
    var loc = {
        id: utilService.makeId(),
        name: name,
        lat: pos.lat,
        lng: pos.lng,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    locs.push(loc);
    storageService.saveToStorage(STORAGE_KEY, locs);
}


