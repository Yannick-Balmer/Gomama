#target photoshop



if (typeof PlugPlugSetup === 'function') {
    PlugPlugSetup();
    $.writeln('PlugPlug initialized successfully.');
} else {
    $.writeln('PlugPlugSetup is not available.');
}
if (!ExternalObject.AdobeXMPScript) {
    ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
}

function main() {

#include "utils.jsx"

// initialisation des constantes
    var configAppCreateLogo = "C:/wamp64/www/AppVisuels/api-screen/configAppCreateLogo.json";
    var configCustomer = "C:/wamp64/www/AppVisuels/api-screen/configCustomerLogo.json";
    var argsApp = readJSONFile(configAppCreateLogo);
    var argsCustomer = readJSONFile(configCustomer);

    app.open(new File(argsApp.filePathIconTemplate + argsApp.fileNameIconTemplate));
    app.open(new File(argsApp.filePathLogoCustomer + argsCustomer.logoName));
    app.open(new File(argsApp.filePathLogoCustomer + argsCustomer.logoName2));
    app.open(new File(argsApp.filePathIconTemplate + argsApp.fileNameHeaderPlayer));

    // si la lanqgue choise est "FR", on ouvre les screens en français, snon ce sont les screens en Anglais
    if(argsCustomer.language === "FR")
        {app.open(new File(argsApp.filePathIconTemplate + argsApp.fileNameScreen));}
    else
        {app.open(new File(argsApp.filePathIconTemplate + argsApp.fileNameScreenEnglish));}

    var docTemplateLogoPhotoshop = activateDocument(argsApp.fileNameIconTemplate);
    var docLogo = activateDocument(argsCustomer.logoName);
    var docLogo2 = activateDocument(argsCustomer.logoName2);
    var docHeaderPlayer = activateDocument(argsApp.fileNameHeaderPlayer);

    var docScreen = null;
    if(argsCustomer.language === "FR")
        { docScreen = activateDocument(argsApp.fileNameScreen);}
    else
        { docScreen = activateDocument(argsApp.fileNameScreenEnglish);}

    var androidIcons = argsApp.androidIcons;
    var iosIcons = argsApp.iosIcons;
    var iosSplash = argsApp.iosSplash;

    var dimensionsLogo = measuresLayer( docLogo, "Calque 1");
    var dimensionsLogo2 = measuresLayer( docLogo2, "Calque 1");


// change la couleur des Icones: couleur dominate "Main" et couleur de la brodure "Border"
    changeLayerColor( docTemplateLogoPhotoshop,argsApp.layerMain.name,argsCustomer.colorMain );
    changeLayerColor( docTemplateLogoPhotoshop,argsApp.layerBorder.name,argsCustomer.colorBorder );


// redimensionne le Logo du client, le copie sur l'Icone et le postionne au centre
    resizeImageToFrame(docLogo,dimensionsLogo, { h:706, w:750 });
    copyLayer(docLogo,"Calque 1");
     createNewLayer(docTemplateLogoPhotoshop,"Logo");
     pasteLayer(docTemplateLogoPhotoshop,"Logo");
     moveLogoToPosition(docTemplateLogoPhotoshop,"Logo",{ x:0, y:-22});


// enregistre les images et logos    
    resizeAndSaveImageAsPng(
        docTemplateLogoPhotoshop,
        argsApp.pathApp + "/"+ argsCustomer.folderName + "/" + argsApp.pathFolderIcones.screen,"icon_512",512,512);
    resizeAndSaveImageAsPng(
        docTemplateLogoPhotoshop,
        argsApp.pathApp + "/"+ argsCustomer.folderName +"/"+ argsApp.pathFolderIcones.screen ,"icon_900",900,900);
        saveImageAsPng(
        docLogo,
        argsApp.pathApp + "/"+ argsCustomer.folderName +"/"+ argsApp.pathFolderIcones.screen ,"logo_1");
    saveImageAsPng(
        docLogo2,
        argsApp.pathApp + "/"+ argsCustomer.folderName +"/"+ argsApp.pathFolderIcones.screen ,"logo_2"); 
    saveImageAsPng(
        docLogo2,
        argsApp.pathApp + "/"+ argsCustomer.folderName +"/"+ argsApp.pathFolderIcones.images ,"logo_2"); 


// crée les icones en pour ios et android
    #include "createMobileIcon.jsx"

    createMobileIcones(docTemplateLogoPhotoshop, androidIcons, iosIcons, iosSplash)
    changeLayerColor( docTemplateLogoPhotoshop,"color_main", argsCustomer.colorMain);
    changeLayerColorHalfHeight( docTemplateLogoPhotoshop,"color_secondary", argsCustomer.colorBorder);
    resizeAndSaveImageAsJpg(
        docTemplateLogoPhotoshop,
        argsApp.pathApp + "/" + argsCustomer.folderName + "/" + argsApp.pathFolderIcones.screen,"icon_1024",1024,1024);

    app.foregroundColor.rgb.red = 255;
    app.foregroundColor.rgb.green = 255;
    app.foregroundColor.rgb.blue = 255;

    addWhiteBackground();
    app.activeDocument.flatten();

    resizeAndSaveImageAsPng(
        docTemplateLogoPhotoshop,
        argsApp.pathApp + "/"+ argsCustomer.folderName + "/" + argsApp.pathFolderIcones.images+ "/" + argsApp.pathFolderIcones.child.ios,"icon",1024,1024);

    // invisibleLayer(docTemplateLogoPhotoshop,"color_main");
    // invisibleLayer(docTemplateLogoPhotoshop,"color_secondary");
        
    docTemplateLogoPhotoshop.close(SaveOptions.DONOTSAVECHANGES);


// crée le Header Player Store
    changeLayerColor( docHeaderPlayer,argsApp.layerMain.name,argsCustomer.colorMain );
    resizeImageToFrame(docLogo,dimensionsLogo,{ h:350, w:874 });
    copyLayer(docLogo,"Calque 1");
    createNewLayer(docHeaderPlayer,"Logo");
    pasteLayer(docHeaderPlayer,"Logo");
    resizeAndSaveImageAsJpg(
        docHeaderPlayer,
        argsApp.pathApp + "/"+ argsCustomer.folderName +"/"+ argsApp.pathFolderIcones.screen ,argsApp.fileNameHeaderPlayer,1024,500);

// crée les screens
    #include "createMobileScreen.jsx"

    changeName(docScreen,argsCustomer.appTitle);
    resizeImageToFrame(docLogo,dimensionsLogo,{ h:32, w:70 });
    copyLayer(docLogo,"Calque 1");
    createNewLayer(docScreen,"Logo 10");
    pasteLayer(docScreen,"Logo 10");
    moveLogoToPosition(docScreen,"Logo 10",{ x:-188, y:-396});

    resizeImageToFrame(docLogo2,dimensionsLogo2,{ h:270, w:290 });
    copyLayer(docLogo2,"Calque 1");
    createNewLayer(docScreen,"Logo 20");
    pasteLayer(docScreen,"Logo 20");
    moveLogoToPosition(docScreen,"Logo 20",{ x:15, y:-220});
    

   // var colorHsl = calculateHslAdjustments(initialRgb, targetRgb);

    var colorHsl ={h:argsCustomer.colorHsl.h,s:argsCustomer.colorHsl.s, l:argsCustomer.colorHsl.l}
    createImages(docScreen,colorHsl);


// ferme les fichiers

    docLogo.close(SaveOptions.DONOTSAVECHANGES);
    docLogo2.close(SaveOptions.DONOTSAVECHANGES);   
    docHeaderPlayer.close(SaveOptions.DONOTSAVECHANGES);
    docScreen.close(SaveOptions.DONOTSAVECHANGES);

// crée un fichier de Log pour arrêter Photoshop
    var logFile = new File(argsApp.pathApp + "/PhotoshopLog.txt");
    logFile.open("w");
    logFile.writeln("Script terminé");
    logFile.close();
    }


main();