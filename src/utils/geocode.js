const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibWloYWl0IiwiYSI6ImNqdG9veTJtNzFueWQzeXFqdmxtMnVxaXkifQ.YQ0D4lFVDCCW2kDtH0l7Sw&limit=1"
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('No internet')
        }else if(body.features.length == 0){
            callback('Location not found')
        }else{
            callback(undefined, {
              lat : body.features[0].center[1],
              long : body.features[0].center[0],
              location: body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode