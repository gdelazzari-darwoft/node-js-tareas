const inquirer = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [{
        value: '1',
        name: `${'1.'.green} Crear Tarea`
    }, {
        value: '2',
        name: `${'2.'.green} Listar Tareas`
    }, {
        value: '3',
        name: `${'3.'.green} Listar Tareas Completadas`
    }, {
        value: '4',
        name: `${'4.'.green} Listar Tareas Pendientes`
    }, {
        value: '5',
        name: `${'5.'.green} Completar  Tarea`
    }, {
        value: '6',
        name: `${'6.'.green} Borrar Tarea`
    }, {
        value: '0',
        name: `${'0.'.green} Salir`
    }, ]
}];

const inquirerMenu = async() => {
    console.clear();
    console.log('======================================='.green);
    console.log('       Seleccione una opción'.white);
    console.log('=======================================\n'.green);
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
};

const pausaInquire = async() => {
    const pregunta = [{
        type: 'input',
        name: 'enter',
        message: `Presiona ${'ENTER'.green} para continuar.`
    }]
    await inquirer.prompt(pregunta);
}

const leerInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoBorrarTareas = async(tareas = []) => {
    //En "choises" tenemos la lista de las tareas para borrar
    const choices = tareas.map((tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Volver al menu de inicio.'
    });

    //Creamos una lista para mandar al inquirer, y se crea el menu
    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }];

    //Creamos en menu con la lista
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const { ok } = await inquirer.prompt(question);
    return ok;
}


const listadoCompletarTareas = async(tareas = []) => {
    //En "choises" tenemos la lista de las tareas para borrar
    const choices = tareas.map((tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.fechaCompletado) ? true : false
        }
    });

    //Creamos una lista para mandar al inquirer, y se crea el menu
    const preguntas = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione tareas',
        choices
    }];

    //Creamos en menu con la lista
    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausaInquire,
    leerInput,
    listadoBorrarTareas,
    confirmar,
    listadoCompletarTareas
}