const fs = require('fs')


module.exports.readData = function readData(file){
    return JSON.parse(fs.readFileSync(`./data/${file}.json`))
  }
  
  module.exports.writeData = function writeData(file, data){
    return fs.writeFileSync(`./data/${file}.json`, JSON.stringify(data))
  }

  