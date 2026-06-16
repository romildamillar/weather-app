// ── ui.js ─────────────────────────────────────────────────────────────────
// Responsável APENAS por mostrar/esconder elementos e preencher o HTML.
// Não chama fetch. Não conhece a API. Só manipula o DOM.
// ─────────────────────────────────────────────────────────────────────────

// Referências a todos os elementos do DOM (centralizadas aqui)
const els = {
  stateEmpty:     document.getElementById('stateEmpty'),
  stateLoading:   document.getElementById('stateLoading'),
  stateError:     document.getElementById('stateError'),
  errorMsg:       document.getElementById('errorMsg'),
  weatherCard:    document.getElementById('weatherCard'),

  cityName:       document.getElementById('cityName'),
  countryName:    document.getElementById('countryName'),
  weatherIcon:    document.getElementById('weatherIcon'),
  tempMain:       document.getElementById('tempMain'),
  conditionLabel: document.getElementById('conditionLabel'),
  feelsLike:      document.getElementById('feelsLike'),
  humidity:       document.getElementById('humidity'),
  windSpeed:      document.getElementById('windSpeed'),
  visibility:     document.getElementById('visibility'),
  pressure:       document.getElementById('pressure'),
  sunrise:        document.getElementById('sunrise'),
  sunset:         document.getElementById('sunset'),
  updateTime:     document.getElementById('updateTime'),
};

/** Esconde todos os estados e o card */
function hideAll() {
  els.stateEmpty.classList.add('hidden');
  els.stateLoading.classList.add('hidden');
  els.stateError.classList.add('hidden');
  els.weatherCard.classList.add('hidden');
}

function showLoading() {
  hideAll();
  els.stateLoading.classList.remove('hidden');
}

function showError(message) {
  hideAll();
  els.errorMsg.textContent = message;
  els.stateError.classList.remove('hidden');
}

function showEmpty() {
  hideAll();
  els.stateEmpty.classList.remove('hidden');
}

/**
 * Preenche o card com os dados e o exibe.
 * @param {Object} data - Objeto retornado por parseWeatherData()
 */
function showWeather(data) {
  hideAll();

  // Preenche cada campo
  els.cityName.textContent       = data.city;
  els.countryName.textContent    = data.country;
  els.tempMain.textContent       = data.temp;
  els.conditionLabel.textContent = data.condition;
  els.feelsLike.textContent      = `Sensação térmica: ${data.feelsLike}°C`;
  els.humidity.textContent       = `${data.humidity}%`;
  els.windSpeed.textContent      = data.windSpeed;
  els.visibility.textContent     = data.visibility;
  els.pressure.textContent       = data.pressure;
  els.sunrise.textContent        = data.sunrise;
  els.sunset.textContent         = data.sunset;
  els.updateTime.textContent     = `Atualizado às ${data.updatedAt}`;

  // Ícone do clima
  els.weatherIcon.src = data.iconUrl;
  els.weatherIcon.alt = data.condition;

  els.weatherCard.classList.remove('hidden');
}
