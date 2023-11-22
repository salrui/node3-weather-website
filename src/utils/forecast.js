const request = require('request')

const forecast = (address, callback) => {
        
    const url= `http://api.weatherstack.com/current?access_key=db17b219937924e14792ce34b25abee4&query=${address}&units=m`;

    request({url, json:true}, (error, {body}) => {

        if(error) {
            return callback(`Unable to connect to weather service`, undefined)
        }

        if(body.error) {
            return callback(`Unable to find the location`, undefined)
        }

        return callback(undefined, {
            forecast: body.current.weather_descriptions[0],
            temperature: body.current.temperature,
            feelslike:body.current.feelslike,
            address            
        })


    }) 

}

module.exports = forecast