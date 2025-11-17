# 🧪 **TESTAR VERCEL LOCALMENTE (ANTES DO DEPLOY)**

## 📋 **POR QUE TESTAR LOCAL?**

Antes de fazer deploy na Vercel, você pode testar tudo no seu computador:
- ✅ Verificar se o código funciona
- ✅ Depurar erros
- ✅ Ver logs em tempo real
- ✅ Economizar tempo

---

## 🚀 **OPÇÃO 1: TESTAR COM VERCEL DEV (Recomendado)**

### **1. Instalar dependências**

```bash
npm install
```

### **2. Instalar Vercel CLI**

```bash
npm install -g vercel
```

### **3. Iniciar servidor local**

```bash
vercel dev
```

Vai perguntar:

```
? Set up and develop "~/seu-projeto"? [Y/n] y
? Which scope should contain your project? Seu Nome
? Link to existing project? [y/N] n
? What's your project's name? nopico
? In which directory is your code located? ./
```

### **4. Servidor rodando!**

```
✅ Ready! Available at http://localhost:3000
```

### **5. Testar endpoints**

Abra no navegador ou use `curl`:

```bash
# Testar boia individual
curl http://localhost:3000/api/pnboia/pnboia-florianopolis

# Testar sync all
curl http://localhost:3000/api/pnboia/sync-all
```

### **6. Ver logs**

Os logs aparecem direto no terminal! 🎉

---

## 🚀 **OPÇÃO 2: TESTAR COM NODE.JS PURO (Sem Vercel CLI)**

### **1. Criar arquivo de teste**

Crie `/test-pnboia-local.js`:

```javascript
// Simular ambiente Vercel
async function testPNBOIA() {
  const buoyId = 'pnboia-florianopolis';
  
  console.log(`\n🌊 Testando busca de dados: ${buoyId}\n`);

  // Importar lógica do arquivo (copiar/colar funções)
  const BUOY_MAPPING = {
    'pnboia-florianopolis': {
      pnboiaCode: 'FLN',
      name: 'Florianópolis',
      location: { lat: -27.70, lon: -47.62 }
    }
  };

  // 1️⃣ TESTAR API GOOS
  console.log('1️⃣ Tentando API GOOS...');
  try {
    const buoyInfo = BUOY_MAPPING[buoyId];
    const apiUrl = `http://goosbrasil.org:8080/pnboia/data/${buoyInfo.pnboiaCode}/latest`;
    
    console.log(`   URL: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      signal: AbortSignal.timeout(15000)
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ Dados recebidos:`, data);
    } else {
      console.log(`   ❌ API falhou`);
    }
  } catch (error) {
    console.log(`   ❌ Erro:`, error.message);
  }

  // 2️⃣ TESTAR PROXY CORS
  console.log('\n2️⃣ Tentando com Proxy CORS...');
  try {
    const buoyInfo = BUOY_MAPPING[buoyId];
    const apiUrl = `http://goosbrasil.org:8080/pnboia/data/${buoyInfo.pnboiaCode}/latest`;
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(apiUrl);
    
    console.log(`   URL: ${proxyUrl}`);
    
    const response = await fetch(proxyUrl, {
      signal: AbortSignal.timeout(15000)
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ Dados recebidos via proxy:`, data);
    } else {
      console.log(`   ❌ Proxy falhou`);
    }
  } catch (error) {
    console.log(`   ❌ Erro:`, error.message);
  }

  // 3️⃣ TESTAR OPEN-METEO (PREVISÃO)
  console.log('\n3️⃣ Tentando Open-Meteo...');
  try {
    const buoyInfo = BUOY_MAPPING[buoyId];
    const { lat, lon } = buoyInfo.location;
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction,wave_period&timezone=America/Sao_Paulo&forecast_days=1`;
    
    console.log(`   URL: ${url}`);
    
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000)
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);

    if (response.ok) {
      const data = await response.json();
      const currentHour = data.hourly;
      const waveHeight = currentHour.wave_height[0];
      const wavePeriod = currentHour.wave_period[0];
      const waveDirection = currentHour.wave_direction[0];
      
      console.log(`   ✅ Previsão: ${waveHeight}m @ ${waveDirection}° (${wavePeriod}s)`);
    } else {
      console.log(`   ❌ Open-Meteo falhou`);
    }
  } catch (error) {
    console.log(`   ❌ Erro:`, error.message);
  }

  console.log('\n✅ Teste concluído!\n');
}

