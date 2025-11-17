# 🎯 **FIGMA MAKE: MUDAR URL DO VERCEL (PASSO A PASSO VISUAL)**

---

## 🖥️ **VOCÊ ESTÁ AQUI (FIGMA MAKE - AMBIENTE WEB)**

```
┌─────────────────────────────────────────────────────────────┐
│  🌐 Figma Make (no navegador)                               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Files                                                │   │
│  │ ├── components/                                      │   │
│  │ ├── services/                                        │   │
│  │ │   ├── pnboiaApi.ts                                 │   │
│  │ │   └── vercelConfig.ts  ← VOCÊ VAI EDITAR ESTE    │   │
│  │ ├── supabase/                                        │   │
│  │ └── App.tsx                                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Botão: Publish to GitHub]  ← DEPOIS VAI CLICAR AQUI     │
└─────────────────────────────────────────────────────────────┘
```

**VOCÊ NÃO TEM:**
- ❌ Terminal
- ❌ Editor de código local (VS Code)
- ❌ Git instalado

**VOCÊ TEM:**
- ✅ Navegador
- ✅ Interface do Figma Make
- ✅ Botão "Publish to GitHub"

---

## 🎬 **PASSO A PASSO (FIGMA MAKE)**

---

### **📍 PASSO 1: FAZER DEPLOY NO VERCEL**

#### **1.1) Clicar "Publish to GitHub"**

No Figma Make (canto superior direito):

```
┌────────────────────────────────────────────────┐
│  Figma Make                                    │
│                                                │
│  Files   Preview   [Publish to GitHub] ← AQUI │
└────────────────────────────────────────────────┘
```

Vai aparecer uma janela:

```
┌────────────────────────────────────────────────┐
│  Publish to GitHub                             │
│                                                │
│  Commit message:                               │
│  [Ativar Vercel backend para PNBOIA        ]   │
│                                                │
│  [Cancel]  [Publish] ← CLICAR                  │
└────────────────────────────────────────────────┘
```

✅ Código vai para o GitHub

---

#### **1.2) Ir no Vercel**

Abrir nova aba no navegador:

```
https://vercel.com
```

**Se não tem conta ainda:**
```
1. Clicar "Sign Up"
2. Escolher "Continue with GitHub"
3. Autorizar Vercel
```

**Se já tem conta:**
```
1. Fazer login
2. Clicar "Add New..."
3. Escolher "Project"
```

---

#### **1.3) Importar projeto do GitHub**

Você vai ver esta tela:

```
┌──────────────────────────────────────────────────────────┐
│  Import Git Repository                                   │
│                                                          │
│  Search...                                               │
│  ┌────────────────────────────────────────────────────┐ │
│  │ seu-usuario/nopico-surf                            │ │
│  │ [Import] ← CLICAR                                  │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  (ou o nome do seu repositório)                          │
└──────────────────────────────────────────────────────────┘
```

Clicar **Import**

---

#### **1.4) Configurar projeto**

Vai aparecer:

```
┌──────────────────────────────────────────────────────────┐
│  Configure Project                                       │
│                                                          │
│  Project Name: nopico-surf                               │
│                                                          │
│  Framework Preset: Vite                                  │
│                                                          │
│  Root Directory: ./                                      │
│                                                          │
│  Build Command: npm run build                            │
│                                                          │
│  Output Directory: dist                                  │
│                                                          │
│  [Deploy] ← CLICAR                                       │
└──────────────────────────────────────────────────────────┘
```

✅ **Clicar "Deploy"**

---

#### **1.5) Aguardar deploy**

Você vai ver:

```
┌──────────────────────────────────────────────────────────┐
│  🏗️  Building...                                         │
│                                                          │
│  ████████████░░░░░░░░░░░░ 60%                           │
│                                                          │
│  Installing dependencies...                              │
└──────────────────────────────────────────────────────────┘
```

Aguardar 1-3 minutos...

---

#### **1.6) SUCESSO! Copiar URL**

Quando terminar, vai aparecer:

```
┌──────────────────────────────────────────────────────────┐
│  🎉 Congratulations!                                     │
│                                                          │
│  Your project has been deployed.                         │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  https://nopico-surf-abc123.vercel.app             │ │
│  │  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^           │ │
│  │  COPIAR ESTA URL (Ctrl+C ou Cmd+C)                │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  [Visit]  [View Logs]                                    │
└──────────────────────────────────────────────────────────┘
```

**✅ COPIAR A URL COMPLETA**

Exemplo: `https://nopico-surf-abc123.vercel.app`

---

### **📍 PASSO 2: EDITAR O CÓDIGO NO FIGMA MAKE**

#### **2.1) Voltar pro Figma Make**

Voltar na aba do Figma Make (não fechar!)

---

#### **2.2) Abrir arquivo vercelConfig.ts**

