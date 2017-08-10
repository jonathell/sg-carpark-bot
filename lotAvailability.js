var fs = require('fs')
var rp = require('request-promise-native')
var apiKeys = JSON.parse(fs.readFileSync('apiKeys.json', 'utf8'))
var lotAvailabilityArr = []

function getCarparkAvail () {
  var uriStr = 'http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailability'
  var options = {
    uri: uriStr,
    method: 'GET',
    headers: {
      'AccountKey': apiKeys.datamallKey,
      'accept': 'application/json'
    },
    json: true
  }

  rp(options)
      .then(function (res) {
        console.log(res)
        for (var i = 0; i < res.value.length; i++) {
          console.log(res.value[i].Development)
        }
        console.log(res.value.length)
        lotAvailabilityArr = res.value
      })
      .catch(function (err) {
        console.log(err)
        console.log('fail')
      })
}

module.exports = {
  carparksArr: lotAvailabilityArr,
  getCarparkAvail: getCarparkAvail
}
