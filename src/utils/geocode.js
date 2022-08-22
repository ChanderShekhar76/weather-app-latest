const request = require('request')
const geoCode = (place,callBack)=>{
    const weatherUrl = 'http://api.positionstack.com/v1/forward?access_key=9fcd6a87b89d9974d47f8d7005375fb1&query='+encodeURIComponent(place)
    console.log(weatherUrl)
    request({url:weatherUrl,json:true},(err,res)=>{
        if(err){
            callBack('Unable to connect. pls try again',undefined)
        }
        else if (res.body.data.length === 0){
            callBack('No info found. pls try again',undefined)
        } else{
            callBack(undefined,res.body.data)
        }
    })
}
module.exports = geoCode