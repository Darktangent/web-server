const request=require('request')
const geocode=(address,callback)=>{
  const mapBox=`pk.eyJ1IjoiYzFwaDNyOSIsImEiOiJjanRlZ2kyZ2sxNjNkNGFxam5weG9hemkyIn0.n04rUagjSHWknKshdJajwg`
  const geocodeUrl=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapBox}&limit=1`
  request({url:geocodeUrl,json:true},(error,{body})=>{
    // const {latitude,longitude,location}= response.body
    if(error){
      callback("Unable to connect to the location server",undefined)
    }else if(body.features.length===0){
      callback("unable to find weather info for that location. Try another search",undefined)
    }else{

      callback (undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}
module.exports=geocode