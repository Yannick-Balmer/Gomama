exports.authenticateTest = async function () {

    const path = require('path');

    const { AppEntity } = require("../domain/AppEntity");

    const utils = require("../utils");

    const RED = '\x1b[31m';
    const GREEN = '\x1b[32m';
    const RESET = '\x1b[0m';
    const BLUE = '\x1b[34m';


    const folderListDTO = ["Gokarts Push 001-030", "Gokarts Push 121-150", "Gokarts Push 181-210", "Gokarts Push 2001-2030"];
    const centerNumberDTO = 2003;
    const packageNameDTO = 'com.apextiming.kartbahn';

    const app = new AppEntity(folderListDTO, centerNumberDTO, packageNameDTO);

    try {
        app.SERVICE_ACCOUNT_KEY_FILE = './key/api-key.test.json'
        await utils.authenticate(app).then(app => console.log(`${GREEN}TEST OK: ${path.basename(__filename)}${RESET}`))

    } catch (error) {
        console.log(`${RED}TEST ERREUR : ${path.basename(__filename)}${RESET}`);
        console.log(error);
    }
}

