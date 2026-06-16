# ☁ Clima Agora — Weather App

Aplicação de clima em tempo real que consome a API OpenWeatherMap. Desenvolvida com HTML, CSS e JavaScript puro — sem frameworks, sem dependências.

---

## O que o projeto demonstra

- Consumo de **API REST** externa com `fetch` e `async/await`
- **Tratamento de erros** de rede e respostas HTTP
- **Separação de responsabilidades** entre módulos (`api.js`, `ui.js`, `main.js`, `config.js`)
- **Segurança de chave**: chave da API fora do versionamento (`.gitignore`)
- Manipulação de **DOM** sem jQuery ou frameworks
- Design responsivo com **CSS puro**
- Deploy automático via **Cloudflare Pages + GitHub**

---

## Estrutura do projeto

```
weather-app/
├── index.html
├── .gitignore              ← impede a chave de subir ao GitHub
├── css/
│   └── style.css
└── js/
    ├── config.js           ← SUA chave (não vai pro GitHub)
    ├── config.example.js   ← modelo de config (vai pro GitHub)
    ├── api.js              ← fetch + tratamento de erros
    ├── ui.js               ← manipulação do DOM
    └── main.js             ← eventos e orquestração
```

---

## Como rodar localmente

### Pré-requisitos
- [VS Code](https://code.visualstudio.com/) com a extensão **Live Server**

### Passo 1 — Clonar
```bash
git clone https://github.com/SEU_USUARIO/weather-app.git
cd weather-app
```

### Passo 2 — Configurar a chave
1. Pegue sua chave gratuita em [openweathermap.org/api](https://openweathermap.org/api)
2. Copie `js/config.example.js` e renomeie a cópia para `js/config.js`
3. Cole sua chave dentro de `config.js`

### Passo 3 — Rodar
Botão direito no `index.html` → **Open with Live Server**

---

## Deploy no Cloudflare Pages

> Como a chave fica fora do repositório, configure-a no Cloudflare como variável de ambiente, OU mantenha um `config.js` local apenas para testes. Para um portfólio simples, a chave gratuita da OpenWeather pode ser usada com restrição de domínio no painel da OpenWeather.

1. Suba o projeto para o GitHub (veja abaixo)
2. Em [pages.cloudflare.com](https://pages.cloudflare.com) → **Create project** → **Connect to Git**
3. Selecione o repositório → Framework preset: **None** → build vazio
4. **Save and Deploy**

---

## Tecnologias

HTML5 · CSS3 · JavaScript ES6+ · OpenWeatherMap API · GitHub · Cloudflare Pages

---

## Autora

**Romilda Millar** — [github.com/romildamillar](https://github.com/romildamillar)
