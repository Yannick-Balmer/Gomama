// // Fonction pour ajuster la teinte, la saturation et la luminosité
// function hueSaturationLight(hue, saturation, light) {
//   var aDesc = new ActionDescriptor();
//   var userInput = new ActionDescriptor();
//   var aList = new ActionList();

//   userInput.putInteger(charIDToTypeID("H   "), Math.round(hue));
//   userInput.putInteger(charIDToTypeID("Strt"), Math.round(saturation));
//   userInput.putInteger(charIDToTypeID("Lght"), Math.round(light));

//   aDesc.putBoolean(charIDToTypeID("Clrz"), false);
//   aList.putObject(charIDToTypeID("Hst2"), userInput);
//   aDesc.putList(charIDToTypeID("Adjs"), aList);
//   executeAction(charIDToTypeID("HStr"), aDesc, DialogModes.NO); // DialogModes.ALL pour ouvrir la boîte de dialogue
// }

// Fonction pour ajuster la teinte, la saturation et la luminosité
function hueSaturationLight(hue, saturation, light) {
  var desc = new ActionDescriptor();
  var hueSatAdjustDesc = new ActionDescriptor();
  var hueSatList = new ActionList();

  hueSatAdjustDesc.putInteger(charIDToTypeID("H   "), hue);
  hueSatAdjustDesc.putInteger(charIDToTypeID("Strt"), saturation);
  hueSatAdjustDesc.putInteger(charIDToTypeID("Lght"), light);

  hueSatList.putObject(charIDToTypeID("Hst2"), hueSatAdjustDesc);
  desc.putList(charIDToTypeID("Adjs"), hueSatList);
  desc.putBoolean(charIDToTypeID("Clrz"), false);

  try {
    executeAction(charIDToTypeID("HStr"), desc, DialogModes.NO);
  } catch (e) {
    alert("Erreur lors de l'exécution de l'action : " + e);
  }
}

// Fonction pour convertir une couleur RVB en HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max === min) {
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

// Fonction pour calculer les ajustements nécessaires avec les nouvelles échelles
function calculateHslAdjustments(initialRgb, targetRgb) {
  var initialHsl = rgbToHsl(initialRgb[0], initialRgb[1], initialRgb[2]);
  var targetHsl = rgbToHsl(targetRgb[0], targetRgb[1], targetRgb[2]);

  var hAdjustment = targetHsl[0] - initialHsl[0];
  var sAdjustment = targetHsl[1] - initialHsl[1];
  var lAdjustment = targetHsl[2] - initialHsl[2];

  // Ajuster la teinte pour être dans la plage -180 à 180
  if (hAdjustment > 180) {
    hAdjustment -= 360;
  } else if (hAdjustment < -180) {
    hAdjustment += 360;
  }

  // Ajuster les échelles de saturation et de luminosité pour être entre -100 et 100
  sAdjustment = sAdjustment * 2;
  lAdjustment = lAdjustment * 2;

  return [hAdjustment, sAdjustment, lAdjustment];
}

// Exemple d'utilisation
var initialRgb = [51, 121, 241]; // Couleur bleue initiale
var targetRgb = [239, 32, 40]; // Couleur cible (rouge vif)

var adjustments = calculateHslAdjustments(initialRgb, targetRgb);

hueSaturationLight(adjustments[0], adjustments[1], adjustments[2]);
