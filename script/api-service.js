const apiKey = "SUA_API_KEY_AQUI"; // Substitua com sua chave de API

const urlPrevisao = (cidadeNome) => `https://api.openweathermap.org/data/2.5/weather?q=${cidadeNome}&units=metric&appid=${apiKey}`;

const previsaoLocalidade = async (municipio) => {
    try {
        const resposta = await fetch(urlPrevisao(municipio));
        if (resposta.ok) {
            const data = await resposta.json();
            console.log(data);
            return data;
        } else {
            console.error('Erro ao obter dados:', resposta.statusText);
        }
    } catch (erro) {
        console.error('Erro na requisição: ', erro);
        return null;
    }
}

export const service = {
    previsaoLocalidade
}
