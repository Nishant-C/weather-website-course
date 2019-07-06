
const request = require('request')

const forecast = ( lat, long, callback ) => {
    var url = `https://api.darksky.net/forecast/05189a3e2a35763e5631048ad6b058db/${lat},${long}?units=si`
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback("weather service not available", undefined)
        } else if(body.error){
            callback("No place found!!", undefined)
        }else{
            const temp = body.currently.temperature
            const perc = body.currently.precipProbability
    
            callback(undefined, `${body.daily.data[0].summary} It is currently ${temp} outside and ${perc}% chance of rain`)
        }
    })
}

module.exports = forecast