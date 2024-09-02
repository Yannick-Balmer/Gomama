
const { google } = require('googleapis');
const path = require('path');

async function List() {
    try {

        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, './key/api-key.test.json'),
            scopes: ['https://www.googleapis.com/auth/firebase'],
        });

        console.log("AUTHHHHHH", auth);
        const authClient = await auth.getClient();
        console.log("AUTHHHHHH", authClient);


        const firebase = google.firebase({
            version: 'v1beta1',
            auth: authClient,
        });

        const androidApps = await firebase.projects.androidApps.list({ parent: "projects/api-test-firebase-f0906" });

        console.log(androidApps)
    }
    catch (error) { console.log(error) }

}

List();