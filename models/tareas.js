const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i+1}`.green;
            const { desc, fechaCompletado } = tarea;
            const estado = (fechaCompletado) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        })
    }

    listadoPendientesCompletadas(completadas = true) {
        let idx = 0;
        this.listadoArr.forEach(tarea => {
            const { desc, fechaCompletado } = tarea;
            const estado = (fechaCompletado) ? 'Completada'.green : 'Pendiente'.red;

            if (completadas) {
                if (fechaCompletado) {
                    idx++;
                    console.log(`${(idx + '.').green} ${desc} :: ${estado}`);
                }
            } else {
                if (!fechaCompletado) {
                    idx++;
                    console.log(`${(idx + '.').green} ${desc} :: ${estado}`);
                }
            }
        })
    }

    completarTareas(ids = []) {
        //Primero marcamos como completadas todas las tareas que vienen en el parametro "ids"
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.fechaCompletado) {
                tarea.fechaCompletado = new Date().toISOString();
            }
        });

        //Pero despues, debemos marcar como "Pendientes", las que no estan en "ids"
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].fechaCompletado = null;
            }
        })

    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

}

module.exports = Tareas;