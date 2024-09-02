// Définition de la classe ResponseApi
class ResponseApi {
    constructor(data = null, message = '', statuts = 'KO', error = null) {
        // Initialisation des propriétés
        this.data = data;
        this.message = message;
        this.statuts = statuts;
        this.error = error;
    }
}

// Exportation de la classe
module.exports = { ResponseApi };
