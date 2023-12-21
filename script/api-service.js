// COMUNICAÇÃO COM A API
import fetch from 'node-fetch';
import { parseString } from 'xml2js';

const urlTempo = `http://servicos.cptec.inpe.br/XML/cidade/?id=${encodeURIComponent(cidadeId)}/previsao.xml`;

const urlLocalidade = `http://servicos.cptec.inpe.br/XML/listaCidades?city=${encodeURIComponent(cidade.nome)}`;

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


const buscaLocalidade = async (municipio) => {
    try {
        const resposta = await fetch(urlLocalidade);
        console.log('Resposta da requisição:', resposta);
        if (resposta.ok) {
            const data = await resposta.text();
            const resultado = await parseXml(data);
            console.log('Resultado da busca de localidade:', JSON.stringify(resultado, null, 2));
            console.log('Resultado da previsão de localidade:', JSON.stringify(resultado, null, 2));
            return resultado.cidades.cidade;
        } else {
            console.error('Erro na requisição: ',resposta.statusText);
            return null
        }
    } catch(erro) {
        console.error('Erro na requisição: ', erro)
        return null;
    }
}

const previsaoLocalidade = async (cidadeId) => {
    try {
        const resposta = await fetch(urlTempo);
        if (resposta.ok) {
            const data = await resposta.text();
            const resultado = await parseXml(data)
            return resultado;
        } else {
            console.error('Erro ao obter dados:', resposta.statusText);
        }
    } catch (erro) {
        console.error('Erro na requisição: ', erro);
        return null;
     }
}

export const service = {
    previsaoLocalidade,
    buscaLocalidade
}