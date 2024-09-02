// Fonction pour convertir une couleur RGB en HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
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
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
    h *= 360;

    // Adjust h to range from -180 to +180
    if (h > 180) {
      h -= 360;
    }
  }

  // Adjust s and l to range from -100 to +100
  s *= 100;
  l *= 100;

  return [h, s, l];
}

// Fonction pour calculer la couleur résultante après superposition
function calculateOverlayHSL(backgroundColor, targetColor) {
  // Convertir les couleurs de RVB à HSL
  var backgroundHSL = rgbToHsl(
    backgroundColor.r,
    backgroundColor.g,
    backgroundColor.b
  );
  var targetHSL = rgbToHsl(targetColor.r, targetColor.g, targetColor.b);

  // Calculer les ajustements nécessaires en HSL
  var hueAdjust = (targetHSL[0] - backgroundHSL[0] + 360) % 360;
  if (hueAdjust > 180) hueAdjust -= 360; // Ajuster la plage de -180 à 180

  var saturationAdjust = targetHSL[1] - backgroundHSL[1];
  var lightnessAdjust = targetHSL[2] - backgroundHSL[2];

  return {
    hue: hueAdjust,
    saturation: saturationAdjust,
    lightness: lightnessAdjust,
  };
}

var valeur = calculateOverlayHSL(
  { r: 51, g: 121, b: 241 },
  { r: 30, g: 114, b: 19 }
);
alert(valeur.hue);
alert(valeur.saturation);
alert(valeur.lightness);

// // Exécuter le script dans Photoshop
// (function() {
//     var doc = app.activeDocument;
//     var layer = doc.activeLayer;

//     var overlayHSL = calculateOverlayHSL();

//     applyHslToLayer(layer, overlayHSL.hue, overlayHSL.saturation, overlayHSL.lightness);

//     alert("Hue: " + overlayHSL.hue + "\nSaturation: " + overlayHSL.saturation + "\nLightness: " + overlayHSL.lightness);
// })();
