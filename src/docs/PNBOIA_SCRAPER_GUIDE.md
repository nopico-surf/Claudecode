# 🌊 PNBOIA Scraper - Guia Completo

Sistema de scraping de dados das boias oceanográficas da Marinha do Brasil (PNBOIA) para bias correction em tempo real.

---

## 📋 Sumário

1. [Como Funciona](#como-funciona)
2. [Endpoints Disponíveis](#endpoints-disponíveis)
3. [Testando Manualmente](#testando-manualmente)
4. [Configurando Cron Job](#configurando-cron-job)
5. [Monitoramento](#monitoramento)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Como Funciona

### Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────┐
│  FONTE DE DADOS                                                 │
├─────────────────────────────────────────────────────────────────┤
│  1️⃣ API GOOS Brasil (JSON) - PRINCIPAL                         │
│     http://goosbrasil.org:8080/pnboia                          │
│                                                                  │
│  2️⃣ Site PNBOIA (HTML Scraping) - FALLBACK                     │
│     https://www.marinha.mil.br/chm/dados-do-goos-brasil/pnboia │
│                                                                  │
│  3️⃣ Mock Data - ÚLTIMO RECURSO (para testes)                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌──────────────────┐
                    │  PNBOIA SCRAPER  │
                    │  (Backend Deno)  │
                    └──────────────────┘
                              ↓
                    ┌──────────────────┐
                    │   KV STORE       │
                    │  (Supabase DB)   │
                    └──────────────────┘
                              ↓
                    ┌──────────────────┐
                    │  BIAS CORRECTION │
                    │  (Frontend API)  │
                    └──────────────────┘
```

### Dados Coletados

Para cada boia:
- ✅ **Hs** - Altura significativa de ondas (metros)
- ✅ **Tp** - Período de pico (segundos)
- ✅ **Dp** - Direção das ondas (graus)
- ✅ **Wspd** - Velocidade do vento (km/h)
- ✅ **Wdir** - Direção do vento (graus)
- ✅ **Temp** - Temperatura da água (°C)

---

## 🛠️ Endpoints Disponíveis

### 1. Sincronizar TODAS as Boias

**Endpoint:** `POST /make-server-2d5da22b/pnboia/sync-all`

**Descrição:** Sincroniza dados de todas as 14 boias de uma vez.

**Parâmetros:**
- `useMock=true` (opcional) - Força uso de dados mockados para testes
- **Padrão (sem parâmetro): Dados reais** - Tenta API → Scraping → Mock (fallback)

**Exemplo de chamada:**

```bash
# ✅ PRODUÇÃO (dados reais - PADRÃO)
curl -X POST "https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all" \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# 🧪 TESTE (forçar dados mockados)
curl -X POST "https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all?useMock=true" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Resposta:**

```json
{
  "status": "ok",
  "timestamp": "2025-11-07T14:30:00.000Z",
  "summary": {
    "total": 14,
    "success": 12,
    "failed": 2,
    "successRate": "86%"
  },
  "results": [
    {
      "buoyId": "pnboia-florianopolis",
      "success": true,
      "method": "api",
      "data": {
        "waveHeight": "1.50",
        "waveDirection": 120,
        "timestamp": "2025-11-07T14:30:00.000Z"
      }
    }
  ]
}
```

---

### 2. Sincronizar UMA Boia Específica

**Endpoint:** `POST /make-server-2d5da22b/pnboia/sync-one/:buoyId`

**Descrição:** Sincroniza dados de uma boia específica.

**IDs disponíveis:**
- `pnboia-florianopolis`
- `pnboia-rio-grande`
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
curl -X POST "https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-one/pnboia-florianopolis" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

### 3. Status de Todas as Boias

**Endpoint:** `GET /make-server-2d5da22b/pnboia/status`

**Descrição:** Retorna status de sincronização de todas as boias.

**Exemplo:**

```bash
curl "https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Resposta:**

```json
{
  "status": "ok",
  "buoys": [
    {
      "buoyId": "pnboia-florianopolis",
      "hasData": true,
      "lastSync": "2025-11-07T14:30:00.000Z",
      "status": "active"
    }
  ],
  "total": 14,
  "active": 12
}
```

---

### 4. Obter Dados de Uma Boia

**Endpoint:** `GET /make-server-2d5da22b/pnboia/:buoyId`

**Descrição:** Retorna dados armazenados de uma boia (usado pelo frontend).

**Exemplo:**

```bash
curl "https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-2d5da22b/pnboia/pnboia-florianopolis" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## 🧪 Testando Manualmente

### Passo 1: Testar com Dados Mockados

```bash
# 1. Abrir console do navegador na página do app
# 2. Executar no console:

const projectId = 'YOUR_PROJECT_ID';
const anonKey = 'YOUR_ANON_KEY';

fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all?useMock=true`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${anonKey}`
  }
})
.then(r => r.json())
.then(data => {
  console.log('✅ Sincronização completa:', data);
  console.log(`Sucesso: ${data.summary.success}/${data.summary.total} boias`);
});
```

### Passo 2: Verificar Status

```javascript
fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status`, {
  headers: {
    'Authorization': `Bearer ${anonKey}`
  }
})
.then(r => r.json())
.then(data => {
  console.log('📊 Status das boias:', data);
  data.buoys.forEach(b => {
    console.log(`${b.buoyId}: ${b.status} (última sync: ${b.lastSync})`);
  });
});
```

### Passo 3: Testar Bias Correction no Frontend

```javascript
// Abrir um pico próximo a uma boia (ex: Florianópolis)
// Verificar no console se aparece:

// ✅ PNBOIA: Boia Florianópolis encontrada (XXkm)
// 🎯 BIAS CORRECTION APLICADO (primeira hora):
//    Altura: 1.20m → 1.35m
//    Boia: Florianópolis
//    Confiança: 85%
```

---

## ⏰ Configurando Cron Job

Para atualização automática a cada 3 horas, você tem 3 opções:

### Opção A: Supabase Cron (Recomendado)

1. Ir em **Supabase Dashboard → Database → Cron Jobs**
2. Criar novo job:

```sql
-- Executar a cada 3 horas
SELECT cron.schedule(
  'pnboia-sync',
  '0 */3 * * *',  -- A cada 3 horas
  $$
  SELECT
    net.http_post(
      url := 'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all',
      headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb
    );
  $$
);
```

### Opção B: GitHub Actions (Grátis)

Criar arquivo `.github/workflows/pnboia-sync.yml`:

```yaml
name: PNBOIA Sync
on:
  schedule:
    - cron: '0 */3 * * *'  # A cada 3 horas
  workflow_dispatch:  # Permite execução manual

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Sync PNBOIA Data
        run: |
          curl -X POST "${{ secrets.SUPABASE_URL }}/functions/v1/make-server-2d5da22b/pnboia/sync-all" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}"
```

### Opção C: Cron-Job.org (Grátis e Simples)

1. Ir em https://cron-job.org
2. Criar conta grátis
3. Adicionar novo job:
   - **URL:** `https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all`
   - **Method:** POST
   - **Headers:** `Authorization: Bearer YOUR_ANON_KEY`
   - **Schedule:** `0 */3 * * *` (a cada 3 horas)

---

## 📊 Monitoramento

### Verificar Logs do Backend

```bash
# Via Supabase CLI
supabase functions logs make-server-2d5da22b --tail

# Procurar por:
# ✅ = Sucesso
# ⚠️ = Aviso
# ❌ = Erro
```

### Dashboard de Monitoramento (opcional)

Criar endpoint personalizado:

```typescript
app.get("/make-server-2d5da22b/pnboia/dashboard", async (c) => {
  // Retorna HTML com status visual de todas as boias
  // Pode ser acessado no navegador para monitoramento rápido
});
```

---

## 🐛 Troubleshooting

### ❌ Problema: "Sem dados disponíveis"

**Causa:** Boia offline ou API indisponível

**Solução:**
1. Verificar status da boia no site oficial: https://www.marinha.mil.br/chm/dados-do-goos-brasil/pnboia
2. Usar modo mock temporariamente: `?useMock=true`
3. Aguardar próxima sincronização (boias podem ficar offline temporariamente)

### ❌ Problema: "CORS error"

**Causa:** Headers CORS não configurados

**Solução:**
Verificar se o backend tem:

```typescript
app.use("/*", cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
```

### ❌ Problema: "Timeout ao fazer scraping"

**Causa:** Site PNBOIA lento ou bloqueando

**Solução:**
1. Aumentar timeout no scraper (atualmente 10-15s)
2. Usar apenas API GOOS (desabilitar scraping HTML)
3. Reportar problema à Marinha

### ❌ Problema: "Dados muito antigos"

**Causa:** Sincronização não está rodando automaticamente

**Solução:**
1. Verificar se cron job está configurado
2. Executar sincronização manual: `/pnboia/sync-all`
3. Verificar logs do cron job

---

## 📈 Métricas de Sucesso

### Taxa de Sucesso Esperada

- **>80%** = Excelente (sistema funcionando bem)
- **60-80%** = Bom (algumas boias offline)
- **<60%** = Problema (investigar logs)

### Latência Esperada

- **API GOOS:** 1-3 segundos por boia
- **Scraping HTML:** 5-15 segundos por boia
- **Total (14 boias):** 2-5 minutos

### Precisão do Bias Correction

- **Confiança >70%:** Correção confiável
- **Confiança 30-70%:** Correção moderada
- **Confiança <30%:** Não aplicar correção

---

## 🎯 Próximos Passos

1. ✅ **Implementar scraper** (Concluído)
2. ✅ **Criar endpoints backend** (Concluído)
3. ⏳ **Testar com dados reais**
4. ⏳ **Configurar cron job**
5. ⏳ **Monitorar por 48h**
6. ⏳ **Ajustar algoritmo de bias correction baseado em resultados**

---

## 📚 Recursos Adicionais

- **Site PNBOIA:** https://www.marinha.mil.br/chm/dados-do-goos-brasil/pnboia
- **GOOS Brasil:** http://goosbrasil.org
- **Documentação Técnica:** https://www.marinha.mil.br/chm/sites/www.marinha.mil.br.chm/files/dados_abertos/pnboia_metadados.pdf

---

## 💬 Suporte

Em caso de dúvidas:
1. Verificar logs: `supabase functions logs`
2. Verificar status: `GET /pnboia/status`
3. Reportar issue no GitHub

---

**Última atualização:** 07/11/2025  
**Versão:** 2.0.0
