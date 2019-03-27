const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const https = require('https')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static( publicDirectoryPath ))

// Define routes
app.get('',(req, res) => {
    res.render('index', {
       title: 'Weather',
       name : 'Mihai' 
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
       title: 'Weather App',
       name : 'Mihai' 
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        name : 'Mihai' 
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
       return res.send({ error: 'Please provide a location'})
    }
    
    geocode(req.query.address, (error, {location,lat,long}={}) => {
        if(error){
            return res.send({error})
        }else{
            let data= {location}
            forcast(lat , long , (error, response) => {
                if(error){
                return res.send({error})
                }else{
                    data.message = response
                    res.send(data)
                }
            })
        }
    })
    
})

app.get('*',(req, res) => {
    res.render('404',{
        title: 'Not found',
        name : 'Mihai',
        message: 'Error 404'
    })
})

app.listen(port, () => {
    console.log('app is running on port '+ port)
})