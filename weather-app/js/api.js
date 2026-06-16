// ── api.js ────────────────────────────────────────────────────────────────
// Responsável APENAS por buscar dados da API e devolver um objeto limpo.
// Não toca no DOM. Não conhece o HTML. Só faz fetch + trata erros.
// ─────────────────────────────────────────────────────────────────────────

const API_KEY = CONFIG.API_KEY; // ← substitua pela sua chave gratuita
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Busca dados de clima para uma cidade.
 * @param {string} city - Nome da cidade (ex: "São Paulo")
 * @returns {Promise<Object>} - Objeto com dados formatados
 * @throws {Error} - Lança erro com mensagem amigável
 */
async function fetchWeather(city) {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`;

  const response = await fetch(url);

  // A API retorna 404 para cidade não encontrada
  if (response.status === 404) {
    throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
  }

  // Chave inválida
  if (response.status === 401) {
    throw new Error('Chave de API inválida. Confira o arquivo api.js.');
  }

  // Qualquer outro erro HTTP
  if (!response.ok) {
    throw new Error(`Erro ao buscar dados (código ${response.status}). Tente novamente.`);
  }

  const data = await response.json();

  // Formata e devolve apenas o que a UI precisa
  return parseWeatherData(data);
}

/**
 * Transforma o JSON bruto da API em um objeto simples e legível.
 * Centraliza aqui toda a lógica de extração de campos.
 */
function parseWeatherData(raw) {
  return {
    city:        raw.name,
    country:     raw.sys.country,
    temp:        Math.round(raw.main.temp),
    feelsLike:   Math.round(raw.main.feels_like),
    humidity:    raw.main.humidity,           // %
    pressure:    raw.main.pressure,           // hPa
    windSpeed:   Math.round(raw.wind.speed * 3.6), // m/s → km/h
    visibility:  raw.visibility
      ? (raw.visibility / 1000).toFixed(1) + ' km'
      : 'N/D',
    condition:   raw.weather[0].description,
    iconCode:    raw.weather[0].icon,
    iconUrl:     `https://openweathermap.org/img/wn/${raw.weather[0].icon}@2x.png`,
    sunrise:     formatTime(raw.sys.sunrise, raw.timezone),
    sunset:      formatTime(raw.sys.sunset,  raw.timezone),
    updatedAt:   new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  };
}

/**
 * Converte timestamp Unix + offset de fuso em string "HH:MM" local da cidade.
 */
function formatTime(unixTimestamp, timezoneOffsetSeconds) {
  const utcMs     = unixTimestamp * 1000;
  const offsetMs  = timezoneOffsetSeconds * 1000;
  const localDate = new Date(utcMs + offsetMs);

  // Usa UTC para "fingir" o horário local da cidade
  const hours   = String(localDate.getUTCHours()).padStart(2, '0');
  const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
