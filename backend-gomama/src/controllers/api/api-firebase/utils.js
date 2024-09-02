const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

function findFolder(dataInput) {

    const filteredFolders = dataInput.folders.filter(function (el) {

        const parts = el.split(' ');

        // Vérifier que la chaîne a suffisamment de parties pour contenir un intervalle
        if (parts.length < 3) {
            return false;
        }

        const rangeParts = parts[2].split('-');

        // Vérifier que l'intervalle est bien défini avec deux bornes
        if (rangeParts.length !== 2) {
            return false;
        }

        const inf = Number(rangeParts[0]);
        const sup = Number(rangeParts[1]);

        // Retourne true si le centre_number est dans l'intervalle
        return Number(dataInput.centerNumber) >= inf && Number(dataInput.centerNumber) <= sup;

    });

    dataInput.folderAppName = filteredFolders[0].split(' ').join('-').toLowerCase();
    dataInput.SERVICE_ACCOUNT_KEY_FILE = path.join(__dirname, "./key/key-" + dataInput.folderAppName + ".json");

    console.log("Folder founded", dataInput.folderAppName);
    return Promise.resolve(dataInput); // Retourner une promesse résolue
};

async function authenticate(dataInput) {


    const auth = new google.auth.GoogleAuth({
        keyFile: dataInput.SERVICE_ACCOUNT_KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const authClient = await auth.getClient();

    const firebase = google.firebase({
        version: 'v1beta1',
        auth: authClient,
    });
    google.options({ auth: authClient });

    dataInput.firebase = firebase
    console.log("Sucessfull authentication firebase");
    return dataInput;
}

async function createAndroidApp(dataInput) {

    const projectId = dataInput.folderAppName; // Remplacez par l'ID de votre projet Firebase
    const packageName = dataInput.packageName; // Remplacez par le nom de package de votre app Android

    try {
        const request = {
            parent: `projects/${projectId}`,
            requestBody: {
                packageName: packageName,
            },
        };

        const reponse = await dataInput.firebase.projects.androidApps.create(request);

        console.log("App created Android");

        return dataInput;

    } catch (error) {
        dataInput.error = {
            message: "Error creating Android app",
            error: error
        }
        console.error('Error creating Android app:', error);
    }
}

async function createIosApp(dataInput) {

    const projectId = dataInput.folderAppName; // Remplacez par l'ID de votre projet Firebase
    const packageName = dataInput.packageName; // Remplacez par le nom de package de votre app Android

    try {
        const request = {
            parent: `projects/${projectId}`,
            requestBody: {
                bundleId: packageName,
            },
        };

        await dataInput.firebase.projects.iosApps.create(request);

        console.log("App created Ios");

        return dataInput;

    } catch (error) {
        dataInput.error = {
            message: "Error creating Ios app",
            error: error
        }
        console.error('Error creating Ios app:', error);
    }
}

async function findAppIds(dataInput) {


    const projectId = String(dataInput.folderAppName); // Remplacez par l'ID de votre projet Firebase

    try {
        // Liste les applications Android
        const androidApps = await dataInput.firebase.projects.androidApps.list({
            parent: `projects/${projectId}`
        });

        // Liste les applications iOS
        const iosApps = await dataInput.firebase.projects.iosApps.list({
            parent: `projects/${projectId}`
        });

        const appAndroid = androidApps.data.apps.filter(el => el.packageName == dataInput.packageName);
        const appIos = iosApps.data.apps.filter(el => el.bundleId == dataInput.packageName);

        appAndroid.length > 0 ? dataInput.Apps.android = appAndroid[0].appId : null

        appIos.length > 0 ? dataInput.Apps.ios = appIos[0].appId : null

        console.log("Ids App, Android :", dataInput.Apps.android, " Ios :", dataInput.Apps.ios);
        return dataInput

    } catch (error) {
        console.error('Error listing Firebase apps:', error);
    }
}

async function downloadGoogleServicesJson(dataInput) {

    const projectId = dataInput.folderAppName;
    const appIosId = String(dataInput.Apps.ios);
    const appAndroidId = String(dataInput.Apps.android);

    // Fonction pour télécharger le fichier de configuration
    async function downloadConfig(appId, platform) {
        try {
            const request = {
                name: `projects/${projectId}/${platform}Apps/${appId}/config`,
            };

            const response = await dataInput.firebase.projects[`${platform}Apps`].getConfig(request);
            const configFileContent = response.data.configFileContents;

            // Décodez le fichier base64 et écrivez-le dans un fichier approprié
            const decodedContent = Buffer.from(configFileContent, 'base64').toString('utf-8');
            const fileName = platform === 'android' ? 'google-services.json' : 'GoogleService-Info.plist';
            const filePath = path.join(__dirname, "../CONFIG-FILE", fileName);
            fs.writeFileSync(filePath, decodedContent);
            console.log(`${fileName} downloaded successfully.`);
        } catch (error) {
            console.error(`Error downloading ${platform === 'android' ? 'google-services.json' : 'GoogleService-Info.plist'}:`, error);
        }
    }

    if (!(appAndroidId == 'null')) {

        await downloadConfig(appAndroidId, 'android');
        console.log(`$File for Android downloaded successfully.`);
    }

    if (!(appIosId == 'null')) {
        await downloadConfig(appIosId, 'ios');
        console.log(`$File for Ios downloaded successfully.`);
    }
    return dataInput;
}

function delay(dataInput) {
    return new Promise(resolve => {
        setTimeout(() => { resolve(dataInput) }, 8000);
    })
}


module.exports = {
    findFolder,
    authenticate,
    createAndroidApp,
    createIosApp,
    findAppIds,
    delay,
    downloadGoogleServicesJson
};