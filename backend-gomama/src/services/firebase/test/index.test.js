const { findFolderTest } = require("./findFolder.test.js");
const { findAppIdsTest } = require("./findAppIds.test.js");
const { authenticateTest } = require("./authenticate.test.js");

const RED = '\x1b[31m';

async function runTests() {
    try {
        findFolderTest();
        await authenticateTest();
        await findAppIdsTest();

    } catch (error) {
        console.log(`${RED}Erreur lors des tests réalisés :`, error);
    }

}

runTests();

