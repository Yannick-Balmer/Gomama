function createMobileIcones(doc, androidIcons, iosIcons, iosSplash) {
  var doc = app.activeDocument; // get a reference to the current (active) document
  doc.changeMode(ChangeMode.RGB); // change the color mode to RGB.  Important for resizing GIFs with indexed colors, to get better results

  //resize et enregistre les icones pour android
  for (var i = 0; i < androidIcons.length; i++) {
    var icon = androidIcons[i];
    resizeAndSaveImageAsPng(
      docTemplateLogoPhotoshop,
      argsCustomer.folderName +
        "/" +
        argsApp.pathFolderIcones.images +
        "/" +
        argsApp.pathFolderIcones.child.android,
      icon.name,
      icon.width,
      icon.height
    );
  }

  //resize et enregistre les icones pour ios
  for (var i = 0; i < iosIcons.length; i++) {
    var icon = iosIcons[i];
    resizeAndSaveImageAsPng(
      docTemplateLogoPhotoshop,
      argsCustomer.folderName +
        "/" +
        argsApp.pathFolderIcones.images +
        "/" +
        argsApp.pathFolderIcones.child.ios,
      icon.name,
      icon.width,
      icon.height
    );
  }

  // Pour ios cree les splash en noir
  var BGcolor = new SolidColor();
  BGcolor.rgb.red = 0;
  BGcolor.rgb.green = 0;
  BGcolor.rgb.blue = 0;

  backgroundColor.rgb.hexValue = BGcolor.rgb.hexValue; //change la couleur du background
  var docTemp = app.documents.add(
    100,
    100,
    72,
    "Nom du document",
    NewDocumentMode.RGB,
    DocumentFill.BACKGROUNDCOLOR
  ); //width height dpi nomdudoc type couleurdefond

  //resize et enregistre les splash pour ios
  for (var i = 0; i < iosSplash.length; i++) {
    var splash = iosSplash[i];
    resizeAndSaveImageAsPng(
      docTemp,
      argsCustomer.folderName +
        "/" +
        argsApp.pathFolderIcones.images +
        "/" +
        argsApp.pathFolderIcones.child.ios,
      splash.name,
      splash.width,
      splash.height
    );
  }

  docTemp.close(SaveOptions.DONOTSAVECHANGES);
}
