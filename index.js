require('dotenv').config()
/*const scrapper = require('./scrapper')
scrapper.execute()*/
const fs = require('fs')
const analyse = require('./analyse')(JSON.parse(fs.readFileSync('data.json')))