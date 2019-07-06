const request = require('request')

const geocoding = (address, callback) => {
    var url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmlzaGFudDE1NyIsImEiOiJjandyZ2g2Y2YxaXpsM3luc3FqdGY5dDhrIn0.QD8waIlhJtKVTVmTiyv3cw&limit=1`
 
    request({ url, json: true}, (error, { body }) => {
        if (error) {
             callback('Unable to connect to location service', undefined)
        } else if (body.features.length === 0 ){
            callback('Unable to find locaiton', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
 
        }
    })
 }

 module.exports = geocoding