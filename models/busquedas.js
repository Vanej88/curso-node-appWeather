const axios = require('axios');

class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'San José'];

    constructor() {
        //leer DB si existe
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {

        return{
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad( lugar = ''){
        //peticion http
       
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            });
          
            const res = await instance.get();
            return res.data.features.map( lugar => ({
                id: lugar.id,
                name: lugar.place_name,
                long: lugar.center[0],
                lat: lugar.center[1]
            })) 
        
        } catch (error) {
            return []; 
        }
    }

    async climaLugar(lat, long){

        try{

            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.paramsWeather, lat, long}
            });

            const res = await instance.get(); 
            console.log(res.data); 
            const { weather, main } = res.data; 

            return {
                temp: main.temp, 
                min: main.temp_min, 
                max: main.temp_max,
                desc: weather.description
            }
        

        } catch (error) {
            console.log('error'); 
        }
    }
}

module.exports = Busquedas; 