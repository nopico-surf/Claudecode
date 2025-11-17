# 🚀 **GUIA COMPLETO: DEPLOY VERCEL SERVERLESS FUNCTIONS**

## 📋 **O QUE FOI CRIADO**

### **Arquivos novos:**

```
/api
  /pnboia
    /[buoyId].ts      ← Endpoint individual (ex: /api/pnboia/pnboia-florianopolis)
    /sync-all.ts      ← Endpoint para sincronizar todas (ex: /api/pnboia/sync-all)
/package.json         ← Dependências Node.js
/vercel.json          ← Configuração Vercel (timeout 60s)
/.vercelignore        ← Ignorar arquivos desnecessários
```

### **O que cada endpoint faz:**

| Endpoint | Método | Descrição | Exemplo |
|----------|--------|-----------|---------|
| `/api/pnboia/[buoyId]` | GET | Busca dados de UMA boia específica | `/api/pnboia/pnboia-florianopolis` |
| `/api/pnboia/sync-all` | GET | Sincroniza TODAS as 14 boias em paralelo | `/api/pnboia/sync-all` |

---

## 🎯 **COMO FAZER DEPLOY (PASSO A PASSO)**

### **OPÇÃO A: DEPLOY VIA WEB (Mais fácil - 10 minutos)**

#### **1. Criar conta Vercel (GRÁTIS)**

1. Acesse: https://vercel.com/signup
2. Clique em **"Continue with GitHub"**
3. Autorize Vercel a acessar seus repositórios

#### **2. Importar projeto**

1. No painel Vercel, clique em **"Add New..."** → **"Project"**
2. Selecione o repositório do seu site (nopico)
3. Clique em **"Import"**

#### **3. Configurar projeto**

Na tela de configuração:

```
Framework Preset: Vite (ou detecta automaticamente)
Root Directory: ./
Build Command: (deixe vazio - só serverless functions)
Output Directory: dist
Install Command: npm install
```

**IMPORTANTE:** Marque a opção **"Serverless Functions"**

#### **4. Deploy**

1. Clique em **"Deploy"**
2. Aguarde ~2 minutos
3. ✅ Deploy concluído!

#### **5. Testar**

Vercel vai te dar uma URL tipo:
```
https://seu-projeto.vercel.app
```

Testar endpoints:
```
https://seu-projeto.vercel.app/api/pnboia/pnboia-florianopolis
https://seu-projeto.vercel.app/api/pnboia/sync-all
```

---

### **OPÇÃO B: DEPLOY VIA CLI (Mais rápido - 5 minutos)**

#### **1. Instalar Vercel CLI**

```bash
npm install -g vercel
```

#### **2. Login**

```bash
vercel login
```

Abre navegador para autenticar com GitHub.

#### **3. Deploy**

No diretório raiz do projeto:

```bash
vercel --prod
```

Perguntas que vai fazer:

```
? Set up and deploy "~/seu-projeto"? [Y/n] y
? Which scope do you want to deploy to? Seu Nome
? Link to existing project? [y/N] n
? What's your project's name? nopico
? In which directory is your code located? ./
```

Aguarde ~2 minutos.

✅ Deploy concluído! URL será exibida no terminal.

---

## 🔧 **INTEGRAR COM FRONTEND ATUAL**

### **1. Criar arquivo de configuração**

Crie `/services/vercelConfig.ts`:

```typescript
// Configuração do backend Vercel
export const VERCEL_API_URL = 
  process.env.NODE_ENV === 'production'
    ? 'https://seu-projeto.vercel.app/api' // ← Trocar pela sua URL
    : 'http://localhost:3000/api'; // Desenvolvimento local

export const USE_VERCEL_BACKEND = true; // Toggle ON/OFF
```

### **2. Modificar pnboiaApi.ts**

Edite `/services/pnboiaApi.ts`:

