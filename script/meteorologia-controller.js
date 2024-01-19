// Cria o template 

import { service } from "./api-service.js";

const verificar = document.querySelector('#verificar');

verificar.addEventListener('click', function (event) {
    event.preventDefault();
    buscarPrevisaoCidade();
});

async function buscarPrevisaoCidade() {
    const inputMunicipio = document.querySelector('#icidade');
    const municipio = inputMunicipio.value; 
    const resp = document.querySelector('#resp');

    try {
        const dadosPrevisao = await service.previsaoLocalidade(municipio);

        if (dadosPrevisao) {
            resp.innerHTML = `<h3>${dadosPrevisao.name}</h3>
                <p> Temperatura Atual: ${dadosPrevisao.main.temp}°C</p>
                <p> Máxima: ${dadosPrevisao.main.temp_max}°C</p>
                <p> Mínima: ${dadosPrevisao.main.temp_min}°C</p>
                <p> Umidade: ${dadosPrevisao.main.humidity}%</p>`;
        } else {
            resp.innerHTML = `<p>Município não encontrado.</p>`;
        }
    } catch(erro) {
        console.error('Erro ao buscar dados:', erro);
        window.alert('Erro ao buscar dados. Tente novamente em alguns minutos!');
    }
}
