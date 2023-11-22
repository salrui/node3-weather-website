const path = require('path')
const express = require('express');
const hbs = require('hbs')
const chalk = require('chalk');

const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Setup for the view directory 
app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup static directory server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    console.log('main')
    res.render('index', {
        title: 'Weather',
        author: 'rms'
    })
})

app.get('/about', (req, res) => {
    console.log('about')
    res.render('about', {
        title: 'About',
        author:'rms'
    })
})

app.get('/help', (req, res) => {
    console.log('Help')
    res.render('help', {
        title: 'Help Page',
        message: 'loren text max...........................................................',
        author:'rms'
    })
})

app.get('/weather', (req, res) => {

    // Check that address is part of the  request
    if(!req.query.address) {
        return res.send({
            message: `Please provide and address`
        })
    }

    forecast(req.query.address, (error, data) => {
        if(error) {
            return res.send({error})
        }

        res.send(data)
    })
})

app.get('/help/*', (req, res) => {    
    res.render('404', {
        title: 'Help Error',
        message: 'Help article not found!',
        author: 'rms'
    })
})


app.get('*', (req, res) => {    
    res.render('404', {
        title: 'Error',
        message: 'Page not found',
        author: 'rms'
    })
})

app.get('/weather', (req, res) => {
    console.log('weather')
    res.send('Weather Page')
})







app.listen(3000, () => {
    console.log( chalk.green.bold(`Server is running in port 3000`))
})