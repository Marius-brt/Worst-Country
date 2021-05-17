const axios = require('axios').default
const cheerio = require('cheerio')
const fs = require('fs')
const analyse = require('./analyse')

module.exports.execute = () => {
    var countries = []
    axios.get("https://fr.countryeconomy.com/").then((data) => {
        var $ = cheerio.load(data.data)
        $('#countryp0').find('option').each((index,op) => {
            var country = $(op).attr('value')
            axios.get("https://fr.countryeconomy.com/pays/" + country).then((dt) => {
                var $c = cheerio.load(dt.data)
                var values = {}
                $c('.table.tabledat.table-striped.table-condensed.table-hover > tbody > tr').each((i, tr) => {
                    if($c(tr).children('td').children('a').html() != null) {
                        var val = $c(tr).children('td').children('a').html().replace('[+]', '').trim().replace(/ /g,'-').toLocaleLowerCase()
                        if(values[val.toString()] == undefined && $c(tr).children('td.numero').html() != null) {
                            values[val.toString()] = {
                                text: $c(tr).children('td.numero').html(),
                                value: parseFloat($c(tr).children('td.numero').html().replace(/[^0-9,-]/g, '').replace(',', '.'))
                            }
                        }
                    }
                    if(i + 1 === $c('.table.tabledat.table-striped.table-condensed.table-hover > tbody > tr').length) {
                        countries.push({
                            country,
                            values
                        })
                        if(index + 1 === $('#countryp0').find('option').length) {
                            fs.writeFileSync('data.json', JSON.stringify(countries, null, 2))
                            analyse(countries)
                        }
                    }
                })
            })  
        })
    })
}