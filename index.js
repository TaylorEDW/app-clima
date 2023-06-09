const container = document.querySelector('.container');
const procurar = document.querySelector('.procurar button');
const campoTexto = document.querySelector('.procurar input');
const clima = document.querySelector('.clima');
const climaDetalhes = document.querySelector('.clima-detalhes');
const erro404 = document.querySelector('.not-found');

const descricaoEmPortugues = {
  Clear: 'Céu limpo',
  Rain: 'Chuva',
  Snow: 'Neve',
  Clouds: 'Nublado',
  Mist: 'Neblina',
};

const descricaoDetalhadaEmPortugues = {
  'clear sky': 'Céu limpo',
  'few clouds': 'Poucas nuvens',
  'scattered clouds': 'Nuvens dispersas',
  'broken clouds': 'Nuvens quebradas',
  'shower rain': 'Chuva fraca',
  'rain': 'Chuva',
  'thunderstorm': 'Trovoada',
  'snow': 'Neve',
  'mist': 'Neblina',
  'overcast clouds': 'Nublado',
  'moderate rain' : 'Chuva moderada',
};

function realizarPesquisa() {
  const APIKey = '6d4a022d3ec0078c6d2f8f7042b4cede';
  const cidade = document.querySelector('.procurar input').value;

  if (cidade === '')
    return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404') {
        container.style.height = '400px';
        clima.style.display = 'none';
        climaDetalhes.style.display = 'none';
        erro404.style.display = 'block';
        erro404.classList.add('fadeIn');
      } else {
        erro404.style.display = 'none';
        erro404.classList.remove('fadeIn');

        const imagem = document.querySelector('.clima img');
        const temperatura = document.querySelector('.clima .temperatura');
        const descricao = document.querySelector('.clima .descricao');
        const umidade = document.querySelector('.clima-detalhes .umidade span');
        const vento = document.querySelector('.clima-detalhes .vento span');

        switch (json.weather[0].main) {
          case 'Clear':
            imagem.src = 'images/sun.png';
            break;
          case 'Rain':
            imagem.src = 'images/rain.png';
            break;
          case 'Snow':
            imagem.src = 'images/snow.png';
            break;
          case 'Clouds':
            imagem.src = 'images/cloudy.png';
            break;
          case 'Mist':
            imagem.src = 'images/fog.png';
            break;
          default:
            imagem.src = '';
        }

        const codigoDescricao = json.weather[0].main;
        const descricaoPrincipal = descricaoEmPortugues[codigoDescricao];
        descricao.innerHTML = descricaoPrincipal;

        const descricaoDetalhada = json.weather[0].description.toLowerCase();
        const descricaoDetalhadaTraduzida = descricaoDetalhadaEmPortugues[descricaoDetalhada] || descricaoDetalhada;

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descricao.innerHTML = descricaoDetalhadaTraduzida;
        umidade.innerHTML = `${json.main.humidity}%`;
        vento.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

        container.style.height = '590px';
        clima.style.display = 'block';
        climaDetalhes.style.display = 'flex';
        clima.classList.add('fadeIn');
        climaDetalhes.classList.add('fadeIn');
      }
    });
}

procurar.addEventListener('click', realizarPesquisa);

campoTexto.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    realizarPesquisa();
  }
});