// Executar
testPNBOIA();
```

### **2. Executar teste**

```bash
node test-pnboia-local.js
```

### **3. Resultado esperado**

```
🌊 Testando busca de dados: pnboia-florianopolis

1️⃣ Tentando API GOOS...
   URL: http://goosbrasil.org:8080/pnboia/data/FLN/latest
   Status: 200 OK
   ✅ Dados recebidos: { Hs: 1.5, Tp: 8.2, ... }

2️⃣ Tentando com Proxy CORS...
   URL: https://api.allorigins.win/raw?url=http%3A%2F%2F...
   Status: 200 OK
   ✅ Dados recebidos via proxy: { Hs: 1.5, Tp: 8.2, ... }

3️⃣ Tentando Open-Meteo...
   URL: https://marine-api.open-meteo.com/v1/marine?...
   Status: 200 OK
   ✅ Previsão: 1.3m @ 120° (8.5s)

✅ Teste concluído!
```

---

## 🔍 **VERIFICAR SE ESTÁ TUDO OK**

### **✅ Checklist antes do deploy:**

- [ ] `npm install` rodou sem erros
- [ ] Pelo menos UMA das 3 fontes funcionou:
  - [ ] API GOOS direta
  - [ ] API GOOS via proxy CORS
  - [ ] Open-Meteo (previsão)
- [ ] Resposta tem `waveHeight` válido (> 0 e < 20)
- [ ] Timestamp está correto
- [ ] Sem erros de timeout (< 30s)

### **Se NENHUMA fonte funcionou:**

**Possíveis causas:**

1. **Sem internet:** Verifique conexão
2. **Firewall bloqueando:** Desabilite temporariamente
3. **APIs realmente offline:** Normal, vai usar previsão calibrada

**Solução:**

- Se pelo menos Open-Meteo funcionar → ✅ DEPLOY OK!
- Se tudo falhar → Testar em outro momento (APIs podem estar temporariamente offline)

---

## 🎯 **PRÓXIMO PASSO**

### **Se teste local funcionou:**

```bash
# Deploy na Vercel!
vercel --prod
```

### **Se teste local falhou:**

1. Verificar logs de erro
2. Conferir se tem internet
3. Tentar novamente em 10 minutos (APIs podem estar instáveis)
4. Se persistir, abrir issue no GitHub

---

## 📊 **COMPARAÇÃO: LOCAL vs VERCEL**

| Característica | Local (teste) | Vercel (produção) |
|---------------|---------------|-------------------|
| **Timeout** | Configurável | 60s (hobby) |
| **CORS** | ✅ Sem bloqueios | ✅ Sem bloqueios |
| **HTTP** | ✅ Permitido | ✅ Permitido |
| **Logs** | ✅ Terminal | ✅ Dashboard |
| **Custo** | $0 | $0 (hobby) |
| **Uptime** | Enquanto rodar | 24/7 |

---

## 💡 **DICAS**

### **Acelerar testes:**

```bash
# Testar só API GOOS (mais rápido)
curl -s http://goosbrasil.org:8080/pnboia/data/FLN/latest | jq

# Testar só Open-Meteo
curl -s "https://marine-api.open-meteo.com/v1/marine?latitude=-27.7&longitude=-47.62&hourly=wave_height&forecast_days=1" | jq
```

### **Ver logs bonitos:**

```bash
# Instalar jq (formatar JSON)
npm install -g jq

# Testar com formatação
curl http://localhost:3000/api/pnboia/pnboia-florianopolis | jq
```

---

## 🚀 **READY?**

**Se teste local OK:**

→ Vá para [VERCEL_SETUP_GUIA_COMPLETO.md](./VERCEL_SETUP_GUIA_COMPLETO.md)

**Se teste local FALHOU:**

→ Poste os logs de erro aqui que eu ajudo! 🤝
