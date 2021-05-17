module.exports = (countries) => {
    var result = {
        best:  {},
        worst: {}
    }
    var params = [
        {
            param: "taux-de-natalite",
            sort: "desc"
        },
        {
            param: "%-emigrants",
            sort: "asc"
        },
        {
            param: "classement-de-paix",
            sort: "asc"
        },
        {
            param: "espérance-de-vie",
            sort: "desc"
        },
        {
            param: "pib-annuel",
            sort: "desc"
        },
        {
            param: "taux-de-mortalité",
            sort: "asc"
        },
        {
            param: "covid-19---décès",
            sort: "asc"
        },
        {
            param: "nombre-d'homicides",
            sort: "asc"
        },
        {
            param: "taux-de-suicide",
            sort: "asc"
        },
        {
            param: "taux-de-mortalité",
            sort: "asc"
        },
        {
            param: "nombre-d'homicides",
            sort: "asc"
        },
        {
            param: "exportations",
            sort: "desc"
        },
        {
            param: "dépenses-en-santé-(m.$)",
            sort: "desc"
        },
        {
            param: "dépenses-en-éducation-(m.$)",
            sort: "desc"
        },
        {
            param: "déficit-(m.$)",
            sort: "asc"
        },
        {
            param: "covid-19---décès-par-million-d'habitants",
            sort: "asc"
        },
        {
            param: "doses-administrées",
            sort: "desc"
        },
        {
            param: "entièrement-vaccinées",
            sort: "desc"
        },
        {
            param: "co2-tonnes-par-habitant",
            sort: "asc"
        },
        {
            param: "indice-de-corruption",
            sort: "asc"
        },
        {
            param: "classement-de-compétitivité",
            sort: "asc"
        },
        {
            param: "tva-normal",
            sort: "asc"
        },
        {
            param: "véhicules-/-1-000-habitants",
            sort: "desc"
        },
        {
            param: "bourse",
            sort: "desc"
        },
        {
            param: "classement-de-l'innovation",
            sort: "asc"
        },
        {
            param: "indice-de-fragilité",
            sort: "asc"
        },
        {
            param: "dépenses-de-défense--per-hab.",
            sort: "desc"
        },
        {
            param: "dette-par-habitant",
            sort: "asc"
        },
        {
            param: "dette-totale-(m.-$)",
            sort: "asc"
        },
        {
            param: "arrivées-annuelles",
            sort: "desc"
        },
        {
            param: "taux-de-chômage",
            sort: "asc"
        },
        {
            param: "taux-de-fécondité",
            sort: "desc"
        },
        {
            param: "taux-d'homicides-pour-100-000",
            sort: "asc"
        },
        {
            param: "réserves-de-pétrole",
            sort: "desc"
        },
        {
            param: "production-gwh",
            sort: "desc"
        }
    ]
    params.forEach(el => {
        var best, worst
        var currCountries = countries.filter((val) => {
            return val.values[el.param]
        })
        if(el.sort == "asc") {
            best = currCountries.sort((a, b) => {
                if(b.values[el.param] == undefined) {
                    return -1
                }
                if(a.values[el.param] == undefined) {
                    return 1
                }
                return a.values[el.param].value - b.values[el.param].value
            })[0]
            worst = currCountries.sort((a, b) => {
                if(b.values[el.param] == undefined) {
                    return 1
                }
                if(a.values[el.param] == undefined) {
                    return -1
                }
                return b.values[el.param].value - a.values[el.param].value
            })[0]
        } else {
            best = currCountries.sort((a, b) => {
                if(b.values[el.param] == undefined) {
                    return 1
                }
                if(a.values[el.param] == undefined) {
                    return -1
                }
                return b.values[el.param].value - a.values[el.param].value
            })[0]
            worst = currCountries.sort((a, b) => {
                if(b.values[el.param] == undefined) {
                    return -1
                }
                if(a.values[el.param] == undefined) {
                    return 1
                }
                return a.values[el.param].value - b.values[el.param].value
            })[0]
        }
        if(result.best[best.country] == undefined) {
            result.best[best.country] = 1
        } else {
            result.best[best.country]++
        }
        if(result.worst[worst.country] == undefined) {
            result.worst[worst.country] = 1
        } else {
            result.worst[worst.country]++
        }
    })
    var bestCountry = [];
    for (var key in result.best) {
        bestCountry.push([key, result.best[key]]);
    }
    bestCountry.sort((a, b) => {
        return b[1] - a[1];
    })
    console.log(`Best country : ${bestCountry[0][0]} with ${bestCountry[0][1]} points`)
    var worstCountry = [];
    for (var key in result.worst) {
        worstCountry.push([key, result.worst[key]]);
    }
    worstCountry.sort((a, b) => {
        return b[1] - a[1];
    })
    console.log(`Worst country : ${worstCountry[0][0]} with ${worstCountry[0][1]} points`)
}