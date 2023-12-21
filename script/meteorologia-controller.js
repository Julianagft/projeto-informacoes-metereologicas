// Cria o template 

import { service } from "./api-service.js";
const verificar = document.querySelector('#verificar')

verificar.addEventListener('click', function (event) {
    event.preventDefault();
    BuscarCidades();
});

async function BuscarCidades() {
    const inputMunicipio = document.querySelector('#icidade');
    const municipio = inputMunicipio.value; 
    const resp = document.querySelector('#resp');

    try {
                
        // Verifica se o município foi encontrado
        const dadosMunicipio = await service.buscaLocalidade(municipio);

        if(dadosMunicipio){
            const cidadeId = dadosMunicipio.id
            // Obtém os dados da previsão do serviço usando o ID da cidade
            const dadosPrevisao = await service.previsaoLocalidade(cidadeId);

            resp.innerHTML += `<h2>${municipio} - ${cidadeEncontrada.uf}</h2>
                    <p><strong>ID do Município:</strong> ${cidadeId}</p>
                    <p><strong>Temperatura Máxima:</strong> ${dadosPrevisao[cidadeId].dia.previsao.maxima}</p>
                    <p><strong>Temperatura Mínima:</strong> ${dadosPrevisao[cidadeId].dia.previsao.minima}</p>
                    <p><strong>Valor máximo de radiação revisado para hoje:</strong> ${dadosPrevisao[cidadeId].previsao.dia.iuv}</p>`;

        } else {
            resp.innerHTML = `<p>Município não encontrado.</p>`;
        }
        
    } catch(erro) {
        console.error('Erro ao buscar dados:', erro);
        window.alert('Erro ao buscar dados. Tente novamente em alguns minutos!');
    } 
}

