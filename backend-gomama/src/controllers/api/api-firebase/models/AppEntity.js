class AppEntity {
    constructor(
        folders, // Obligatoire
        centerNumber, // Obligatoire
        packageName, // Obligatoire
        folderAppName = null, // Facultatif
        SERVICE_ACCOUNT_KEY_FILE = null, // Facultatif
        firebase = null, // Facultatif
        Apps = { android: null, ios: null }, // Facultatif
        error = null // Facultatif
    ) {
        // Initialisation des propriétés
        this.folders = folders;
        this.centerNumber = centerNumber;
        this.packageName = packageName;
        this.folderAppName = folderAppName;
        this.SERVICE_ACCOUNT_KEY_FILE = SERVICE_ACCOUNT_KEY_FILE;
        this.firebase = firebase;
        this.Apps = Apps;
        this.error = error;
    }
}

module.exports = { AppEntity }