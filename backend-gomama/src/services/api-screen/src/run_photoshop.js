// const jsxFilePath = 'C:/wamp64/www/AppVisuels/createVisuals.jsx';

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');
//const { exec } = require('child_process');
const configApp = require('../configAppCreateLogo.json');

const jsxFilePath = configApp.pathJsxFile;
const photoshopPath = configApp.pathPhotoshop;
const command = `"${photoshopPath}" -r "${jsxFilePath}"`;
const commandEnd = 'taskkill /im Photoshop.exe /f';
const logFilePath = path.join(configApp.pathApp, '/PhotoshopLog.txt');

async function runPhotoshop() {
    try {
        const { stdout, stderr } = await exec(command)
        // // const logContent = fs.readFileSync('~/Desktop/PhotoshopLog.txt', 'utf8');
        // // console.log("Contenu du fichier de log :", logContent);
        console.log("Contenu du fichier de log :");
        console.log(`(${stdout}`);
        console.log(`(${stderr}`);
    } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande : ${error.message}`);
    }
}

async function closePhotoshop() {
    try {
        console.log("Tentative d'arrêt de Photoshop...");
        const { stdout, stderr } = await exec(commandEnd);
        console.log(`Résultat de la commande (stdout) : ${stdout}`);
        console.log(`Résultat de la commande (stderr) : ${stderr}`);
        console.log("L'arrêt de Photoshop a été exécuté avec succès.");
    } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande d'arrêt de Photoshop : ${error.message}`);
    }
}

function watchLogFile() {
    console.log("Surveillance du fichier de log...");
    fs.watchFile(logFilePath, { interval: 1000 }, async (curr, prev) => {
        if (curr.mtime > prev.mtime) {
            console.log("Modification du fichier de log détectée");
            await closePhotoshop();
            fs.writeFile(logFilePath, '', (err) => {
                if (err) {
                    return console.error(`Erreur lors de l'effacement du fichier: ${err}`);
                }
                console.log('Le contenu du fichier a été effacé avec succès !');
            });
            fs.unwatchFile(logFilePath);
        }
    });
}



module.exports = {
    runPhotoshop,
    closePhotoshop,
    watchLogFile
}