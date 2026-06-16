# ☁ Clima Agora — Weather App

Aplicação de clima em tempo real que consome a API OpenWeatherMap. Desenvolvida com HTML, CSS e JavaScript puro — sem frameworks, sem dependências.

**[→ Ver demo ao vivo](#)** · **[→ OpenWeatherMap](https://openweathermap.org)**

---

## O que o projeto demonstra

- Consumo de **API REST** externa com `fetch` e `async/await`
- **Tratamento de erros** de rede e respostas HTTP
- **Separação de responsabilidades** entre módulos JS (`api.js`, `ui.js`, `main.js`)
- Manipulação de **DOM** sem jQuery ou frameworks
- Design responsivo com **CSS puro** (Grid, variáveis CSS, media queries)
- Deploy automático via **Cloudflare Pages + GitHub**

---

## Estrutura do projeto

```
weather-app/
├── index.html        ← Estrutura HTML e estados da UI
├── css/
│   └── style.css     ← Todo o design e responsividade
└── js/
    ├── api.js        ← Fetch, tratamento de erros, formatação dos dados
    ├── ui.js         ← Manipulação do DOM (mostrar/esconder/preencher)
    └── main.js       ← Eventos do usuário, orquestra api.js ↔ ui.js
```

---

## Como rodar localmente

### Pré-requisitos
- [VS Code](https://code.visualstudio.com/)
- Extensão **Live Server** instalada no VS Code

### Passo 1 — Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/weather-app.git
cd weather-app
```

### Passo 2 — Obter a chave da API (gratuita)

1. Acesse [openweathermap.org](https://openweathermap.org) e crie uma conta gratuita
2. Vá em **API Keys** no seu perfil
3. Copie a chave gerada (pode levar até 10 minutos para ativar)

### Passo 3 — Configurar a chave

Abra `js/api.js` e substitua:

```javascript
const API_KEY = 'SUA_CHAVE_AQUI';
```

pela sua chave real:

```javascript
const API_KEY = 'a1b2c3d4e5f6789abcdef1234567890'; // exemplo
```

### Passo 4 — Abrir no navegador

No VS Code, clique com o botão direito no `index.html` → **"Open with Live Server"**

---

## Deploy no Cloudflare Pages (gratuito)

### Passo 1 — Subir para o GitHub

```bash
# Na primeira vez
git init
git add .
git commit -m "feat: projeto weather app concluído"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/weather-app.git
git push -u origin main

# Nas próximas atualizações
git add .
git commit -m "fix: descrição da mudança"
git push
```

### Passo 2 — Conectar ao Cloudflare Pages

1. Acesse [pages.cloudflare.com](https://pages.cloudflare.com) e faça login
2. Clique em **"Create a project"** → **"Connect to Git"**
3. Selecione o repositório `weather-app`
4. Em **"Build settings"**:
   - Framework preset: **None**
   - Build command: *(deixe vazio)*
   - Build output directory: `/` ou *(deixe vazio)*
5. Clique em **"Save and Deploy"**

Em 1-2 minutos seu site estará no ar em uma URL como:
`https://weather-app-abc.pages.dev`

### Passo 3 — Atualizações automáticas

A partir de agora, todo `git push` atualiza o site automaticamente. Sem precisar fazer nada no Cloudflare.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica |
| CSS3 | Design, Grid, variáveis, animações |
| JavaScript ES6+ | Fetch API, async/await, módulos |
| OpenWeatherMap API | Dados de clima em tempo real |
| GitHub | Versionamento |
| Cloudflare Pages | Hospedagem e deploy contínuo |

---

## Autora

**Romilda Millar** — [github.com/romildamillar](https://github.com/romildamillar) · [LinkedIn](#)
