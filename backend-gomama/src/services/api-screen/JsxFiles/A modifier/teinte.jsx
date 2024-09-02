// Fonction pour remplacer une couleur dans Photoshop
function replaceColorInPhotoshop(oldColorRGB, newColorRGB) {
  // Vérifier si un document est ouvert dans Photoshop
  if (!app.documents.length) {
    alert("Aucun document ouvert dans Photoshop.");
    return;
  }

  // Récupérer le document actif
  var doc = app.activeDocument;

  // Définir la couleur à remplacer
  var oldColor = new SolidColor();
  oldColor.rgb.red = oldColorRGB[0];
  oldColor.rgb.green = oldColorRGB[1];
  oldColor.rgb.blue = oldColorRGB[2];

  // Définir la couleur de remplacement
  var newColor = new SolidColor();
  newColor.rgb.red = newColorRGB[0];
  newColor.rgb.green = newColorRGB[1];
  newColor.rgb.blue = newColorRGB[2];

  // Créer un échantillon de couleur pour la couleur spécifiée à remplacer
  var colorSampler = doc.colorSamplers.add([
    oldColor.rgb.red,
    oldColor.rgb.green,
    oldColor.rgb.blue,
  ]);

  // Sélectionner la couleur de l'échantillon
  var colorRange = colorSampler.createColorRangeSelection(0);

  // Appliquer la nouvelle couleur à la sélection
  app.activeDocument.selection.select(colorRange);
  app.activeDocument.selection.fill(newColor);

  // Supprimer l'échantillon de couleur utilisé
  colorSampler.remove();

  // Informer que l'opération est terminée
  alert("Couleur remplacée avec succès dans l'image.");
}

// Exemple d'utilisation :
var oldColorRGB = [51, 121, 241]; // Ancienne couleur (bleu)
var newColorRGB = [255, 0, 0]; // Nouvelle couleur (rouge vif)

// Appeler la fonction pour remplacer la couleur dans Photoshop
replaceColorInPhotoshop(oldColorRGB, newColorRGB);