```typescript
import { VERCEL_API_URL, USE_VERCEL_BACKEND } from './vercelConfig';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Função para buscar dados de uma boia
export async function fetchBuoyData(buoyId: string) {
  
  // ✅ USAR VERCEL (ROBUSTO - 60s timeout)
  if (USE_VERCEL_BACKEND) {
    try {
      console.log(`[PNBOIA] Usando backend Vercel: ${buoyId}`);
      
      const response = await fetch(`${VERCEL_API_URL}/pnboia/${buoyId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Vercel API falhou: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log(`[PNBOIA] ✅ Vercel sucesso: ${result.data.waveHeight}m (${result.source})`);
        return result.data;
      } else {
        throw new Error(result.error);
      }

    } catch (error) {
      console.error(`[PNBOIA] ❌ Vercel falhou:`, error);
      // Fallback para Supabase Edge Function
      console.log(`[PNBOIA] Tentando fallback Supabase...`);
    }
  }

  // ⚠️ FALLBACK: SUPABASE EDGE FUNCTION (limitado - 15s timeout)
  console.log(`[PNBOIA] Usando backend Supabase: ${buoyId}`);
  
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync/${buoyId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Accept': 'application/json'
      }
    }
  );

  const result = await response.json();
  return result.data;
}

// Função para sincronizar todas as boias
export async function syncAllBuoys() {
  
  if (USE_VERCEL_BACKEND) {
    try {
      console.log(`[PNBOIA] Sincronizando todas via Vercel...`);
      
      const response = await fetch(`${VERCEL_API_URL}/pnboia/sync-all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Vercel sync-all falhou: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log(`[PNBOIA] ✅ Sync concluído: ${result.summary.successful}/${result.summary.total} boias`);
        return result;
      } else {
        throw new Error(result.error);
      }

    } catch (error) {
      console.error(`[PNBOIA] ❌ Vercel sync-all falhou:`, error);
    }
  }

  // Fallback Supabase...
  console.log(`[PNBOIA] Usando sync Supabase...`);
  // ... código atual
}
```

### **3. Trocar URL no vercelConfig.ts**

Depois do deploy, trocar:

```typescript
export const VERCEL_API_URL = 'https://SEU-PROJETO-AQUI.vercel.app/api';
```

Por exemplo:
```typescript
export const VERCEL_API_URL = 'https://nopico-surf.vercel.app/api';
```

---

## 🧪 **TESTAR ENDPOINTS**

### **Testar individualmente:**

```bash
# Florianópolis
curl https://seu-projeto.vercel.app/api/pnboia/pnboia-florianopolis

# Rio de Janeiro
curl https://seu-projeto.vercel.app/api/pnboia/pnboia-rio-de-janeiro
```

### **Testar sincronização de todas:**

```bash
curl https://seu-projeto.vercel.app/api/pnboia/sync-all
```

### **Testar no navegador:**

Abra no navegador:
```
https://seu-projeto.vercel.app/api/pnboia/pnboia-florianopolis
```

Resposta esperada:
```json
{
  "success": true,
  "data": {
    "timestamp": "2025-11-14T12:30:00.000Z",
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
  "timestamp": "2025-11-14T12:30:05.123Z"
}
```

---

## ⏰ **CONFIGURAR CRON JOB (Atualizar a cada 3h)**

### **No painel Vercel:**

1. Vá em **Settings** → **Cron Jobs**
2. Clique em **"Add Cron Job"**
3. Configure:

```
Path: /api/pnboia/sync-all
Schedule: 0 */3 * * * (a cada 3 horas)
```

4. Salvar

Agora as boias serão atualizadas automaticamente! 🎉

---

## 📊 **MONITORAR LOGS**

### **Via painel web:**

1. Acesse: https://vercel.com/seu-projeto
2. Vá em **"Functions"**
3. Clique em `/api/pnboia/[buoyId]`
4. Veja logs em tempo real

### **Via CLI:**

```bash
vercel logs seu-projeto --follow
```

---

## 💰 **CUSTOS**

### **Plano HOBBY (GRÁTIS):**

```
✅ 100 GB bandwidth/mês
✅ 100.000 invocações/mês
✅ Timeout: 10s (edge) / 60s (serverless)
✅ Domínio .vercel.app incluído
```

**Seu uso estimado:**

```
14 boias × 8 atualizações/dia = 112 invocações/dia
112 × 30 dias = 3.360 invocações/mês

📊 Conclusão: SOBRA MUITO no plano grátis! ✅
```

### **Plano PRO ($20/mês):**

```
✅ 1 TB bandwidth/mês
✅ 1.000.000 invocações/mês
✅ Timeout: 60s (edge) / 300s (serverless) ← 5 minutos!
✅ Domínio customizado
✅ Suporte prioritário
```

**Só vale se:**
- Quiser timeout de 5min (scraping muito lento)
- Tiver muito tráfego (>100k/mês)

---

## 🔥 **VANTAGENS VERCEL vs SUPABASE**

| Característica | Vercel | Supabase Edge |
|---------------|--------|---------------|
| **Timeout** | 60s (hobby) / 300s (pro) | 15s (fixo) |
| **HTTP** | ✅ Permitido | ❌ Bloqueado (Mixed Content) |
| **CORS** | ✅ Servidor→Servidor | ❌ Bloqueado por sites |
| **Node.js** | ✅ Completo | 🟡 Limitado (Deno) |
| **Proxy** | ✅ Pode usar | 🟡 Limitado |
| **Logs** | ✅ Tempo real | 🟡 Básico |
| **Custo** | $0-20/mês | $0 (incluído) |

---

## 🎯 **PRÓXIMOS PASSOS**

### **1. Deploy (AGORA):**

```bash
# Se já tem conta:
vercel --prod

# Se não tem:
# 1. Criar conta em vercel.com
# 2. Importar projeto via web
```

### **2. Pegar URL do projeto**

Exemplo: `https://nopico-surf.vercel.app`

### **3. Integrar no frontend**

Criar `/services/vercelConfig.ts`:

```typescript
export const VERCEL_API_URL = 'https://SUA-URL-AQUI.vercel.app/api';
export const USE_VERCEL_BACKEND = true;
```

### **4. Testar**

Abrir no navegador:
```
https://SUA-URL-AQUI.vercel.app/api/pnboia/pnboia-florianopolis
```

### **5. Ativar CRON job**

Painel Vercel → Settings → Cron Jobs → Adicionar:
```
/api/pnboia/sync-all (a cada 3h)
```

---

## 🐛 **TROUBLESHOOTING**

### **Erro: "Module not found"**

```bash
npm install
vercel --prod
```

### **Erro: "Timeout"**

Aumentar timeout no `vercel.json`:

```json
{
  "functions": {
    "api/pnboia/[buoyId].ts": {
      "maxDuration": 60
    }
  }
}
```

### **Erro: "CORS"**

Já está configurado! Mas se precisar:

```typescript
res.setHeader('Access-Control-Allow-Origin', '*');
```

---

## 📞 **SUPORTE**

- **Documentação Vercel:** https://vercel.com/docs/functions
- **Dashboard:** https://vercel.com/dashboard
- **Comunidade:** https://github.com/vercel/vercel/discussions

---

## ✅ **CHECKLIST RÁPIDO**

- [ ] Criar conta Vercel
- [ ] Fazer deploy (`vercel --prod`)
- [ ] Pegar URL do projeto
- [ ] Testar endpoint: `/api/pnboia/pnboia-florianopolis`
- [ ] Testar sync-all: `/api/pnboia/sync-all`
- [ ] Criar `/services/vercelConfig.ts`
- [ ] Integrar no frontend
- [ ] Configurar CRON job (a cada 3h)
- [ ] Monitorar logs
- [ ] 🎉 FUNCIONANDO!

---

## 🚀 **QUER COMEÇAR AGORA?**

**Se você tem Git + Node.js instalado:**

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Copiar URL que aparecer
# 5. Testar: https://SUA-URL.vercel.app/api/pnboia/pnboia-florianopolis
```

**Se prefere interface web:**

1. Acesse: https://vercel.com/new
2. Conecte GitHub
3. Selecione repositório
4. Deploy automático!

---

**Tempo estimado total:** 10-15 minutos ⏱️  
**Dificuldade:** ⭐⭐ (Fácil)  
**Chance de sucesso:** 90% ✅

**BORA TESTAR?** 🌊🏄‍♂️
