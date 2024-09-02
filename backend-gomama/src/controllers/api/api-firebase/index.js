// const { firebase } = require("googleapis/build/src/apis/firebase");
const { AppEntity } = require("./models/AppEntity");
const utils = require("./utils");






function createIdsFirebase(folderList, centreId, folderName) {

    const packageName = `com.apextiming.${folderName}`

    const newApp = new AppEntity(folderList, centreId, packageName)

    const steps = [
        () => utils.findFolder(newApp),
        () => utils.authenticate(newApp),
        // () => utils.createAndroidApp(newApp),
        // () => utils.createIosApp(newApp),
        // () => utils.delay(newApp),
        // () => utils.findAppIds(newApp),
        // () => utils.delay(newApp),
        // () => utils.downloadGoogleServicesJson(newApp)
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

module.exports = {
    createIdsFirebase
}