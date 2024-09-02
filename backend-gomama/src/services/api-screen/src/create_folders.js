const fs = require('fs');
const path = require('path');
const configApp = require('../configAppCreateLogo.json');
const configCustomer = require('../configCustomerLogo.json');


// Fonction pour créer un répertoire
function createFolder(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    } else {
        throw new Error(`${dirPath} : le dossier existe déjà`)
    }
}

// Création de la structure des dossiers
function createFolders() {
    const folderNames = [
        path.join(configApp.pathApp, configCustomer.folderName, configApp.pathFolderIcones.images, configApp.pathFolderIcones.child.ios),
        path.join(configApp.pathApp, configCustomer.folderName, configApp.pathFolderIcones.images, configApp.pathFolderIcones.child.android),
        path.join(configApp.pathApp, configCustomer.folderName, configApp.pathFolderIcones.screen, configApp.pathFolderIcones.child.ios, configApp.pathFolderIcones.type.ipad),
        path.join(configApp.pathApp, configCustomer.folderName, configApp.pathFolderIcones.screen, configApp.pathFolderIcones.child.ios, configApp.pathFolderIcones.type.iphone),
        path.join(configApp.pathApp, configCustomer.folderName, configApp.pathFolderIcones.screen, configApp.pathFolderIcones.child.android),
        path.join(configApp.pathApp, configCustomer.folderName, configApp.pathFolderIcones.javascript)
    ]

    folderNames.forEach((el) => {
        try {
            createFolder(el);
        }
        catch (error) { console.log(error.message) }
    })

    console.log("structure de dossier client créée avec succcès");
}


module.exports = {
    createFolders
}