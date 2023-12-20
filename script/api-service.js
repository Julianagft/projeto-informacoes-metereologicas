// COMUNICAÇÃO COM A API
const parseString = require('xml2js').parseString;



const urlTempo = `http://servicos.cptec.inpe.br/XML/cidade/?id=${encodeURIComponent(codigoLocalidade)}/previsao.xml`;

const ulrLocalidade = `http://servicos.cptec.inpe.br/XML/listaCidades?city=${encodeURIComponent(cidade)}`;

const buscaLocalidade = async () => {
    try {
        const resposta = await fetch(ulrLocalidade);
        if (resposta.ok) {
            const data = await resposta.json();
            return data
        } else {
            console.error('Erro na requisição: ',erro);
        }
    } catch(erro) {
        window.alert('Erro na requisição. Tente novamente em alguns minutos!');
        console.error('Erro na requisição: ', erro)
    }
}

const previsaoCapitais = async () => {
    try {
        const resposta = await fetch(urlTempo);
        if (resposta.ok) {
            const data = await resposta.json();
            return data;
        } else {
            window.alert('Erro ao obter dados! Verifique se digitou corretamente e tente novamente.')
            console.error('Erro ao obter dados:', resposta.statusText);
        }
    } catch (erro) {
        window.alert('Erro na requisição. Tente novamente em alguns minutos!');
        console.error('Erro na requisição: ', erro)
     }
}
// Função para converter XML em objeto JavaScript
const parseXml = (xml) => {
    return new Promise((resolve, reject) => {
      parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };


export const service = {
    previsaoCapitais
}