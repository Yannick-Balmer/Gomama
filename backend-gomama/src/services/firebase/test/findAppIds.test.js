const { error } = require('console');
const path = require('path');
const { AppEntity } = require("../domain/AppEntity");
const utils = require("../utils");


exports.findAppIdsTest = async function () {

    const RED = '\x1b[31m';
    const GREEN = '\x1b[32m';
    const RESET = '\x1b[0m';
    const BLUE = '\x1b[34m';


    const folderListDTO = ["Gokarts Push 001-030", "Gokarts Push 121-150", "Gokarts Push 181-210", "Gokarts Push 2001-2030"];
    const centerNumberDTO = 2003;
    const packageNameDTO = 'com.example2.yourapp';
    const app = new AppEntity(folderListDTO, centerNumberDTO, packageNameDTO)
    app.folderAppName = "api-test-firebase-f0906"
    app.SERVICE_ACCOUNT_KEY_FILE = './key/api-key.test.json'

    try {
        const resp = utils.authenticate(app)
            .then(app => utils.findAppIds(app))
            .then(app => console.log(app.Apps.android, app.Apps.ios))
            .then(app => console.log(`${GREEN}TEST OK : ${path.basename(__filename)}${RESET}`))


    }
    catch (error) {
        console.log(`${RED}TEST ERREUR : ${path.basename(__filename)}${RESET}`);
        console.log(error);
    }

}

