// COMUNICAÇÃO COM A API

const APIKey = '412f6fc81b4ae1fc4163434f97f003b0';

// Função para gerar a URL de previsão do tempo
const urlPrevisao = (cidadeNome) => `https://api.openweathermap.org/data/2.5/weather?q=${cidadeNome}&units=metric&appid=${APIKey}`;

// Função para buscar a previsão do tempo de uma localidade
const previsaoLocalidade = async (municipio) => {
    try {
        const resposta = await fetch(urlPrevisao(municipio));
        if (resposta.ok) {
            const data = await resposta.json();
            return data;
        } else {
            console.error('Erro ao obter dados:', resposta.statusText);
            return null;
        }
    } catch (erro) {
        console.error('Erro na requisição: ', erro);
        return null;
    }
}

export const service = {
    previsaoLocalidade
}
