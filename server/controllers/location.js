const request = require('request');


const handleAutoComplete = (req, res) => {
    let url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.ACCU_TOKEN}&q=${req.body.input}`;
    request(url, function(err, resp, body) {
        if (err) {
            res.status(400).json('unable to autocomplete')
        } else { res.json(body) }

    })
}

const handleCurrentForecast = (req, res) => {
    let url = `http://dataservice.accuweather.com/currentconditions/v1/${req.body.key}?apikey=${process.env.ACCU_TOKEN}`;

    request(url, function(err, resp, body) {
        if (err) {
            res.status(400).json('unable to get current forecast')
        } else { res.json(body) }
    })

}



const handle5DaysForecast = (req, res) => {
    let url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${req.body.key}?apikey=${process.env.ACCU_TOKEN}`;

    request(url, function(err, resp, body) {
        if (err) {
            res.status(400).json('unable to get 5 days forecast')
        } else {
            res.json(body);

        }
    })
}



const handleGeoForecast = (req, res) => {
    let url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.ACCU_TOKEN}&q=${req.body.coordinates}`;

    request(url, function(err, resp, body) {
        if (err) {
            res.status(400).json('unable to get geo forecast')
        } else {
            res.json(body);
        }
    })
}


module.exports = {
    handleAutoComplete,
    handleCurrentForecast,
    handle5DaysForecast,
    handleGeoForecast
}