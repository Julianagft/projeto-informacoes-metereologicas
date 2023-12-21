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
        console.log(dadosMunicipio)

        if(dadosMunicipio){

            const cidadeId = dadosMunicipio.id
            // Obtém os dados da previsão do serviço usando o ID da cidade
            const resposta = await service.previsaoLocalidade(cidadeId);
            const dadosPrevisao = resposta.find((previsao)=> previsao.dia == data())        

            resp.innerHTML = `<h2>${municipio} - ${dadosMunicipio.uf}</h2>
                    <p><strong>Temperatura Máxima:</strong> ${dadosPrevisao.maxima}</p>
                    <p><strong>Temperatura Mínima:</strong> ${dadosPrevisao.minima}</p>
                    <p><strong>Valor máximo de radiação revisado para hoje:</strong> ${dadosPrevisao.iuv}</p>`;

        } else {
            resp.innerHTML = `<p>Município não encontrado.</p>`;
        }
        
    } catch(erro) {
        console.error('Erro ao buscar dados:', erro);
        window.alert('Erro ao buscar dados. Tente novamente em alguns minutos!');
    } 
}

function data () {
    // Obter a data atual
let dataAtual = new Date();

// Adicionar um dia para obter a data de amanhã
dataAtual.setDate(dataAtual.getDate() + 1);

// Obter os componentes da data
let diaAmanha = dataAtual.getDate();
let mesAmanha = dataAtual.getMonth() + 1; // Lembrando que o mês começa do zero
let anoAmanha = dataAtual.getFullYear();

// Adicionar zeros à esquerda para garantir dois dígitos para dia e mês
diaAmanha = diaAmanha < 10 ? `0${diaAmanha}` : diaAmanha;
mesAmanha = mesAmanha < 10 ? `0${mesAmanha}` : mesAmanha;

// Formatar a data de amanhã no formato desejado
let dataAmanhaFormatada = `${anoAmanha}/${mesAmanha}/${diaAmanha}`;

return dataAmanhaFormatada;

}