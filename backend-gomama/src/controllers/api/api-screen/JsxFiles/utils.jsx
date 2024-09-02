function activateDocument(nameDocument) {
  // Parcourir tous les documents ouverts
  for (var i = 0; i < app.documents.length; i++) {
    var currentDoc = app.documents[i];
    if (currentDoc.name == nameDocument) {
      // Activer le document trouvé
      // app.activeDocument = currentDoc;
      return currentDoc;
      // break;
    }
  }
}

// change les couleurs de l'icone avec le fichier de config intitulé
function changeLayerColor(doc, layerName, colors) {
  if (!doc || !layerName) {
    throw new Error(
      "Il manque un argument nécessaire pour changer la couleur du calque."
    );
  }

  if (
    colors.red < 0 ||
    colors.red > 255 ||
    colors.green < 0 ||
    colors.green > 255 ||
    colors.blue < 0 ||
    colors.blue > 255
  ) {
    throw new Error(
      "Les composantes de couleur doivent être comprises entre 0 et 255."
    );
  }

  var color = new SolidColor();

  color.rgb.red = colors.red;
  color.rgb.green = colors.green;
  color.rgb.blue = colors.blue;
  app.activeDocument = doc;
  doc.activeLayer = doc.layers.getByName(layerName);
  doc.selection.fill(color);
}

// change les couleurs de l'icone avec le fichier de config intitulé
function changeLayerColorHalfHeight(doc, layerName, colors) {
  if (!doc || !layerName) {
    throw new Error(
      "Il manque un argument nécessaire pour changer la couleur du calque."
    );
  }

  if (
    colors.red < 0 ||
    colors.red > 255 ||
    colors.green < 0 ||
    colors.green > 255 ||
    colors.blue < 0 ||
    colors.blue > 255
  ) {
    throw new Error(
      "Les composantes de couleur doivent être comprises entre 0 et 255."
    );
  }

  var color = new SolidColor();

  color.rgb.red = colors.red;
  color.rgb.green = colors.green;
  color.rgb.blue = colors.blue;
  app.activeDocument = doc;
  doc.activeLayer = doc.layers.getByName(layerName);

  var docWidth = doc.width;
  var docHeight = doc.height;

  // Définir la zone de sélection (la moitié basse du calque)
  var halfHeight = docHeight / 2;
  doc.selection.select([
    [0, halfHeight], // Point supérieur gauche de la moitié basse
    [docWidth, halfHeight], // Point supérieur droit de la moitié basse
    [docWidth, docHeight], // Point inférieur droit
    [0, docHeight], // Point inférieur gauche
  ]);

  doc.selection.fill(color, ColorBlendMode.NORMAL, 100, false);
}

// Fonction pour copier un nouveau calque d'un document
function copyLayer(doc, layerName) {
  app.activeDocument = doc;
  doc.activeLayer = doc.artLayers.getByName(layerName);
  doc.activeLayer.copy();
}

// Fonction pour créer un nouveau calque vide
function createNewLayer(doc, layerName) {
  app.activeDocument = doc;
  var newLayer = doc.artLayers.add();
  newLayer.name = layerName;
}

// Fonction pour rendre un calque invisible
function invisibleLayer(doc, layerName) {
  app.activeDocument = doc;
  doc.activeLayer = doc.artLayers.getByName(layerName);
  doc.activeLayer.visible = false;
}

// Fonction pour mesurer la taille de l'image
function measuresLayer(doc, layerName) {
  app.activeDocument = doc;
  var layer = doc.layers.getByName(layerName);
  var bounds = layer.bounds;
  var left = bounds[0].as("px");
  var top = bounds[1].as("px");
  var right = bounds[2].as("px");
  var bottom = bounds[3].as("px");

  var width = right - left;
  var height = bottom - top;

  return { w: width, h: height };
}

// Fonction pour positionner l'image collée avec un décalage x,y
function moveLogoToPosition(doc, layerName, position) {
  app.activeDocument = doc;
  var layer = doc.artLayers.getByName(layerName);
  layer.translate(position.x, position.y);
}

