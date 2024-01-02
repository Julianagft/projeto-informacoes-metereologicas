// COMUNICAÇÃO COM A API
import {conversor} from "./xml-conversor.js"

const urlTempo = (cidadeId) => `http://servicos.cptec.inpe.br/XML/cidade/${cidadeId}/previsao.xml`; //request parameter

const urlLocalidade = (cidadeNome) => `http://servicos.cptec.inpe.br/XML/listaCidades?city=${cidadeNome}`;


const buscaLocalidade = async (municipio) => {
    try {
        const resposta = await fetch(urlLocalidade(municipio));
        if (resposta.ok) {
            const data = await resposta.text();
            const resultado = conversor.parseXml(data);
            console.log(resultado)
            return resultado.cidade[0];
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
        console.log(cidadeId)
        const resposta = await fetch(urlTempo(cidadeId));
        if (resposta.ok) {
            const data = await resposta.text();
            const resultado = await conversor.parseXml(data)
            return resultado.previsao;
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