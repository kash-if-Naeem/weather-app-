const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=ae6af7ce7112da9032120b30c10b3b20`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to server', undefined)
        } else if(body.message){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `Summary: ${body.daily[0].weather[0].description}. It is currently ${body.current.temp} degrees out. There is a ${body.current.clouds}% chace of rain. `)
        }
    })
}

module.exports = forecast