exports.findFolderTest = function () {
    const path = require('path');

    const { AppEntity } = require("../domain/AppEntity");

    const utils = require("../../../../../../../api-firebase/utils");

    const RED = '\x1b[31m';
    const GREEN = '\x1b[32m';
    const RESET = '\x1b[0m';
    const BLUE = '\x1b[34m';


    const folderListDTO = ["Gokarts Push 001-030", "Gokarts Push 121-150", "Gokarts Push 181-210", "Gokarts Push 2001-2030"];
    const centerNumberDTO = 2003;
    const packageNameDTO = 'com.example12.yourapp'; // Remplacez par le nom de package de votre app Android

    const app1 = new AppEntity(folderListDTO, centerNumberDTO, packageNameDTO)

    console.log(`${RED}TEST : ${path.basename(__filename)}${RESET}`);
    console.log("AppEntity instance", app1);

    const app1Output = utils.findFolder(app1);


    console.log(`${GREEN}AppEntity instance Input: app1${RESET}`, app1);
    console.log(`${BLUE}AppEntity instance Input: app1Output${RESET}`, app1Output);

};