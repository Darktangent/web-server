const request=require('request')

const forecast=(lat,lng,callback)=>{
const darkSky=`a0165bd6b4934bd385b8c70db60f00cf`
const url=`https://api.darksky.net/forecast/${darkSky}/${lat},${lng}?units=us&lang=en`

request({url:url, json:true},(error,response)=>{
  const {temperature, precipProbability, summary} = response.body.currently
  if(error){
    callback("Unable to connect to weather service",undefined)
  }else if(response.body.error){
    callback("Unable to find location",undefined)
  }else{
    callback(undefined,
    
      `${summary}. It is currently ${temperature} degrees out. There is ${precipProbability}% chance of rain.`

    )
  }
})
}
module.exports=forecast