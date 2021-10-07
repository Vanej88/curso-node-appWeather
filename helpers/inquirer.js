const inquirer = require('inquirer');
require('colors'); 

const inquirerMenu = async() => {

    const preguntas = [
        {
            type: 'list', 
            name: 'opción',
            message: '¿Qué desea hacer?', 
            choices: [
                {
                    value: 1,
                    name: `${'1.'.green} Buscar ciudad`
                },
                {
                    value: 2,
                    name: `${'2.'.green} Ver Historial`
                },
                {
                    value: 0,
                    name: `${'0.'.green} Salir`
                }
    
            ]
        }
    ]

    console.log('======================'.green);
    console.log('Selecciona una opción'.white);
    console.log('======================\n'.green);

    const {opción} = await inquirer.prompt(preguntas)

    return opción;
}

const pausa = async() => {

    const selecciona = [
        {
            type: 'input', 
            name: 'enter',
            message: `\nPresione ${'ENTER'.green} para continuar:\n`
        }
    ]

    console.log('\n'); 

    const enter = await inquirer.prompt(selecciona)

    return enter; 
}

const leerInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if(value.length === 0){
                    return 'Por favor escribe un valor'
                }
                return true; 
            }
        }
    ]

    const { desc } = await inquirer.prompt(question); 

    return desc; 

}

const listarLugares = async (lugares = []) => {

    const choices = lugares.map((lugar, i) => {

        const indice = `${i + 1}.`.green;

        return {
            value: lugar.id, 
            name: `${ indice } ${lugar.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione un lugar:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);

    return id; 

}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok', 
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);

    return ok; 
}

const mostrarListadoChecklist = async( tareas = []) => {

    const choices = tareas.map((tarea, i) =>{

        const idx = `${i+1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`, 
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'selecciones',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(pregunta);

    return ids; 
}

module.exports = {
    inquirerMenu, 
    pausa, 
    leerInput, 
    listarLugares
}