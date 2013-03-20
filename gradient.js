
var whiteRedGradient = gradient([colorObjFromRgb(255, 255, 255), colorObjFromRgb(255,0,0)]);

var blueWhiteRedGradient = gradient([
  colorObjFromRgb(0, 0, 255), 
  colorObjFromRgb(0, 255, 255),
  colorObjFromRgb(255, 255, 255),
  colorObjFromRgb(255, 255, 0), 
  colorObjFromRgb(255, 0, 0)
]);

var colorTemperatureGradient = gradient([
 colorObjFromRgb(111, 220, 254), 
 colorObjFromRgb(170, 243, 237),
 colorObjFromRgb(214, 255, 209),
 colorObjFromRgb(252, 181, 14)
]);

function colorObjFromRgb(r, g, b) {
  return { r:r, g:g, b:b };
}

function rgbFromObj(o) {
  return 'rgb('+o.r+','+o.g+','+o.b+')';
}

function gradient(colors) {

  if (!colors || !colors.length)
    throw Error('Colors must be provided!')

  function colorFromPosition(position) {
    if (position < 0 || position > 1)
      throw Error('Position out of range');

    var sections = colors.length - 1;

    if (position == 1) return rgbFromObj(colors[sections]);

    var unit = 1.0/sections;
    var section = Math.floor(position/unit);
    var sectionPosition = position%unit * sections;
    var colorLeft = colors[section];
    var colorRight = colors[section+1];
    var r = monochromaticGradient(colorLeft.r, colorRight.r, sectionPosition);
    var g = monochromaticGradient(colorLeft.g, colorRight.g, sectionPosition);
    var b = monochromaticGradient(colorLeft.b, colorRight.b, sectionPosition);

    var color = rgbFromObj(colorObjFromRgb(r, g, b));
    return color;
  }

  function monochromaticGradient(left, right, position) {
    if (left == right)
      return left;

    var difference = (left < right) ? right - left : left - right;
    var factor = ((left < right) ? 1 : -1);
    var advancement = Math.floor(difference*position*factor);

    if (255 - left < advancement)
        throw new ArgumentException("invalid color value");

    var value = left + advancement;
    return value;
  }

  return colorFromPosition;
}

