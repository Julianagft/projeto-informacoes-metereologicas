// Cria o template 

import { service } from "./api-service";

async function BuscarCidades() {
    const inputMunicipio = document.querySelector('#icidade');
    const municipio = inputMunicipio.value; 
    const resp = document.querySelector('#campo');

    try {
        const dadosMunicipio = await service.buscaLocalidade();
        const dadosPrevisao = await service.previsaoLocalidade();

        // Encontrar o objeto correspondente ao município inserido pelo usuário
        const cidadeEncontrada = dadosMunicipio.find(cidade => cidade.nome === municipio);

        if (cidadeEncontrada) {
            // Extrair o ID da cidade encontrada
            const cidadeId = cidadeEncontrada.id;

            resp.innerHTML += `<h2>${municipio} - ${cidadeEncontrada.uf}</h2>
                <p><strong>ID do Município:</strong> ${cidadeId}</p>
                <p><strong>Temperatura Máxima:</strong> ${dadosPrevisao[cidadeId].dia.previsao.maxima}</p>
                <p><strong>Temperatura Mínima:</strong> ${dadosPrevisao[cidadeId].dia.previsao.minima}</p>
                <p><strong>Valor máximo de radiação revisado para hoje:</strong> ${dadosPrevisao[cidadeId].previsao.dia.iuv}</p>`;
        } else {
            resp.innerHTML = `<p>Município não encontrado.</p>`;
        }

        resp.innerHTML = `<h2>${municipio.nome}- ${uf.uf}</h2>
        <p><strong>Temperatura:</strong> máxima de ${cidade.dia.previsao.maxima}</p>
        <p><strong>Temperatura:</strong> máxima de ${cidade.dia.previsao.minima}</p>
        <p><strong>Valor máximo de radiação ´revista para hoje: </strong> ${cidade.previsao.dia.iuv}</p>`;

    
    } catch(erro) {
        console.error('Erro ao buscar dados:', erro);
        window.alert('Erro ao buscar dados. Tente novamente em alguns minutos!');
    }

}

