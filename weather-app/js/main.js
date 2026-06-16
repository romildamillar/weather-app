// ── main.js ───────────────────────────────────────────────────────────────
// Orquestrador: captura eventos do usuário e conecta api.js ↔ ui.js.
// Não conhece fetch nem DOM de perto — só chama funções dos outros módulos.
// ─────────────────────────────────────────────────────────────────────────

const searchForm  = document.getElementById('searchForm');
const cityInput   = document.getElementById('cityInput');
const quickCities = document.querySelectorAll('.chip');

/** Busca o clima e atualiza a interface */
async function search(cityName) {
  const city = cityName.trim();
  if (!city) return;

  showLoading();

  try {
    const weatherData = await fetchWeather(city); // api.js
    showWeather(weatherData);                      // ui.js
  } catch (error) {
    showError(error.message);
  }
}

// ── EVENTO: formulário de busca ───────────────────────────────────────────
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // impede reload da página
  search(cityInput.value);
});

// ── EVENTO: chips de cidades rápidas ─────────────────────────────────────
quickCities.forEach((chip) => {
  chip.addEventListener('click', () => {
    const city = chip.dataset.city;
    cityInput.value = city;
    search(city);
  });
});

// ── ESTADO INICIAL ────────────────────────────────────────────────────────
showEmpty(); // ui.js — mostra a tela vazia ao carregar
