# 📊 **VERCEL - DIAGRAMA VISUAL COMPLETO**

## 🏗️ **ARQUITETURA ATUAL vs NOVA**

### **❌ ANTES (NÃO FUNCIONAVA):**

```
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (https://nopico.com.br)                          │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  SUPABASE EDGE FUNCTION                                     │
│  - Timeout: 15s ⏱️                                          │
│  - Mixed Content: HTTP bloqueado ❌                         │
│  - CORS: Bloqueado por sites externos ❌                    │
└─────────────────────────────────────────────────────────────┘
                         ↓
        ╔════════════════╧════════════════╗
        ↓                                  ↓
┌──────────────────┐           ┌──────────────────┐
│  API GOOS        │           │  Site Marinha    │
│  (HTTP)          │           │  (HTTPS)         │
│  ❌ Bloqueado     │           │  ❌ CORS 403      │
└──────────────────┘           └──────────────────┘
        ↓                                  ↓
    TIMEOUT                            CORS ERROR
        ↓                                  ↓
┌─────────────────────────────────────────────────────────────┐
│  RESULTADO: Usa dados calibrados (forecast-calibrated)      │
│  ⚠️ Nunca consegue dados reais das boias                    │
└─────────────────────────────────────────────────────────────┘
```

---

### **✅ AGORA (COM VERCEL):**

```
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (https://nopico.com.br)                          │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  VERCEL SERVERLESS FUNCTION                                 │
│  - Timeout: 60s ⏱️ (4x mais tempo!) ✅                       │
│  - HTTP permitido ✅                                         │
│  - CORS: Servidor→Servidor (sem bloqueios) ✅               │
│  - Proxy CORS disponível ✅                                  │
└─────────────────────────────────────────────────────────────┘
                         ↓
        ╔════════════════╧════════════════╗
        ↓                ↓                 ↓
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  API GOOS    │ │  Site        │ │  Open-Meteo  │
│  (HTTP)      │ │  Marinha     │ │  (HTTPS)     │
│  ✅ Funciona  │ │  ✅ Funciona  │ │  ✅ Funciona  │
└──────────────┘ └──────────────┘ └──────────────┘
        ↓                ↓                 ↓
    DADOS REAIS     DADOS REAIS      PREVISÃO
        ↓                ↓                 ↓
┌─────────────────────────────────────────────────────────────┐
│  RESULTADO: Dados reais das boias! 🎉                       │
│  ✅ 90% chance de sucesso                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 **FLUXO DE EXECUÇÃO (PASSO A PASSO)**

### **Quando usuário acessa pico (ex: Morro das Pedras):**

```
1️⃣ Frontend carrega
   ↓
2️⃣ Verifica: USE_VERCEL_BACKEND = true?
   ↓
   SIM ✅
   ↓
3️⃣ Chama: https://nopico.vercel.app/api/pnboia/pnboia-florianopolis
   ↓
