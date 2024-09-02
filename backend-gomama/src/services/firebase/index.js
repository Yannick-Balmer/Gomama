// const { firebase } = require("googleapis/build/src/apis/firebase");
const { AppEntity } = require("./domain/AppEntity.js");
const utils = require("./utils.js");
const { foldersFirebase } = require("./folders-firebase.js")
const configCustomerLogo = require("../api-screen/configCustomerLogo.json")
const configAppCreateLogo = require("../api-screen/configAppCreateLogo.json")


const config = {
    folderListDTO: [...foldersFirebase],
    centerNumberDTO: configCustomerLogo.centre_id,
    folderNameDTO: configCustomerLogo.folderName,
    pathApp: configAppCreateLogo.pathApp
}


function buildFirebase(config) {

    const packageName = `com.apextiming.${config.folderNameDTO}`
    // const packageName = 'com.example2.yourapp';


    const newApp = new AppEntity(config.folderListDTO, config.centerNumberDTO, packageName)
    newApp.SERVICE_ACCOUNT_KEY_FILE = './key/api-key-ozone.json'
    //newApp.folderAppName = "api-test-firebase-f0906"

    const steps = [
        () => utils.findFolder(newApp),
        () => utils.authenticate(newApp),
        () => utils.createAndroidApp(newApp),
        () => utils.createIosApp(newApp),
        () => utils.delay(newApp),
        () => utils.findAppIds(newApp),
        () => utils.delay(newApp),
        () => utils.downloadGoogleServicesJson(newApp, config)
    ];

    async function executeStepsSequentially(steps) {
        for (const step of steps) {
            try {
                const result = await step();

            } catch (error) {
                console.error('Error:', error);
                break;
            }
        }
    }

    executeStepsSequentially(steps);
}

buildFirebase(config);



module.exports = { buildFirebase };