No painel esquerdo (Files):

```
┌────────────────────────────────────────────────┐
│  Files                                         │
│  ├── 📁 components/                            │
│  ├── 📁 services/                              │
│  │   ├── 📄 pnboiaApi.ts                       │
│  │   ├── 📄 vercelConfig.ts  ← CLICAR AQUI    │
│  │   └── 📄 waveApi.ts                         │
│  ├── 📁 supabase/                              │
│  └── 📄 App.tsx                                │
└────────────────────────────────────────────────┘
```

**Clicar em:** `services/vercelConfig.ts`

O arquivo vai abrir no editor (lado direito)

---

#### **2.3) Achar a linha certa**

Vai abrir o código. Role até ver isto:

```typescript
// Você vai ver algo assim:

25: // ========================================
26: // CONFIGURAÇÃO
27: // ========================================
28: 
29: /**
30:  * URL base do Vercel (MUDAR DEPOIS DO DEPLOY!)
31:  * 
32:  * ANTES DO DEPLOY:
33:  * - Deixar como 'https://nopicosurf.vercel.app' (atual)
34:  * 
35:  * DEPOIS DO DEPLOY:
36:  * - Trocar pela URL do seu projeto Vercel
37:  * - Exemplo: 'https://nopico-surf-abc123.vercel.app'
38:  */
39: export const VERCEL_PROJECT_URL = 'https://nopicosurf.vercel.app';
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ESTA LINHA 39 (ou perto disso)
```

---

#### **2.4) Selecionar a URL antiga**

Na linha que tem `export const VERCEL_PROJECT_URL = '...'`:

1. **Triplo-clique** na URL antiga (entre aspas)
2. Vai selecionar: `https://nopicosurf.vercel.app`

```typescript
export const VERCEL_PROJECT_URL = 'https://nopicosurf.vercel.app';
                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                   TRIPLO-CLIQUE AQUI
                                   (seleciona tudo)
```

---

#### **2.5) Colar a URL nova**

Com a URL antiga selecionada:

1. **Colar** (Ctrl+V ou Cmd+V)
2. Vai ficar assim:

```typescript
// ANTES:
export const VERCEL_PROJECT_URL = 'https://nopicosurf.vercel.app';

// DEPOIS (com SUA URL):
export const VERCEL_PROJECT_URL = 'https://nopico-surf-abc123.vercel.app';
                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                   SUA URL COLADA
```

---

#### **2.6) Salvar**

O Figma Make salva automaticamente! ✅

Você vai ver um indicador tipo "Saved" ou o arquivo não vai ter mais o asterisco (*).

---

### **📍 PASSO 3: PUBLICAR NO GITHUB NOVAMENTE**

#### **3.1) Clicar "Publish to GitHub" de novo**

Canto superior direito:

```
┌────────────────────────────────────────────────┐
│  [Publish to GitHub] ← CLICAR DE NOVO          │
└────────────────────────────────────────────────┘
```

Vai aparecer a janela:

```
┌────────────────────────────────────────────────┐
│  Publish to GitHub                             │
│                                                │
│  Commit message:                               │
│  [Atualizar URL do Vercel              ]       │
│                                                │
│  [Cancel]  [Publish] ← CLICAR                  │
└────────────────────────────────────────────────┘
```

✅ Clicar **Publish**

---

#### **3.2) Aguardar**

O GitHub vai receber o código atualizado.

O Vercel vai detectar o push e fazer **redeploy automático**.

Aguardar 1-2 minutos...

---

### **📍 PASSO 4: TESTAR**

#### **4.1) Testar o endpoint**

Abrir nova aba e colar:

```
https://SUA-URL-AQUI.vercel.app/api/pnboia/pnboia-florianopolis
       ^^^^^^^^^^^^^^^^
       (sua URL que você copiou)
```

Exemplo:
```
https://nopico-surf-abc123.vercel.app/api/pnboia/pnboia-florianopolis
```

**Resultado esperado:**

```json
{
  "success": true,
  "data": {
    "waveHeight": 1.5,
    "wavePeriod": 8.2,
    "waveDirection": 120,
    "windSpeed": 18,
    "windDirection": 135,
    "waterTemp": 22,
    "buoyId": "pnboia-florianopolis",
    "buoyName": "Florianópolis",
    "isMockData": false,
    "dataSource": "api"
  },
  "source": "api"
}
```

✅ **Se ver JSON = FUNCIONOU!**

---

#### **4.2) Testar no site**

Abrir seu site: `https://www.nopico.com.br`

1. Pressionar **F12** (abre Console)
2. Navegar até qualquer pico de SC (ex: Florianópolis)
3. No Console, procurar logs tipo:

```
[VERCEL] 🔵 Tentando Vercel... Buscando pnboia-florianopolis
[VERCEL] ✅ Vercel OK! pnboia-florianopolis (api)
```

