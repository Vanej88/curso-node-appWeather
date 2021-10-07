require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listarLugares } = require('./helpers/inquirer'); 
const Busquedas = require('./models/busquedas'); 

const main = async() => {

    const busquedas = new Busquedas(); 

    let option; 

    do {

        option = await inquirerMenu(); 
     
        switch (option) {
             case 1:
                 //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                //Buscar lugares
                const lugares = await busquedas.ciudad(termino);
                //Seleccionar el lugar
                const id = await listarLugares(lugares); 
                const lugarSelected = lugares.find(lugar => lugar.id === id);
        
                //Datos de clima
                const climaData = await busquedas.climaLugar(lugarSelected.lat, lugarSelected.long); 
                //console.log(climaData); 

                 //Mostrar resultados

                 console.log('\nInformación de la ciudad\n'.green);
                 console.log('Ciudad:', lugarSelected.name);
                 console.log('Lat:', lugarSelected.lat);
                 console.log('Long:', lugarSelected.long );
                 console.log('Temperatura:',);
                 console.log('Mínima:',  );
                 console.log('Máxima:', );
                 console.log('Así está el clima:', ); 


              
             break;
 
             case 2: 
                 //historial
             break;
 
        }
 
         await pausa(); 
 
     } while (option !== 0)
}

main(); 