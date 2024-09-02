function changeName(doc, name) {
  app.activeDocument = doc;
  doc.layers.getByName("Track Name").textItem.contents = name;
}

function calculateHslAdjustments(initialRgb, targetRgb) {
  var initialHsl = rgbToHsl(initialRgb[0], initialRgb[1], initialRgb[2]);
  var targetHsl = rgbToHsl(targetRgb[0], targetRgb[1], targetRgb[2]);

  var hAdjustment = targetHsl[0] - initialHsl[0];
  var sAdjustment = targetHsl[1] - initialHsl[1];
  var lAdjustment = targetHsl[2] - initialHsl[2];

  // Ajuster la teinte pour être dans la plage -180 à 180
  if (hAdjustment > 180) hAdjustment -= 360;
  else if (hAdjustment < -180) hAdjustment += 360;
  // Ajuster les échelles de saturation et de luminosité pour être entre -100 et 100
  // Ajuster les échelles de saturation et de luminosité pour être entre -100 et 100
  sAdjustment = Math.max(-100, Math.min(100, sAdjustment));
  lAdjustment = Math.max(-100, Math.min(100, lAdjustment));

  return { h: hAdjustment, s: sAdjustment, l: lAdjustment };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatique
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hueSaturationLight(hue, saturation, light) {
  try {
    var aDesc = new ActionDescriptor();
    var userInput = new ActionDescriptor();
    var aList = new ActionList();

    userInput.putInteger(charIDToTypeID("H   "), hue);
    userInput.putInteger(charIDToTypeID("Strt"), saturation);
    userInput.putInteger(charIDToTypeID("Lght"), light);

    aDesc.putBoolean(charIDToTypeID("Clrz"), false);
    aList.putObject(charIDToTypeID("Hst2"), userInput);
    aDesc.putList(charIDToTypeID("Adjs"), aList);
    executeAction(charIDToTypeID("HStr"), aDesc, DialogModes.NO);
  } catch (e) {
    alert("Error: " + e.message);
  }
}

function saveImageJpg(doc, folder, name) {
  var options = new JPEGSaveOptions();
  options.quality = 12;
  doc.saveAs(File(folder + "/" + name), options, true); //true enregistre une copie
}

function resizeLayer(doc, new_width, new_height) {
  var startRulerUnits = app.preferences.rulerUnits;
  app.preferences.rulerUnits = Units.PIXELS;
  var bounds = doc.activeLayer.bounds;
  var width = bounds[2].value - bounds[0].value;
  var height = bounds[3].value - bounds[1].value;
  doc.activeLayer.resize(new_width, new_height, AnchorPosition.MIDDLECENTER);
  app.preferences.rulerUnits = startRulerUnits;
}

function createImages(doc, colorHsl) {
  var layers = doc.layers;

  // état de l'historique actuel pour annulé les mofication
  var docHistoryStateBeforeChangement =
    doc.historyStates[doc.historyStates.length - 1];

  for (var i = 1; i < layers.length; i++) {
    var layer = layers[i];
    layer.visible = false;
  }
  var color = { h: colorHsl.h, s: colorHsl.s, l: colorHsl.l };

  for (var i = 1; i <= 8; i++) {
    var selected_layer = layers.getByName("Image " + i + " Color"); //selectionne le calque pour lui changer la couleur
    doc.activeLayer = selected_layer;
    hueSaturationLight(color.h, color.s, color.l); // change la couleur du calque en cour
  }

  //change la couleur du titre de la piste
  doc.activeLayer = layers.getByName("Track Name Color");
  hueSaturationLight(color.h, color.s, color.l); // change la couleur du calque en cour

  //cache tous les layers
  for (var i = 0; i < layers.length; i++) {
    //cache tous les layers
    layers[i].visible = false;
  }

  var logo1 = layers.getByName("Logo 10");
  var logo2 = layers.getByName("Logo 20");
  var trackName = layers.getByName("Track Name");
  var trackNameColor = layers.getByName("Track Name Color");
  var androidFolder = new Folder(
    argsApp.pathApp +
      "/" +
      argsCustomer.folderName +
      "/" +
      argsApp.pathFolderIcones.screen +
      "/" +
      argsApp.pathFolderIcones.child.android
  );
  var iphoneFolder = new Folder(
    argsApp.pathApp +
      "/" +
      argsCustomer.folderName +
      "/" +
      argsApp.pathFolderIcones.screen +
      "/" +
      argsApp.pathFolderIcones.child.ios +
      "/" +
      argsApp.pathFolderIcones.type.iphone
  );
  var ipadFolder = new Folder(
    argsApp.pathApp +
      "/" +
      argsCustomer.folderName +
      "/" +
      argsApp.pathFolderIcones.screen +
      "/" +
      argsApp.pathFolderIcones.child.ios +
      "/" +
      argsApp.pathFolderIcones.type.ipad
  );
  var saveFolders = [androidFolder, iphoneFolder]; //ipad_folder //liste des dossiers ou seront enregistré les images

  var docHistoryStateBeforeSaveChangement =
    doc.historyStates[doc.historyStates.length - 1];

  for (var j = 0; j < saveFolders.length; j++) {
    //1->enregistre pour android / 2-> pour iphone / 3-> pour ipad
    if (saveFolders[j] == iphoneFolder) {
      //redimentionne pour l'iphone
      doc.resizeImage(
        UnitValue(1242, "px"),
        UnitValue(2208, "px"),
        null,
        ResampleMethod.AUTOMATIC
      ); //(null garde la current valeur dpi)
    }

    if (saveFolders[j] == ipadFolder) {
      //redimentionne pour l'ipad
      doc.resizeImage(
        UnitValue(1537, "px"),
        UnitValue(2732, "px"),
        null,
        ResampleMethod.AUTOMATIC
      ); //(null garde la current valeur dpi)
      doc.resizeCanvas(
        new UnitValue(2048, "px"),
        new UnitValue(2732, "px"),
        AnchorPosition.MIDDLECENTER
      );

      doc.activeLayer = layers.getByName("Background Black");
      background_layer.visible = true;
      resizeLayer(doc, 2048, 2732); //redimentionne le background de fond
    }

    for (var i = 1; i <= 8; i++) {
      if (
        (i == 2 || i == 6 || i == 7) &&
        (saveFolders[j] == ipadFolder || saveFolders[j] == iphoneFolder)
      ) {
        // pas besoin de l'image 2 6 7 pour apple
        continue;
      }

      var image = layers.getByName("Image " + i);
      var imageColor = layers.getByName("Image " + i + " Color");
      image.visible = true;
      imageColor.visible = true;
      if (i == 1) {
        logo2.visible = true;
      }

      if (i != 1 && i != 2) {
        logo1.visible = true;
        trackName.visible = true;
        trackNameColor.visible = true;
      }

      saveImageJpg(doc, saveFolders[j], i + ".jpg");

      image.visible = false;
      imageColor.visible = false;

      logo1.visible = false;
      logo2.visible = false;
      trackName.visible = false;
      trackNameColor.visible = false;
    }

    //annule la redimention ... après avoir sauvegardé avant de passer au dossier suivant
    doc.activeHistoryState = docHistoryStateBeforeSaveChangement;
  }

  doc.activeHistoryState = docHistoryStateBeforeChangement;

  //remet le document à sont état de départ
}
