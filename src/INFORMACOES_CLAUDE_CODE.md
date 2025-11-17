# 🎯 INFORMAÇÕES COMPLETAS PARA CLAUDE CODE

## 🔴 PROBLEMA CRÍTICO

### Sintomas:
1. **CSS não carrega** em nenhuma página da Vercel
2. **Rotas não funcionam** quando digitadas diretamente (ex: `/admin`)
3. **Arquivos na pasta `/src` do GitHub estão desatualizados** (16h atrás)
4. **Figma Make sempre cria pasta `/src`** automaticamente ao fazer push para GitHub

---

## 📊 ESTRUTURA DO PROJETO

### **Figma Make (local - estrutura atual):**
```
/
├── App.tsx           ← Raiz (não dentro de /src)
├── main.tsx          ← Raiz
├── components/       ← Raiz
├── services/         ← Raiz
├── styles/
│   └── globals.css   ← CSS principal
├── index.html        ← Raiz
├── package.json
├── vite.config.ts
└── vercel.json
```

### **GitHub (após push do Figma Make):**
```
/
├── src/              ← Criado AUTOMATICAMENTE pelo Figma Make!
│   ├── App.tsx       ← Arquivos desatualizados (16h atrás)
│   ├── main.tsx
│   ├── components/
│   └── ...
├── index.html        ← Raiz (aponta para /src/main.tsx agora)
├── package.json      ← Raiz
├── vite.config.ts    ← Raiz
└── vercel.json       ← Raiz
```

---

## 🛠️ ROTEAMENTO (NÃO USA REACT ROUTER!)

### **Biblioteca:** Roteamento Manual (SPA)
**NÃO usa** `react-router-dom` apesar de estar no `package.json`!

### **Código do Roteamento:**

#### **`/App.tsx` (linhas 76-101):**
```tsx
// Verifica se a URL é /picos (apenas para acesso direto)
const currentPath = window.location.pathname;
const isAllSpotsPage = currentPath === '/picos' || currentPath === '/picos.html';
const isAdminPage = currentPath.startsWith('/admin');

// Se for página admin, renderiza router com autenticação
if (isAdminPage) {
  try {
    return <AdminRouter />;
  } catch (error) {
    console.error('Erro ao carregar AdminRouter:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar Admin</h1>
          <p className="text-gray-600 mb-4">{String(error)}</p>
          <a href="/" className="text-blue-600 underline">Voltar para home</a>
        </div>
      </div>
    );
  }
}

// Se for página de todos os picos, renderiza componente específico
if (isAllSpotsPage) {
  return <SimpleSpotsList />;
}
```

#### **`/App.tsx` (linhas 288-300 - Navegação por URL):**
```tsx
// Carregar estado inicial da URL
useEffect(() => {
  const loadFromUrl = () => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(s => s);

    if (segments.length === 0) {
      // Home - nada selecionado
      setIsInitialLoad(false);
      return;
    }

    // Segmento 1: Estado (code já está em lowercase, ex: "sc")
    const stateSlug = segments[0].toLowerCase();
    // ... resto do parsing de URL
  };
  
  loadFromUrl();
}, []);
```

### **Rotas existentes:**
```
/                     → HomePage
/picos                → SimpleSpotsList (todos os picos)
/admin                → AdminRouter (com autenticação)
/admin/dashboard      → CalibrationDashboard
/admin/observations   → ObservationsPage
/admin/analytics      → AnalyticsPage
/estado/:estadoSlug   → Lista de cidades
/estado/:estadoSlug/:cidadeSlug  → Lista de picos
/estado/:estadoSlug/:cidadeSlug/:picoSlug  → Detalhes do pico
```

---

## 📁 ARQUIVOS DE CONFIGURAÇÃO

### **`/index.html` (linha 50):**
```html
<script type="module" src="/src/main.tsx"></script>
```
**⚠️ IMPORTANTE:** Foi alterado para `/src/main.tsx` (não é mais `/main.tsx`)

