const request = require('request')

const forcast = (lat,long , callback) => {
    const url ='https://api.darksky.net/forecast/70386ff841f0a23da94273412228955c/'+ lat +','+ long +'?units=si'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('no internet')
        }else if(body.error){
            callback('Location not found')                
        }else{
            callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability  + '% chance to rain.')
        }
    })   
}

module.exports = forcast