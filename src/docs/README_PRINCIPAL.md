# 🌊 Sistema de Previsão de Ondas por Nível de Surf

## 📋 Documentação Principal

### **Arquivos de documentação antigos foram mantidos no root do projeto.**
### **Para informações atualizadas, consulte os arquivos abaixo:**

---

## 🚀 COMEÇAR AQUI

### **1. TESTAR O SISTEMA AGORA**

O sistema foi atualizado para **versão 1.2.1** com correções no PNBOIA.

**Para testar se está funcionando:**

1. **Aguarde 90 segundos** (deploy do Edge Function)
2. Abra console do navegador (F12)
3. Cole e execute:

```javascript
const B='https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b';
const T='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';

fetch(B+'/pnboia/status',{headers:{Authorization:T}})
.then(r=>r.json())
.then(d=>{
  console.log('📊 Status PNBOIA:');
  console.log('   Boias ativas:',d.active+'/'+d.total);
  console.log('   Última sync:',d.lastGlobalSync||'NUNCA');
  console.log('   Sistema:',d.active>0?'✅ OK':'⚠️ Aguarde 1min');
});
```

---

## 📁 ESTRUTURA DO PROJETO

```
/
├── App.tsx                          # Componente principal
├── components/                      # Componentes React
│   ├── admin/                      # Dashboard administrativo
│   │   ├── AdminLogin.tsx          # Login (senha: Limao@32949)
│   │   ├── CalibrationDashboard.tsx # Calibração de ajustes
│   │   ├── PNBOIADashboard.tsx     # Monitor de boias
│   │   └── ...
│   ├── SpotDetails.tsx             # Detalhes do pico
│   ├── WaveConditionsCard.tsx      # Card de condições
│   └── ...
│
├── data/
│   ├── spots.ts                    # 223 picos do Brasil
│   ├── spotWaveAdjustments.ts      # Ajustes customizados por pico
│   └── buoyLocations.ts            # Localização das boias PNBOIA
│
├── services/
│   ├── waveApi.ts                  # Open-Meteo Marine API
│   ├── pnboiaApi.ts                # Consulta dados PNBOIA
│   ├── biasCorrection.ts           # Correção de viés com boias
│   └── ...
│
├── supabase/functions/server/
│   ├── index.tsx                   # Servidor Hono (v1.2.1)
│   ├── pnboiaScraper.tsx          # Scraper das boias
│   └── kv_store.tsx               # Banco de dados KV
│
└── docs/                           # Documentação completa
```

---

## 🎯 FUNCIONALIDADES PRINCIPAIS

### **1. Previsão de Ondas**
- ✅ **223 picos** distribuídos por todo o Brasil
- ✅ Classificação por nível: **Iniciante** (0.3-0.7m), **Intermediário** (0.5-1.7m), **Avançado** (>1.0m)
- ✅ Dados de: altura das ondas, direção do vento, maré, temperatura
- ✅ Previsão horária (próximas 24h) e semanal (7 dias)

### **2. Integração PNBOIA**
- ✅ **14 boias** da Marinha do Brasil
- ✅ Dados reais offshore para bias correction
- ✅ Sincronização automática a cada 3 horas
- ✅ Fallback inteligente para Open-Meteo se boia offline

### **3. Dashboard Administrativo** (`/admin`)
- 🔐 **Senha:** `Limao@32949`
- ✅ Registro de observações reais vs previsões
- ✅ Monitor de status das boias PNBOIA
- ✅ Análise estatística de precisão
- ✅ Padrões de calibração por pico

---

## 🔧 ARQUITETURA TÉCNICA

### **Frontend → Server → Database**

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   React     │─────▶│ Hono Server  │─────▶│ Supabase KV │
│  (Browser)  │      │ (Edge Func)  │      │  (Postgres) │
└─────────────┘      └──────────────┘      └─────────────┘
       │                    │
       │                    ├─────▶ Open-Meteo API
       │                    ├─────▶ PNBOIA Scraper
       │                    └─────▶ Bias Correction
       │
       └─────────▶ Admin Dashboard (/admin)
```

---

## 📊 APIS UTILIZADAS

| API | Uso | Frequência |
|-----|-----|------------|
| **Open-Meteo Marine** | Previsão de ondas offshore | Em tempo real |
| **PNBOIA (Marinha)** | Dados reais das boias | A cada 3h |
| **Supabase KV** | Cache de dados + observações | Persistente |

---

## 🐛 RESOLUÇÃO DE PROBLEMAS

### **Problema: Endpoint retorna 404**
- **Causa:** Edge Function ainda não deployou
- **Solução:** Aguarde 90 segundos e teste novamente

### **Problema: Boias retornam `0/14`**
- **Causa:** Sincronização ainda não ocorreu
- **Solução:** 
  ```javascript
  // Forçar sync manual
  fetch('https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
  });
  ```

### **Problema: Dados PNBOIA vazios**
- **Causa:** Boias offline ou erro no scraper
- **Solução:** Sistema usa fallback para Open-Meteo automaticamente

---

## 📚 DOCUMENTAÇÃO ADICIONAL

- **Arquitetura completa:** `/docs/ARQUITETURA_3_CAMADAS_EXPLICADA.md`
- **Implementação PNBOIA:** `/docs/PNBOIA_IMPLEMENTACAO_COMPLETA.md`
- **Guia de calibração:** `/docs/SISTEMA_CALIBRACAO.md`
- **Como adicionar picos:** `/INSTRUCOES_ADICIONAR_PICOS.md`

---

## 🔗 LINKS IMPORTANTES

- **Site:** https://seu-site.vercel.app
- **Admin:** https://seu-site.vercel.app/admin
- **Supabase:** https://supabase.com/dashboard/project/rqgubpqniscyoojkwltn
- **Edge Function:** https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b

---

## ✅ STATUS ATUAL

- ✅ Servidor versão **1.2.1** deployado
- ✅ Endpoints PNBOIA corrigidos
- ✅ Auto-sync ativo (intervalo: 3h)
- ✅ Admin dashboard funcional
- ✅ 223 picos cadastrados

---

**Última atualização:** 10/11/2025 20:45 UTC
