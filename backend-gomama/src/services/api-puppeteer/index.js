const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")

const fs = require('fs');




function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

(async () => {
    puppeteer.use(StealthPlugin())

    // const browser = await puppeteer.launch();

    const browser = await puppeteer.launch({
        headless: false, // Ouvre le navigateur avec l'interface graphique
        slowMo: 50, // Optionnel : ralentit les actions pour les voir mieux
        args: ['--start-maximized'] // Optionnel : démarre le navigateur en mode maximisé
    });

    const page = await browser.newPage();

    await page.goto('https://firebase.google.com/');

    // Attendre quelques secondes pour que la page charge
    await delay(5000);

    // Récupérez les cookies
    const cookies = await page.cookies();

    // Exportez les cookies dans un fichier JSON
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));

    const cookiesParsed = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
    await page.setCookie(...cookiesParsed);

    await page.goto('https://firebase.google.com/_d/signin?continue=https%3A%2F%2Ffirebase.google.com%2F&amp;prompt=select_account');



    // Attendre que l'input soit visible
    await page.waitForSelector('input[aria-label="Adresse e-mail ou numéro de téléphone"]');

    // Sélectionner l'input avec l'attribut aria-label et entrer l'email
    await page.type('input[aria-label="Adresse e-mail ou numéro de téléphone"]', 'webmaster@apex-timing.com');

    // Attendre que la page soit complètement chargée
    await page.waitForSelector('button');

    // Trouver et cliquer sur le bouton contenant le texte "Suivant"
    await page.evaluate(() => {
        // Rechercher tous les boutons sur la page
        const buttons = Array.from(document.querySelectorAll('button'));
        // Trouver le bouton dont le texte est "Suivant"
        const buttonToClick = buttons.find(button => button.textContent.trim() === 'Suivant');
        if (buttonToClick) {
            buttonToClick.click(); // Cliquer sur le bouton
        } else {
            console.error('Bouton avec le texte "Suivant" non trouvé');
        }
    });

    //await browser.close();
})();













// const puppeteer = require('puppeteer');

// (async () => {
//     const browser = await puppeteer.launch({ headless: false }); // Ouvre le navigateur en mode non-headless pour voir ce qui se passe
//     const page = await browser.newPage();
//     await page.goto('https://console.firebase.google.com/u/0/?hl=fr&_gl=1*vgxyol*_ga*NDg1NzY4NjY0LjE3MjA1MzU5NjE.*_ga_CW55HF8NVT*MTcyMjQzMzUzMy4zMS4xLjE3MjI0MzM3ODEuNTguMC4w');

//     // Attendez que la page de connexion se charge
//     await page.waitForSelector('input[type="email"]'); // Par exemple, attendez un champ email

//     // Entrez votre email
//     await page.type('input[type="email"]', 'webmaster@apex-timing.com');

//     // Cliquez sur "Suivant" ou "Next"
//     await page.click('#identifierNext'); // Changez le sélecteur selon le bouton réel

//     // Attendez que le champ de mot de passe apparaisse
//     await page.waitForSelector('input[type="password"]');

//     // Entrez votre mot de passe
//     await page.type('input[type="password"]', '@pexwebmaster74');

//     // Cliquez sur "Suivant" ou "Next" après le mot de passe
//     await page.click('#passwordNext'); // Changez le sélecteur selon le bouton réel

//     // Attendez que la connexion se termine
//     await page.waitForNavigation();

//     // Maintenant, vous êtes connecté, et vous pouvez interagir avec la console Firebase

//     // Fermez le navigateur après l'opération
//     await browser.close();
// })();
