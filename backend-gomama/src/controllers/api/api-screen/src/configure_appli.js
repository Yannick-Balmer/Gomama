const fs = require('fs');
const path = require('path');
const configApp = require('../configAppCreateLogo.json');
const configCustomer = require('../configCustomerLogo.json');
const configContent = require('../../../../../../assets/files_to_copy/configContent');
const configXmlContent = require('../../../../../../assets/files_to_copy/configXmlContent');

const filePathConfigContent = path.join(configApp.pathApp, configCustomer.folderName, configApp.pathFolderIcones.javascript, 'config.js');
const filePathConfigXmlContent = path.join(configApp.pathApp, configCustomer.folderName, 'www/config.xml');

const filesToCopy = [
    {
        sourceFilePath: path.join(configApp.pathAssetsFilesToCopy, 'language.js'),
        destFilePath: path.join(configApp.pathApp, configCustomer.folderName, configApp.pathFolderIcones.javascript, 'language.js')
    },
    {
        sourceFilePath: path.join(configApp.pathAssetsFilesToCopy, 'splashscreen.png'),
        destFilePath: path.join(configApp.pathApp, configCustomer.folderName, configApp.pathFolderIcones.images, configApp.pathFolderIcones.child.android, 'splashscreen.png')
    },
    {
        sourceFilePath: path.join(configApp.pathAssetsFilesToCopy, 'no_internet_connection.png'),
        destFilePath: path.join(configApp.pathApp, configCustomer.folderName, configApp.pathFolderIcones.images, 'no_internet_connection.png')
    },
    {
        sourceFilePath: path.join(configApp.pathAssetsFilesToCopy, 'offline.html'),
        destFilePath: path.join(configApp.pathApp, configCustomer.folderName, 'www/offline.html')
    },
    {
        sourceFilePath: path.join(configApp.pathAssetsFilesToCopy, 'index.html'),
        destFilePath: path.join(configApp.pathApp, configCustomer.folderName, 'www/index.html')
    }
];

function configureAppli() {

    // Écrire les fichiers config.js et config.xml
    writeConfigFile(filePathConfigContent, configContent);
    writeConfigFile(filePathConfigXmlContent, configXmlContent);

    // Copier les fichiers définis dans filesToCopy
    copyFiles();
}

function writeConfigFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`Erreur lors de la création du fichier ${filePath}: ${err}`);
        } else {
            console.log(`Le fichier ${filePath} a été créé avec succès !`);
        }
    });
}

function copyFiles() {
    filesToCopy.forEach((el) => {
        fs.copyFile(el.sourceFilePath, el.destFilePath, (err) => {
            if (err) {
                console.error(`Erreur lors de la copie du fichier ${el.sourceFilePath} : ${err}`);
            } else {
                console.log(`Le fichier ${el.sourceFilePath} a été copié avec succès vers ${el.destFilePath}`);
            }
        });
    });
}

module.exports = {
    configureAppli
};
