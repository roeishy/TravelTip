export const locService = {
    getLocs,
    addLoc
}

const STORAGE_KEY = 'savesLocs'
const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function addLoc(name, lat, lng) {
    console.log('name, lat, lng', name, lat, lng);
    // var loc = {
    //     id: utilService.makeId(),
    //     name: name,
    //     lat: lat,
    //     lng: lng,
    //     createdAt: Date.now(),
    //     updatedAt: Date.now()
    // }
    // locs.push(loc);
    // storageService.saveToStorage(STORAGE_KEY, locs);
}


