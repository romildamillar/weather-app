# 🚀 Guia de Deploy — Weather App com Cloudflare Functions

Este projeto usa uma **Cloudflare Function** como mini-backend para proteger a chave da API.
A chave nunca aparece no navegador.

```
navegador → /api/weather (função Cloudflare, guarda a chave) → OpenWeather
```

---

## Passo 1 — Subir as mudanças para o GitHub

No terminal do VS Code:

```bash
git add .
git commit -m "feat: backend serverless para proteger a chave da API"
git push
```

---

## Passo 2 — Conectar o projeto ao Cloudflare Pages

1. Acesse https://dash.cloudflare.com e faça login (crie conta grátis se precisar)
2. No menu lateral: **Workers & Pages**
3. Clique em **Create application** → aba **Pages** → **Connect to Git**
4. Autorize o Cloudflare a acessar seu GitHub
5. Selecione o repositório **weather-app**
6. Em configurações de build:
   - Framework preset: **None**
   - Build command: *(deixe vazio)*
   - Build output directory: *(deixe vazio ou `/`)*
7. Clique em **Save and Deploy**

Aguarde 1-2 minutos. O site sobe em algo como:
`https://weather-app-xyz.pages.dev`

⚠️ Mas ainda vai dar erro de chave — falta o Passo 3.

---

## Passo 3 — Configurar a chave secreta (variável de ambiente)

1. No painel do seu projeto no Cloudflare → **Settings** → **Environment variables**
2. Clique em **Add variable**
3. Preencha:
   - Variable name: `OPENWEATHER_KEY`
   - Value: *(cole sua chave real da OpenWeather)*
4. Marque como **Production** (e Preview, se quiser)
5. **Save**

---

## Passo 4 — Forçar novo deploy

A variável só vale após um novo deploy:

1. Vá em **Deployments**
2. No último deploy, clique nos três pontinhos → **Retry deployment**
   *(ou faça qualquer git push, que dispara um deploy novo)*

Pronto! Acesse sua URL `.pages.dev` e teste buscando uma cidade. 🎉

---

## Como testar localmente (opcional)

O Live Server NÃO roda functions. Para testar a function no seu PC, use o Wrangler:

```bash
npm install -g wrangler
# crie um arquivo .dev.vars na raiz com:  OPENWEATHER_KEY=sua_chave
npx wrangler pages dev .
```

Acesse o endereço que o wrangler mostrar (geralmente http://localhost:8788).

> Para desenvolvimento rápido só do visual, o Live Server continua ótimo —
> só a busca de clima que precisa do wrangler ou do site publicado.
