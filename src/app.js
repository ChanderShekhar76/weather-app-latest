const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast') 
const viewPath = path.join(__dirname,'../templetes/views')
const partialPath = path.join(__dirname,'../templetes/partials')
// setup for serving static files 
const staticFilePath = path.join(__dirname,'../public')
app.use(express.static(staticFilePath))
// setup for serving dynaminc templeting
app.set('view engine','hbs')
app.set('views',viewPath)
//setup partials to serve
hbs.registerPartials(partialPath)
//Routes
app.get('',(req,res)=>{
    res.render('index',{title:"Search Weather Here!",author :"theUntold" })
})
app.get('/help',(req,res)=>{
    res.render('help',{title:"User32",author :"theUntold" })
})
app.get('/about',(req,res)=>{
   res.render('about',{title:"User32",author :"theUntold" })
})
app.get('/weather',(req,res)=>{
    let weatherData = {
        location : '',
        foreCast : '',
        temperature : ''
    }
    if(! req.query.address){
        return res.send('Error : No Address, Please provide address.')
    }
    weatherData.location = req.query.address
    geoCode(req.query.address,(error,data)=>{
        if(error){
            return res.send(error)
        }else{
            foreCast(data[0].latitude,data[0].longitude,(err,weaRes)=>{
                if(err){
                    return res.send(err)
                }else{
                    weatherData.temperature=weaRes.temperature
                    weatherData.foreCast=weaRes.weather_description
                    res.send(weatherData)
                }
            })
            
        }
    })
 
    // res.render('weather',{title:"User32",author :"theUntold" })
})
app.get('*',(req,res)=>{
    res.render('404',{title:'404',author: 'theUntold',errorMsg:"Page Not Found"})
})
app.listen(port,()=>{
    console.log("Server has started......")
})