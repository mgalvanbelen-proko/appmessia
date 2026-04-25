# MessIA · Fe que conversa

Asistente espiritual con IA inspirado en las enseñanzas de Jesús, dirigido al público cristiano evangélico hispanohablante. Conversaciones cálidas, consejos prácticos y la Palabra que necesitás.

> MessIA es un asistente con inteligencia artificial. **No reemplaza el consejo pastoral, médico ni profesional.**

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Anthropic SDK** (`@anthropic-ai/sdk`) — modelo `claude-sonnet-4-5` con streaming
- Tipografías: **Fraunces** (serif) + **Inter** (sans), vía `next/font/google`

## Estructura

```
app/
  layout.tsx           # layout global, fonts
  globals.css          # variables CSS de marca + base
  page.tsx             # landing
  chat/page.tsx        # pantalla de chat
  api/chat/route.ts    # endpoint streaming a Anthropic
components/
  Logo.tsx             # logo con variantes full/horizontal/symbol
lib/
  system-prompt.ts     # system prompt de MessIA (editable)
public/
  favicon.svg
```

## Correr localmente

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear el archivo `.env.local` en la raíz copiando `.env.local.example`:
   ```
   ANTHROPIC_API_KEY=sk-ant-tu-api-key-aca
   ```
   Conseguí tu API key en https://console.anthropic.com → **API Keys**.
3. Levantar el dev server:
   ```bash
   npm run dev
   ```
4. Abrir http://localhost:3000

## Deploy en Vercel

1. Subí el repo a GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/messia.git
   git push -u origin main
   ```
2. En https://vercel.com → **Add New… → Project** → importá el repo.
3. En **Environment Variables** agregá:
   - `ANTHROPIC_API_KEY` = tu key de Anthropic
4. Deploy. Vercel te da una URL pública tipo `https://messia.vercel.app` que podés compartir.

## Personalización

- **System prompt**: editá `lib/system-prompt.ts` para ajustar la voz/comportamiento de MessIA.
- **Paleta**: las variables de color están en `app/globals.css` y `tailwind.config.ts`.
- **Logo**: `components/Logo.tsx` con variantes `full` / `horizontal` / `symbol`.

## Licencia

© 2025 MessIA
