const path = require('path') //a core module for providing paths
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000


// *******define paths for express config
// due to abs path we use path.join to get to the required path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handbars engine and views location
app.set('view engine', 'hbs') // to load the view template
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(publicDirectoryPath)) // for static data in public dir

//to render index to brower
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kashif'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kashif'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Contact us at +92-349*******',
        title: 'Help',
        name: 'Kashif'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return  res.send({
            error: 'Provide address for getting weather'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({
                error
             })
        }

        forecast(latitude, longitude, ( error, forecastData) => {
            if(error){
                return res.send({
                error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    }) 
    
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Enter search'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'help article not found',
        name: 'Kashif'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Kashif'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})