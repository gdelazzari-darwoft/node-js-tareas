const { guardarDB, leerDB } = require('./helpers/guardarArchivos');
const { inquirerMenu, pausaInquire, leerInput, listadoBorrarTareas, confirmar, listadoCompletarTareas } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
require('colors');


const main = async() => {
    let opt = '';
    const tareas = new Tareas();

    const tareasFromDB = leerDB();
    if (tareasFromDB) {
        //CargarTareas
        tareas.cargarTareasFromArray(tareasFromDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //Crear Tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                //Listar tareas
                tareas.listadoCompleto();
                break;
            case '3':
                //Listar Tareas Completadas
                tareas.listadoPendientesCompletadas();
                break;
            case '4':
                //Listar Tareas Pendientes
                tareas.listadoPendientesCompletadas(false);
                break;
            case '5':
                //Completar Tareas
                const ids = await listadoCompletarTareas(tareas.listadoArr);
                //console.log({ ids });
                tareas.completarTareas(ids);
                break;
            case '6':
                //Borrar Tareas
                const id = await listadoBorrarTareas(tareas.listadoArr);
                if (id !== 0) {
                    //Preguntar si esta seguro de borrar. Ya tenemos el ID
                    const ok = await confirmar('¿Estas seguro de borrar la tarea?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada!');
                    }
                }

                break;
        }
        guardarDB(tareas.listadoArr);

        await pausaInquire();


    } while (opt !== '0');

}

main();