// Fonction pour coller dans un calque spécifique d'un autre document
function pasteLayer(targetDoc, targetLayerName) {
  app.activeDocument = targetDoc;
  targetDoc.activeLayer = targetDoc.artLayers.getByName(targetLayerName);
  targetDoc.paste();
}

function readJSONFile(filePath) {
  var file = new File(filePath);
  var data = null;

  if (file.exists) {
    file.open("r");
    try {
      data = eval("(" + file.read() + ")");
    } catch (e) {
      alert("Erreur lors de l'analyse du JSON : " + e.message);
    }
    file.close();
  } else {
    alert("Le fichier n'existe pas : " + filePath);
  }

  return data;
}

// Fonction pour redimensionner un calque en fonction de la dimension d'un cadre de destination
function resizeImageToFrame(doc, dimensionsImage, dimensionsFrame) {
  app.activeDocument = doc;
  var R = dimensionsFrame.h / dimensionsFrame.w; // rapport des dimensions du Logo Hauteur/Largeur
  var RLogo = dimensionsImage.h / dimensionsImage.w;
  if (RLogo > R) {
    var newHeight = dimensionsFrame.h;
    var newWidth = dimensionsFrame.h / RLogo;
    doc.resizeImage(UnitValue(newWidth, "px"), UnitValue(newHeight, "px"));
  } else {
    var newWidth = dimensionsFrame.w;
    var newHeight = dimensionsFrame.w * RLogo;
    doc.resizeImage(UnitValue(newWidth, "px"), UnitValue(newHeight, "px"));
  }
}

function resizeAndSaveImageAsJpg(doc, folder, name, width, height) {
  app.activeDocument = doc;
  doc.resizeImage(
    UnitValue(width, "px"),
    UnitValue(height, "px"),
    null,
    ResampleMethod.AUTOMATIC
  ); //(null garde la current valeur dpi)

  var options = new JPEGSaveOptions();
  options.quality = 12; // Qualité maximale (0 à 12)

  doc.saveAs(File(folder + "/" + name), options, true); //true enregistre une copie
  doc.activeHistoryState = doc.historyStates[doc.historyStates.length - 2]; //annule la redimension d'image
}

function resizeAndSaveImageAsPng(doc, folder, name, width, height) {
  app.activeDocument = doc;
  doc.resizeImage(
    UnitValue(width, "px"),
    UnitValue(height, "px"),
    null,
    ResampleMethod.AUTOMATIC
  ); //(null garde la current valeur dpi)

  var options = new PNGSaveOptions(); //If true, rows are interlaced //ou options.interlaced = false;
  options.interlaced = false;
  options.compression = 1; //compression 0= sans compression 1= avec compression

  doc.saveAs(File(folder + "/" + name), options, true); //true enregistre une copie
  doc.activeHistoryState = doc.historyStates[doc.historyStates.length - 2]; //annule la redimension d'image
}

function saveImageAsPng(doc, folder, name) {
  app.activeDocument = doc;

  var options = new PNGSaveOptions(); //If true, rows are interlaced //ou options.interlaced = false;
  options.interlaced = false;
  options.compression = 1; //compression 0= sans compression 1= avec compression
  doc.saveAs(File(folder + "/" + name), options, true); //true enregistre une copie
  doc.activeHistoryState = doc.historyStates[doc.historyStates.length - 2]; //annule la redimension d'image
}

// Fonction pour ajouter un calque d'arrière-plan blanc
function addWhiteBackground() {
  var doc = app.activeDocument;
  var backgroundLayer = doc.artLayers.add();
  backgroundLayer.name = "Background";
  backgroundLayer.move(
    doc.artLayers[doc.artLayers.length - 1],
    ElementPlacement.PLACEAFTER
  );
  doc.selection.selectAll();
  doc.selection.fill(app.foregroundColor);
  doc.selection.deselect();
  backgroundLayer.isBackgroundLayer = true;
}