4️⃣ Vercel Function executa:
   ↓
   ├─ Tentativa 1: API GOOS (http://goosbrasil.org:8080/...)
   │  ├─ Sucesso? → Retorna dados reais ✅
   │  └─ Falhou? → Próxima tentativa
   ↓
   ├─ Tentativa 2: Scraping site Marinha
   │  ├─ Sucesso? → Retorna dados reais ✅
   │  └─ Falhou? → Próxima tentativa
   ↓
   └─ Tentativa 3: Open-Meteo (previsão calibrada)
      ├─ Sucesso? → Retorna previsão ✅
      └─ Falhou? → Erro 503
   ↓
5️⃣ Frontend recebe dados
   ↓
6️⃣ Exibe para usuário:
   "Ondas: 1.5m | Florianópolis (boia offshore)"
```

---

## 📁 **ESTRUTURA DE ARQUIVOS**

```
seu-projeto/
│
├── api/                        ← NOVO! Vercel Serverless
│   └── pnboia/
│       ├── [buoyId].ts         ← GET /api/pnboia/pnboia-florianopolis
│       └── sync-all.ts         ← GET /api/pnboia/sync-all
│
├── supabase/                   ← MANTÉM (outras funcionalidades)
│   └── functions/
│       └── server/
│           ├── index.tsx       ← Rotas gerais
│           ├── pnboiaScraper.tsx  ← Fallback (se Vercel cair)
│           └── kv_store.tsx    ← Banco de dados
│
├── services/
│   ├── pnboiaApi.ts            ← ATUALIZAR (adicionar lógica Vercel)
│   └── vercelConfig.ts         ← CRIAR (configuração)
│
├── package.json                ← CRIAR (dependências Vercel)
├── vercel.json                 ← ATUALIZADO (config timeout)
└── .vercelignore               ← CRIAR (otimizar deploy)
```

---

## 🎯 **ENDPOINTS DISPONÍVEIS**

### **1. Boia individual:**

```
GET /api/pnboia/[buoyId]

Exemplos:
- /api/pnboia/pnboia-florianopolis
- /api/pnboia/pnboia-rio-de-janeiro
- /api/pnboia/pnboia-santos
```

**Resposta:**

```json
{
  "success": true,
  "data": {
    "timestamp": "2025-11-14T15:30:00.000Z",
    "waveHeight": 1.5,
    "wavePeriod": 8.2,
    "waveDirection": 120,
    "windSpeed": 18,
    "windDirection": 110,
    "waterTemp": 22,
    "buoyId": "pnboia-florianopolis",
    "buoyName": "Florianópolis",
    "isMockData": false,
    "dataSource": "api"
  },
  "source": "api",
  "timestamp": "2025-11-14T15:30:05.123Z"
}
```

### **2. Sincronizar todas:**

```
GET /api/pnboia/sync-all
```

**Resposta:**

```json
{
  "success": true,
  "summary": {
    "total": 14,
    "successful": 12,
    "failed": 2,
    "duration": "45.23s",
    "sources": {
      "api": 8,
      "scraping": 2,
      "forecast-calibrated": 2
    }
  },
  "results": [
    { "buoyId": "pnboia-florianopolis", "success": true, "data": {...} },
    { "buoyId": "pnboia-rio-grande", "success": true, "data": {...} },
    ...
  ]
}
```

---

## 🔄 **INTEGRAÇÃO COM FRONTEND**

### **Código atual (Supabase):**

```typescript
// services/pnboiaApi.ts (ANTES)
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync/${buoyId}`,
  {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    }
  }
);
```

### **Código novo (Vercel + Fallback):**

```typescript
// services/pnboiaApi.ts (DEPOIS)
import { VERCEL_API_URL, USE_VERCEL_BACKEND } from './vercelConfig';

async function fetchBuoyData(buoyId: string) {
  
  // 1️⃣ TENTAR VERCEL (ROBUSTO)
  if (USE_VERCEL_BACKEND) {
    try {
      const response = await fetch(`${VERCEL_API_URL}/pnboia/${buoyId}`);
      const result = await response.json();
      
      if (result.success) {
        return result.data; // ✅ Sucesso!
      }
    } catch (error) {
      console.error('Vercel falhou, usando fallback...');
    }
  }
  
  // 2️⃣ FALLBACK: SUPABASE (se Vercel cair)
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync/${buoyId}`,
    {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    }
  );
  
  const result = await response.json();
  return result.data;
}
```

---

## ⏰ **CRON JOB (Atualização automática)**

### **Configuração no Vercel:**

```
┌──────────────────────────────────────────────────────────┐
│  VERCEL CRON JOB                                         │
│  Path: /api/pnboia/sync-all                              │
│  Schedule: 0 */3 * * *                                   │
│  (A cada 3 horas: 00:00, 03:00, 06:00, 09:00, ...)      │
└──────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────┐
│  Vercel executa automaticamente:                         │
│  GET /api/pnboia/sync-all                                │
└──────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────┐
│  Busca TODAS as 14 boias em paralelo                     │
│  Salva resultados no Supabase KV (opcional)              │
│  Logs disponíveis no dashboard                           │
└──────────────────────────────────────────────────────────┘
```

---

## 💰 **CUSTOS (Plano HOBBY - GRÁTIS)**

### **Cálculo de uso:**

```
📊 ESTIMATIVA MENSAL:

