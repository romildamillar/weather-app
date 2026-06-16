// ── functions/api/weather.js ──────────────────────────────────────────────
// Cloudflare Pages Function — roda no SERVIDOR, não no navegador.
// A chave da API fica aqui em segredo (variável de ambiente), nunca exposta.
//
// O navegador chama:  /api/weather?city=São Paulo
// Esta função chama:  api.openweathermap.org (com a chave secreta)
// ─────────────────────────────────────────────────────────────────────────

export async function onRequest(context) {
  const { request, env } = context;

  // Pega o parâmetro ?city= da URL
  const url = new URL(request.url);
  const city = url.searchParams.get('city');

  if (!city) {
    return new Response(
      JSON.stringify({ error: 'Parâmetro "city" é obrigatório.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // A chave vem de uma variável de ambiente segura do Cloudflare.
  // NUNCA fica no código — é configurada no painel do Cloudflare.
  const API_KEY = env.OPENWEATHER_KEY;

  if (!API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Chave da API não configurada no servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather`
    + `?q=${encodeURIComponent(city)}`
    + `&appid=${API_KEY}`
    + `&units=metric&lang=pt_br`;

  try {
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();

    // Repassa o status e os dados da OpenWeather para o navegador
    return new Response(JSON.stringify(data), {
      status: apiResponse.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300', // cache de 5 min
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erro ao consultar o serviço de clima.' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
