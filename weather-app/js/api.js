// ── api.js ────────────────────────────────────────────────────────────────
// Busca dados de clima através da Cloudflare Function (/api/weather).
// A chave NÃO fica aqui — fica segura no servidor (functions/api/weather.js).
// ─────────────────────────────────────────────────────────────────────────

async function fetchWeather(city) {
  // Chama a NOSSA função, não a OpenWeather diretamente.
  const url = `/api/weather?city=${encodeURIComponent(city)}`;

  const response = await fetch(url);

  if (response.status === 404) {
    throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
  }
  if (response.status === 401) {
    throw new Error('Chave de API inválida no servidor.');
  }
  if (!response.ok) {
    throw new Error(`Erro ao buscar dados (código ${response.status}). Tente novamente.`);
  }

  const data = await response.json();

  // A OpenWeather retorna cod:"404" dentro do corpo em alguns casos
  if (data.cod && String(data.cod) !== '200') {
    throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
  }

  return parseWeatherData(data);
}

function parseWeatherData(raw) {
  return {
    city:        raw.name,
    country:     raw.sys.country,
    temp:        Math.round(raw.main.temp),
    feelsLike:   Math.round(raw.main.feels_like),
    humidity:    raw.main.humidity,
    pressure:    raw.main.pressure,
    windSpeed:   Math.round(raw.wind.speed * 3.6),
    visibility:  raw.visibility ? (raw.visibility / 1000).toFixed(1) + ' km' : 'N/D',
    condition:   raw.weather[0].description,
    iconCode:    raw.weather[0].icon,
    iconUrl:     `https://openweathermap.org/img/wn/${raw.weather[0].icon}@2x.png`,
    sunrise:     formatTime(raw.sys.sunrise, raw.timezone),
    sunset:      formatTime(raw.sys.sunset,  raw.timezone),
    updatedAt:   new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  };
}

function formatTime(unixTimestamp, timezoneOffsetSeconds) {
  const localDate = new Date(unixTimestamp * 1000 + timezoneOffsetSeconds * 1000);
  const hours   = String(localDate.getUTCHours()).padStart(2, '0');
  const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
