function parseXml(xmlString) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    var result = parseNode(xmlDoc.documentElement);
    return result;
  }

  function parseNode(node) {
    var result = {};

    // Se o nó for a raiz, processa os filhos
    if (node.nodeType === 1) {
      for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];

        // Ignora nós de texto e quebras de linha
        if (child.nodeType === 1) {
          var childResult = parseCityNode(child);

          if (result[child.nodeName]) {
            // Se o nó já existe no resultado, converte-o para uma matriz
            if (!Array.isArray(result[child.nodeName])) {
              result[child.nodeName] = [result[child.nodeName]];
            }
            result[child.nodeName].push(childResult);
          } else {
            result[child.nodeName] = childResult;
          }
        }
      }
    }

    return result;
  }

  function parseCityNode(node) {
    var city = {};

    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];

      if (child.nodeType === 1) {
        if (child.nodeName === 'previsao') {
          // Se o nó for 'previsao', processa-o recursivamente
          if (!city['previsao']) {
            city['previsao'] = [];
          }
          var forecast = parseForecastNode(child);
          city['previsao'].push(forecast);
        } else {
          city[child.nodeName] = child.textContent.trim();
        }
      }
    }

    return city;
  }

  function parseForecastNode(node) {
    var forecast = {};

    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];

      if (child.nodeType === 1) {
        forecast[child.nodeName] = child.textContent.trim();
      }
    }

    return forecast;
  }


export const conversor = {
    parseXml,
    parseNode,
    parseCityNode

}