✅ **Se ver isso = TUDO FUNCIONANDO!**

---

## 📋 **CHECKLIST VISUAL (FIGMA MAKE)**

```
☐ 1. No Figma Make: Clicar "Publish to GitHub"
     
☐ 2. Ir em https://vercel.com
     
☐ 3. Add New → Project → Import from GitHub
     
☐ 4. Escolher seu repositório → Import → Deploy
     
☐ 5. Aguardar deploy (1-3 min)
     
☐ 6. Copiar URL gerada:
     Exemplo: https://nopico-surf-abc123.vercel.app
     
☐ 7. Voltar pro Figma Make
     
☐ 8. Abrir: services/vercelConfig.ts
     
☐ 9. Achar linha (~38-40):
     export const VERCEL_PROJECT_URL = 'https://nopicosurf.vercel.app';
     
☐ 10. Triplo-clique na URL antiga (seleciona)
     
☐ 11. Colar (Ctrl+V) a URL nova
     
☐ 12. Arquivo salva automático ✅
     
☐ 13. Clicar "Publish to GitHub" de novo
     
☐ 14. Aguardar redeploy (1-2 min)
     
☐ 15. Testar endpoint:
      https://sua-url.vercel.app/api/pnboia/pnboia-florianopolis
      
☐ 16. Testar no site (F12 → Console → Ver logs [VERCEL])
```

---

## 🖼️ **FLUXO VISUAL COMPLETO**

```
┌──────────────────────────────────────────────────────────────┐
│ 1️⃣ FIGMA MAKE                                               │
│    [Publish to GitHub]                                       │
└──────────────┬───────────────────────────────────────────────┘
               │
               ↓ código vai pro GitHub
               │
┌──────────────▼───────────────────────────────────────────────┐
│ 2️⃣ VERCEL                                                    │
│    vercel.com → Import from GitHub → Deploy                  │
│    → Gera URL: https://nopico-surf-abc123.vercel.app        │
└──────────────┬───────────────────────────────────────────────┘
               │
               ↓ copiar URL
               │
┌──────────────▼───────────────────────────────────────────────┐
│ 3️⃣ FIGMA MAKE (de novo)                                     │
│    Files → services/vercelConfig.ts                          │
│    Linha ~38: trocar URL                                     │
│    [Publish to GitHub] de novo                               │
└──────────────┬───────────────────────────────────────────────┘
               │
               ↓ código atualizado vai pro GitHub
               │
┌──────────────▼───────────────────────────────────────────────┐
│ 4️⃣ VERCEL (automático)                                      │
│    Detecta push → Redeploy → ✅ Pronto!                     │
└──────────────┬───────────────────────────────────────────────┘
               │
               ↓
┌──────────────▼───────────────────────────────────────────────┐
│ 5️⃣ TESTAR                                                    │
│    • Abrir: https://sua-url.vercel.app/api/pnboia/...       │
│    • Ver JSON ✅                                             │
│    • Abrir site → F12 → Ver logs [VERCEL] ✅                │
└──────────────────────────────────────────────────────────────┘
```

---

## ❓ **DÚVIDAS FREQUENTES (AMBIENTE WEB)**

### **"Onde fica o arquivo vercelConfig.ts?"**

No painel esquerdo do Figma Make:

```
Files
└── services
    └── vercelConfig.ts  ← CLICAR AQUI
```

---

### **"Como selecionar a URL?"**

**Triplo-clique** na URL (entre aspas):

```typescript
export const VERCEL_PROJECT_URL = 'https://nopicosurf.vercel.app';
                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                   TRIPLO-CLIQUE AQUI
```

Ou:

1. Clicar depois do primeiro `'`
2. Arrastar até antes do segundo `'`

---

### **"Como salvar no Figma Make?"**

**Salva automático!** ✅

Você não precisa apertar Ctrl+S. O Figma Make salva sozinho.

---

### **"E se eu errar?"**

**Ctrl+Z** (ou Cmd+Z no Mac) desfaz!

---

### **"Preciso fazer isso no terminal?"**

**NÃO!** ❌

Tudo pelo navegador:
1. Figma Make (editar código)
2. Vercel.com (fazer deploy)
3. F12 (testar)

Sem terminal! 🎉

---

## 🎯 **RESUMO ULTRA SIMPLES (FIGMA MAKE)**

```
1. Figma Make → Publish
2. Vercel.com → Import → Deploy → Copiar URL
3. Figma Make → Abrir vercelConfig.ts → Mudar URL → Publish
4. Testar
✅ PRONTO!
```

---

## 🏄‍♂️ **FICOU CLARO AGORA?**

Tudo pelo **navegador**! Sem terminal, sem nada local! 🌐

Quer que eu grave um vídeo mostrando? Ou posso tirar screenshots de cada etapa?

---
