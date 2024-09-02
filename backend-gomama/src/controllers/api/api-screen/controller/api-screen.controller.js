const { configureAppli } = require('../src/configure_appli.js');
const { runApp } = require('../index.js')

exports.createScreens = async (req, res, next) => {


    await runApp()
        .then(() => configureAppli())
        .catch(error => { console.error('Erreur lors de l\'exécution de runApp() et configureAppli() :', error); })




    console.log("je suis ici")
};