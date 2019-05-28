const path=require("path")
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')
const express=require('express')
const hbs=require('hbs')
const app=express()
const port=process.env.PORT || 3000

// define path for express config

// static dir to serve
app.use(express.static(path.join(__dirname,"../public")))
const partialsPath=path.join(__dirname,'../templates/partials')

const viewsPath=path.join(__dirname,"../templates/views")
// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
  res.render('index', {
    title:"Weather App",
    name:"Rohan Ganguly"
  })
})

app.get("/about",(req,res)=>{
  res.render('about',{
    title:'About me',
    name:'Rohan Ganguly'
  })
})
app.get("/help",(req,res)=>{
  res.render('help',{
    helpMsg: "Under construction. Be back soon",
    title:"Help",
    name:"Rohan Ganguly"
  })
})
app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:"You must enter a valid address"
    })
  }
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
  if(error){
    return res.send({error:error})
  }
  forecast(latitude,longitude,(error,forecastData)=>{
    if(error){
      return res.send({error:error})
    }
    res.send({
      forecast:forecastData,
      location:location,
      address:req.query.address
    })
  })
})
})

app.get('/products',(req,res)=>{
if(!req.query.search){
  return res.send({
    error:"You must provide a search term"
  })
}
  res.send({
    products:[]
  })

})

app.get('/help/*',(req,res)=>{
res.render('404',{
 
  help:"Help article not found",
  name:"Rohan Ganguly"
})
})
app.get("*",(req,res)=>{
  res.render('404',{
    msg:"Page not found",
    name:"Rohan Ganguly"
  })
})



app.listen(port,()=>{
  console.log('client connected');
  
})
