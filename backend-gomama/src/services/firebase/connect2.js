const { google } = require('googleapis');
const path = require('path');
const { mainModule } = require('process');




async function authenticate(appInput) {
    const APP = appInput

    appInput.SERVICE_ACCOUNT_KEY_FILE = path.join(__dirname, './key/api-key.test.json')

    try {


        const auth = new google.auth.GoogleAuth({
            keyFile: appInput.SERVICE_ACCOUNT_KEY_FILE,
            scopes: ['https://www.googleapis.com/auth/firebase'],
        });

        const authClient = await auth.getClient();

        const firebase = google.firebase({
            version: 'v1beta1',
            auth: authClient,
        });

        APP.firebase = firebase;
        console.log("Successful authentication with Firebase");
        return APP;

    } catch (error) {
        console.error("Erreur d'authentification :", error);
    }
}


async function findAppIds(dataInput) {
    dataInput.Apps = {
        android: null,
        ios: null
    };
    dataInput.folderAppName = 'api-test-firebase-f0906';
    // Vérifier que dataInput et firebase sont valides
    if (!dataInput || !dataInput.firebase) {
        console.error("Données d'entrée invalides ou manquantes.");
        return null;
    }
    dataInput.packageName = 'com.example.yourapp'
    try {
        // ID du projet Firebase
        const projectId = String(dataInput.folderAppName);

        // Liste des applications Android et Ios dans le projet Firebase
        const resAndroid = await dataInput.firebase.projects.androidApps.list({
            parent: `projects/${projectId}`
        });

        const resIos = await dataInput.firebase.projects.iosApps.list({
            parent: `projects/${projectId}`
        });

        const appAndroid = resAndroid.data.apps.filter(el => el.packageName == dataInput.packageName);
        const appIos = resIos.data.apps.filter(el => el.packageName == dataInput.packageName);

        appAndroid.length > 0 ? dataInput.Apps.android = appAndroid[0].appId : null
        appIos.length > 0 ? dataInput.Apps.ios = appIos[0].appId : null

        console.log("Ids App, Android :", dataInput.Apps.android, " Ios :", dataInput.Apps.ios);
        return dataInput
    } catch (error) {
        console.error("ERREUR DANS findAppIds:", error);
        return null;
    }
}


const data = {}
data.SERVICE_ACCOUNT_KEY_FILE = path.join(__dirname, './key/api-key.test.json')

function main(dataInput) {
    const resp = authenticate(dataInput).then(app => findAppIds(app)).then(app => console.log(app))
    console.log(resp)
}

main(data)


















// async function listAndroidApps() {
//     try {
//         const a = {};
//         a.SERVICE_ACCOUNT_KEY_FILE = path.join(__dirname, './key/api-key.test.json')
//         console.log("PATH", a.SERVICE_ACCOUNT_KEY_FILE)

//         // Initialisez le client d'authentification avec votre fichier de clé de compte de service
//         const auth = new google.auth.GoogleAuth({
//             keyFile: a.SERVICE_ACCOUNT_KEY_FILE, // Chemin vers votre fichier de clé de compte de service
//             scopes: ['https://www.googleapis.com/auth/firebase'], // Scope nécessaire pour accéder aux services Firebase
//         });

//         // Obtenez le client d'authentification
//         const authClient = await auth.getClient();

//         console.log("AUTHHHHHH", authClient);

//         // Créez un client Firebase avec l'authentification
//         const firebase = google.firebase({
//             version: 'v1beta1',
//             auth: authClient,
//         });

//         // ID du projet Firebase (remplacez par votre propre ID de projet)
//         const projectId = 'api-test-firebase-f0906';

//         // Liste des applications Android dans le projet Firebase
//         const res = await firebase.projects.androidApps.list({
//             parent: `projects/${projectId}`
//         });

//         // Affichez la liste des applications Android
//         console.log('Liste des applications Android :', res.data.apps);
//     } catch (error) {
//         console.error('Erreur lors de la récupération des applications Android :', error);
//     }
// }

// listAndroidApps();