### **`/vite.config.ts`:**
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'build',
    emptyOutDir: true,
    sourcemap: false
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
```
**⚠️ IMPORTANTE:** 
- Removeu `root: './'` (agora usa default do Vite)
- Alias `@` aponta para `./src`

### **`/vercel.json`:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
**✅ CONFIGURAÇÃO CORRETA** para SPA (redireciona todas as rotas para index.html)

### **`/package.json`:**
```json
{
  "name": "nopico-surf-forecast",
  "version": "2.7.2-build-fix",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0",  ← NÃO USADO!
    "lucide-react": "^0.441.0",
    "recharts": "^2.12.0",
    "motion": "^11.11.17",
    "sonner": "^1.5.0",
    // ... (muitas dependências Radix UI)
  }
}
```

### **`/main.tsx`:**
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## 🎨 CSS (Tailwind v4.0)

### **`/styles/globals.css` (início):**
```css
:root {
  --font-size: 16px;
  --background: #ffffff;
  --foreground: #1a1a1a;
  --primary: #001f3d;  /* Azul marinho WSL */
  --accent: #ffc72c;   /* Amarelo WSL */
  /* ... mais vars */
}
```

### **Imports CSS:**
```tsx
// main.tsx linha 4:
import './styles/globals.css';
```

---

## 🔍 ERROS NO CONSOLE DO NAVEGADOR

**Ainda não testado!** O usuário precisa:
1. Abrir https://nopico-surf-forecast.vercel.app/
2. Apertar **F12**
3. Ir para **Console**
4. Copiar todos os erros
5. Ir para **Network**
6. Ver se `globals.css` está carregando (status 200 ou 404?)

---

## 🚨 HIPÓTESES DO PROBLEMA

### **Hipótese 1: Build path errado**
- Vite está buildando esperando `/src` mas arquivos estão na raiz
- Ou vice-versa

### **Hipótese 2: CSS não está sendo incluído no build**
- `main.tsx` importa `./styles/globals.css`
- Mas se o build não encontra `main.tsx` no path certo, CSS não é incluído

### **Hipótese 3: Vercel está servindo build antigo**
- Arquivos em `/src` no GitHub estão desatualizados (16h)
- Vercel faz build com código antigo
- Novo código no Figma Make nunca chegou no GitHub

### **Hipótese 4: Rewrite do Vercel não funciona**
- `vercel.json` tem rewrite correto
- Mas algo bloqueia (cache? configuração?)

---

## ✅ O QUE JÁ FOI TENTADO

1. ✅ Criado `.vercelignore` (não resolveu)
2. ✅ Simplificado `vercel.json` (não resolveu)
3. ✅ Mudado `index.html` para apontar `/src/main.tsx` (não testado ainda)
4. ✅ Ajustado `vite.config.ts` para alias `@` → `./src` (não testado ainda)
5. ❌ **PROBLEMA:** Push do Figma Make para GitHub **não está sincronizando**

---

## 🎯 O QUE PRECISA SER FEITO

### **Opção A: Forçar estrutura `/src` (padrão Vite)**
1. Garantir que Figma Make sempre cria `/src` (já faz isso)
2. Ajustar `index.html`, `vite.config.ts` e imports (já feito!)
3. **Fazer push para GitHub**
4. Verificar se arquivos em `/src` foram atualizados
5. Force redeploy na Vercel

### **Opção B: Configurar Vercel para usar estrutura raiz**
1. Adicionar no `vercel.json`:
   ```json
   {
     "buildCommand": "vite build",
     "outputDirectory": "build"
   }
   ```
2. Garantir que Vite encontra arquivos na raiz
3. Reverter mudanças em `index.html` (voltar para `/main.tsx`)

---

## 📞 PERGUNTAS PARA O USUÁRIO

1. **Console do navegador (F12):** Quais erros aparecem?
2. **Network (F12 → Network):** 
   - `globals.css` retorna 200 ou 404?
   - `main.tsx` ou `main.js` retorna 200 ou 404?
3. **GitHub:** Os arquivos em `/src` foram atualizados após último push?
4. **Vercel:** Quando foi o último deploy? Data e hora?

---

## 🛠️ PRÓXIMOS PASSOS SUGERIDOS

### **Passo 1: Verificar GitHub**
Ir para: `https://github.com/[seu-usuario]/[seu-repo]/tree/main/src`
- Ver data de modificação dos arquivos
- Se estão desatualizados → problema está no push do Figma Make

### **Passo 2: Force push manual (se necessário)**
```bash
git clone https://github.com/[seu-usuario]/[seu-repo].git
cd [seu-repo]

# Garantir que está na main
git checkout main

# Forçar sincronização
git pull origin main --force
git push origin main --force
```

### **Passo 3: Force redeploy Vercel**
1. Ir para https://vercel.com/[seu-projeto]
2. Deployments → último deploy
3. Clicar "..." → "Redeploy"
4. ✅ "Use existing Build Cache" → **DESMARCAR**
5. Clicar "Redeploy"

### **Passo 4: Testar no navegador**
```
https://nopico-surf-forecast.vercel.app/
https://nopico-surf-forecast.vercel.app/admin
https://nopico-surf-forecast.vercel.app/picos
```

---

## 💡 INFORMAÇÕES ADICIONAIS

### **Stack:**
- React 18.3.1
- Vite 5.1.4
- Tailwind CSS 4.0
- TypeScript 5.3.3
- NO React Router (roteamento manual via `window.location.pathname`)

### **APIs integradas:**
- Open-Meteo Marine API
- Boias PNBOIA (Marinha do Brasil)
- Stormglass API
- Supabase (backend)

### **Deployment:**
- Plataforma: Vercel
- URL: https://nopico-surf-forecast.vercel.app/
- Domínio custom: www.nopico.com.br (apontado para Vercel)

---

## 📸 SCREENSHOT DA ESTRUTURA DE ARQUIVOS

**Figma Make (local):**
```
/
├── App.tsx          ← RAIZ
├── main.tsx         ← RAIZ
├── components/      ← RAIZ
├── services/        ← RAIZ
├── styles/          ← RAIZ
│   └── globals.css
└── index.html       ← RAIZ (aponta para /src/main.tsx)
```

**GitHub (após push):**
```
/
├── src/             ← CRIADO AUTOMATICAMENTE
│   ├── App.tsx      ← 16h ATRÁS
│   ├── main.tsx     ← 16h ATRÁS
│   ├── components/  ← 16h ATRÁS
│   └── ...
└── index.html       ← RAIZ (aponta para /src/main.tsx)
```

---

## 🔥 PROBLEMA RAIZ IDENTIFICADO

**O Figma Make cria pasta `/src` automaticamente no GitHub, mas os arquivos DENTRO de `/src` não estão sendo atualizados!**

Isso significa:
1. ✅ Figma Make tem código novo
2. ❌ GitHub tem código antigo (16h atrás)
3. ❌ Vercel faz build com código antigo
4. ❌ Site fica quebrado (CSS não carrega, rotas não funcionam)

**Solução:** Garantir que push do Figma Make atualiza arquivos em `/src` no GitHub!

---

FIM DO DOCUMENTO
