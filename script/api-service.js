// COMUNICAÇÃO COM A API
const parseString = require('xml2js').parseString;

const urlTempo = `http://servicos.cptec.inpe.br/XML/cidade/?id=${encodeURIComponent(cidadeId)}/previsao.xml`;

const urlLocalidade = `http://servicos.cptec.inpe.br/XML/listaCidades?city=${encodeURIComponent(cidade.nome)}`;

const buscaLocalidade = async () => {
    try {
        const resposta = await fetch(urlLocalidade);
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

const previsaoLocalidade = async () => {
    try {
        const resposta = await fetch(urlTempo);
        if (resposta.ok) {
            const data = await resposta.json();
            return data;
        } else {
            console.error('Erro ao obter dados:', resposta.statusText);
        }
    } catch (erro) {
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
    previsaoLocalidade,
    buscaLocalidade
}