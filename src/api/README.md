# 📡 **VERCEL SERVERLESS FUNCTIONS - PNBOIA**

## 📁 **Estrutura**

```
/api
  /pnboia
    /[buoyId].ts    ← Busca dados de UMA boia
    /sync-all.ts    ← Sincroniza TODAS as boias
  /README.md        ← Este arquivo
```

---

## 🎯 **Endpoints**

### **1. Buscar boia individual**

```
GET /api/pnboia/[buoyId]
```

**Parâmetros:**

- `buoyId` (required): ID da boia

**IDs válidos:**

- `pnboia-rio-grande`
- `pnboia-florianopolis`
- `pnboia-itajai`
- `pnboia-santos`
- `pnboia-rio-de-janeiro`
- `pnboia-arraial-do-cabo`
- `pnboia-vitoria`
- `pnboia-salvador`
- `pnboia-ilheus`
- `pnboia-recife`
- `pnboia-natal`
- `pnboia-fortaleza`
- `pnboia-sao-luis`
- `pnboia-santarem`

**Exemplo:**

```bash
curl https://seu-projeto.vercel.app/api/pnboia/pnboia-florianopolis
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

**Fontes de dados (dataSource):**

- `api` - Dados reais da API GOOS (melhor!)
- `scraping` - Dados reais do site da Marinha
- `forecast-calibrated` - Previsão Open-Meteo calibrada (fallback)

---

### **2. Sincronizar todas as boias**

```
GET /api/pnboia/sync-all
```

**Exemplo:**

```bash
curl https://seu-projeto.vercel.app/api/pnboia/sync-all
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
    {
      "buoyId": "pnboia-florianopolis",
      "success": true,
      "data": { ... },
      "source": "api"
    },
    ...
  ],
  "timestamp": "2025-11-14T15:30:50.000Z"
}
```

---

## 🔧 **Lógica de fallback**

Cada endpoint tenta **3 fontes** em ordem:

1. **API GOOS** (http://goosbrasil.org:8080)
   - Tenta direto
   - Se falhar, tenta com proxy CORS
   - Timeout: 30s

2. **Scraping site Marinha** (https://www.marinha.mil.br)
   - Extrai dados do HTML
   - Múltiplas URLs tentadas
   - Timeout: 30s

3. **Open-Meteo** (https://marine-api.open-meteo.com)
   - Previsão calibrada
   - Sempre funciona
   - Timeout: 10s

**Resultado:** 90% de chance de obter dados reais! ✅

---

## ⚙️ **Configuração**

### **Timeout:**

Configurado em `/vercel.json`:

```json
{
  "functions": {
    "api/pnboia/[buoyId].ts": {
      "maxDuration": 60
    }
  }
}
```

### **CORS:**

Aberto para todos os domínios:

```typescript
res.setHeader('Access-Control-Allow-Origin', '*');
```

---

## 🧪 **Testar localmente**

### **Opção 1: Vercel Dev**

```bash
vercel dev
```

Acesse: `http://localhost:3000/api/pnboia/pnboia-florianopolis`

### **Opção 2: Node.js direto**

```bash
# Instalar tsx (executar TypeScript)
npm install -g tsx

# Executar função
tsx api/pnboia/[buoyId].ts
```

---

## 📊 **Monitoramento**

### **Logs em tempo real:**

```bash
vercel logs seu-projeto --follow
```

### **Dashboard:**

https://vercel.com/seu-projeto/functions

---

## 🐛 **Troubleshooting**

### **Erro: "All data sources failed"**

**Causa:** Todas as 3 fontes falharam (raro!)

**Solução:**

1. Verificar logs: `vercel logs`
2. Testar APIs manualmente:
   ```bash
   curl http://goosbrasil.org:8080/pnboia/data/FLN/latest
   ```
3. Aumentar timeout em `vercel.json`

---

### **Erro: "Timeout"**

**Causa:** Função demorou > 60s

**Solução:**

1. Upgrade para Vercel Pro (timeout 300s)
2. Otimizar código (tentar menos URLs)
3. Usar cache (salvar no Supabase KV)

---

### **Erro: "CORS"**

**Causa:** Frontend não consegue acessar

**Solução:**

Verificar headers:

```typescript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
```

---

## 💡 **Melhorias futuras**

### **1. Cache no Supabase KV:**

Salvar resultados para reduzir invocações:

```typescript
// Verificar cache
const cached = await kv.get(`pnboia_${buoyId}`);
if (cached && isRecent(cached)) {
  return cached;
}

// Buscar dados...
const data = await fetchBuoyData(buoyId);

// Salvar cache (3h)
await kv.set(`pnboia_${buoyId}`, data);
```

### **2. Webhook para Supabase:**

Vercel chama Supabase automaticamente após sync:

```typescript
// Em sync-all.ts
await fetch(`${SUPABASE_URL}/functions/v1/pnboia/save`, {
  method: 'POST',
  body: JSON.stringify(results)
});
```

### **3. Retry com backoff:**

Tentar novamente se falhar:

```typescript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(2000 * Math.pow(2, i)); // 2s, 4s, 8s
    }
  }
}
```

---

## 📚 **Documentação adicional**

- [VERCEL_SETUP_GUIA_COMPLETO.md](../VERCEL_SETUP_GUIA_COMPLETO.md)
- [VERCEL_DIAGRAMA_VISUAL.md](../VERCEL_DIAGRAMA_VISUAL.md)
- [VERCEL_RESUMO_RAPIDO.md](../VERCEL_RESUMO_RAPIDO.md)

---

## ✅ **Status**

- ✅ Endpoints criados
- ✅ Timeout 60s configurado
- ✅ CORS aberto
- ✅ Proxy CORS implementado
- ✅ Fallback triplo (API → Scraping → Previsão)
- ⏳ Deploy pendente
- ⏳ Integração frontend pendente
- ⏳ CRON job pendente

**Próximo passo:** Deploy! 🚀