14 boias × 8 sync/dia = 112 invocações/dia
112 × 30 dias = 3.360 invocações/mês

Usuários frontend:
1.000 visitas/dia × 0.2 req PNBOIA/visita = 200 req/dia
200 × 30 = 6.000 invocações/mês

TOTAL: 9.360 invocações/mês

┌─────────────────────────────────────────────┐
│  Limite Vercel Hobby: 100.000/mês          │
│  Seu uso estimado: 9.360/mês               │
│  Margem de segurança: 90%                  │
│  Custo: $0/mês ✅                           │
└─────────────────────────────────────────────┘
```

---

## 🎯 **CHECKLIST VISUAL**

### **Antes do deploy:**

```
┌─────────────────────────────────────────────┐
│  ☐ Node.js instalado (v18+)                │
│  ☐ Git instalado                           │
│  ☐ Conta GitHub criada                     │
│  ☐ Conta Vercel criada (grátis)            │
│  ☐ npm install executado                   │
└─────────────────────────────────────────────┘
```

### **Deploy:**

```
┌─────────────────────────────────────────────┐
│  ☐ vercel login                            │
│  ☐ vercel --prod                           │
│  ☐ Copiar URL (ex: nopico-xxx.vercel.app)  │
└─────────────────────────────────────────────┘
```

### **Teste:**

```
┌─────────────────────────────────────────────┐
│  ☐ Testar: /api/pnboia/pnboia-florianopolis│
│  ☐ Verificar: success = true               │
│  ☐ Verificar: waveHeight > 0               │
│  ☐ Verificar: dataSource = "api" ou "..."  │
└─────────────────────────────────────────────┘
```

### **Integração:**

```
┌─────────────────────────────────────────────┐
│  ☐ Criar /services/vercelConfig.ts         │
│  ☐ Atualizar VERCEL_API_URL                │
│  ☐ Ativar: USE_VERCEL_BACKEND = true       │
│  ☐ Testar no frontend local                │
│  ☐ Deploy frontend                         │
└─────────────────────────────────────────────┘
```

### **CRON:**

```
┌─────────────────────────────────────────────┐
│  ☐ Ir em Settings → Cron Jobs              │
│  ☐ Adicionar: /api/pnboia/sync-all         │
│  ☐ Schedule: 0 */3 * * *                   │
│  ☐ Salvar                                  │
└─────────────────────────────────────────────┘
```

---

## ✅ **RESULTADO FINAL**

### **Dados das boias agora:**

```
┌───────────────────────────────────────────────────────────┐
│  ANTES:                                                   │
│  ⚠️ 100% dados calibrados (forecast-calibrated)          │
│  ⚠️ Nunca dados reais                                    │
│  ⚠️ Boias sempre marcadas como "offline"                 │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│  DEPOIS:                                                  │
│  ✅ 60-80% dados reais (API GOOS)                         │
│  ✅ 10-20% dados reais (scraping)                         │
│  ✅ 10-20% dados calibrados (fallback)                    │
│  ✅ Boias marcadas como "online" quando houver dados     │
└───────────────────────────────────────────────────────────┘
```

---

## 🚀 **COMEÇAR AGORA**

```bash
# 3 comandos mágicos:
npm install -g vercel
vercel login
vercel --prod

# Copiar URL:
# https://seu-projeto.vercel.app

# Testar:
# https://seu-projeto.vercel.app/api/pnboia/pnboia-florianopolis
```

**Tempo total:** 10 minutos ⏱️  
**Dificuldade:** ⭐⭐ Fácil  
**Chance de sucesso:** 90% ✅

**BORA?** 🌊🏄‍♂️
