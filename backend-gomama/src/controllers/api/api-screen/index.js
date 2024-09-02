const { exec } = require('child_process');
const path = require('path');
const { createFolders } = require('./src/create_folders.js');
const { runPhotoshop, watchLogFile, closePhotoshop } = require('./src/run_photoshop.js');
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

module.exports = {
    runApp
}

