exports.findFolderTest = function () {
    const path = require('path');

    const { AppEntity } = require("../domain/AppEntity");

    const utils = require("../utils");

    const RED = '\x1b[31m';
    const GREEN = '\x1b[32m';
    const RESET = '\x1b[0m';

    const folderListDTO = ["Gokarts Push 001-030", "Gokarts Push 121-150", "Gokarts Push 181-210", "Gokarts Push 2001-2030"];
    const centerNumberDTO = 2003;
    const packageNameDTO = 'com.example.yourapp'; // Remplacez par le nom de package de votre app Android

    const app = new AppEntity(folderListDTO, centerNumberDTO, packageNameDTO)

    try {
        utils.findFolder(app);
        console.log(`${GREEN}TEST OK : ${path.basename(__filename)}${RESET}`);
    } catch (error) {
        console.log(`${RED}TEST ERREUR : ${path.basename(__filename)}${RESET}`);
    }

};