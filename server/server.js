require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const location = require('./controllers/location');

const app = express();

const whiteList = ['http://localhost:3000'];
const corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('NOT ALLOWED'))
        }
    }
}

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(compression());


app.post('/autocomplete', (req, res) => { location.handleAutoComplete(req, res) });
app.post('/getcurrentforecast', (req, res) => { location.handleCurrentForecast(req, res) });
app.post('/get5daysforecast', (req, res) => { location.handle5DaysForecast(req, res) });
app.post('/getgeoforecast', (req, res) => { location.handleGeoForecast(req, res) });

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT || 3001 }`);
})