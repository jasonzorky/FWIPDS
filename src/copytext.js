function getLocation(href) {
  var location = document.createElement("a");
  location.href = href;
  // IE doesn't populate all link properties when setting .href with a relative URL,
  // however .href will return an absolute URL which then can be used on itself
  // to populate these additional fields.
  if (location.host == "") {
    location.href = location.href;
  }
  return location;
};
var urlToParse = 'https://LinkDiretoPremium.ga/${dataCid}/?filename=${file.name}',
  a = getLocation(urlToParse);
