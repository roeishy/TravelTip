'use strict'

const STORAGE_KEY = 'SavedLocations'
var gSavedLocations = [];

function createLocation(pos, name) {
    var location = {
        id: makeId(),
        name: name,
        pos,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    gSavedLocations.push(location);
    saveToStorage(STORAGE_KEY, gSavedLocations)
}

// function _saveLocsToStorage() {
//     saveToStorage(STORAGE_KEY, gSavedPos)
// }

function getSavedPos() {
    gSavedLocations = loadFromStorage(STORAGE_KEY);
    return gSavedLocations;
}