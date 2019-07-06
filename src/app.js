const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = expgitress();

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public') 
const helpPagePath  = path.join(publicDirPath, 'help.html');
const aboutPagePath = path.join(publicDirPath,'about.html');

const viewPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname,"../template/partials");


//set up handle bars engine and views location~
app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDirPath ))

app.get('', (req,res) =>{
    res.render("index", {
        title: "Weather App",
        name: "Nishant",
        img_src: "/img/robot.png"
    })
});

app.get('/about', (req,res) =>{
    res.render("about", {
        title: "About",
        img_src: "/img/robot.png",
        name: "Nishant"
    })
});

app.get('/help', (req,res) =>{
    res.render("help", {
        message: "This is the FAQ page",
        title: "Help Page",
        name: "Nishant",
        img_src: "/img/robot.png"
    })
});

app.get('/weather', (req,res) =>{

    if(!req.query.address) {  //req.query: To read the query elements in URL
        return res.send({
            error: "You must pass an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
        debugger
        if ( error ) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if ( error ) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                location: location,
                weather: forecastData
            })
        })
    })
})


app.get('/help/*', (req,res) => {
    res.render("404",{
        message: "Help Article not found",
        title: "404",
        name:"Nishant",
        img_src: "/img/robot.png"
    });
})

app.get('*', (req,res) => {
    res.render("404",{
        message: "Page not found",
        title: "404",
        name:"Nishant",
        img_src: "/img/robot.png"
    });
})
app.listen(3000, () => {
    console.log('server is up on port 3000.')
})