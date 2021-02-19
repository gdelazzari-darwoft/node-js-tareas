const { v4: uuidv4 } = require('uuid')

class Tarea {
    id = '';
    desc = '';
    fechaCompletado = null;

    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
        this.fechaCompletado = null;
    }
}

module.exports = Tarea;