const request = require('request')
const foreCast = (latiTude,longiTude,callBack)=>{
    const url = 'http://api.weatherstack.com/current?access_key=7be51e42616f0f17c1eb522c1823ac83&query='+latiTude+','+longiTude
    console.log(url)
    request({url : url,json:true},(err,res)=>{
        if(err){
            callBack('Pls try Again',undefined)
        }else if(res.body == null || res.body == undefined){
            callBack("Can't fetch data for current location",undefined)
        }
        else{
            callBack(undefined,res.body.current)
        }
    }
    )
}
module.exports= foreCast