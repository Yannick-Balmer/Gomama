const { exec } = require('child_process');
const path = require('path');
const { createFolders } = require('./src/create_folders.js');
const { runPhotoshop, watchLogFile } = require('./src/run_photoshop.js');
const { configureAppli } = require('./src/configure_appli.js');



async function runApp() {
    try {
        createFolders();
        watchLogFile();
        await runPhotoshop();
    } catch (error) {
        console.error('Erreur lors de l\'exécution de runApp :', error);

    }
}


runApp()
    .then(() => configureAppli())
    .catch(error => { console.error('Erreur lors de l\'exécution de runApp() et configureAppli() :', error); })

module.exports = { runApp };