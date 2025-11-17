# 🔍 Como Verificar se Está Usando Dados Reais

## 📋 TESTE RÁPIDO (3 minutos)

### **Passo 1: Abrir o Console**

1. No navegador, pressione **F12** (ou Cmd+Option+I no Mac)
2. Clique na aba **Console**
3. Recarregue a página (F5)

---

### **Passo 2: Aguardar Sincronização**

Após recarregar, você deve ver no console:

```
🌊 PNBOIA: Iniciando sincronização automática...
🔍 PNBOIA: Sincronizando em https://xxxxx.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all
```

**Aguarde 2-3 minutos** (pode demorar um pouco na primeira vez)

---

### **Passo 3: Verificar Resultado**

#### ✅ **SUCESSO - Dados Reais:**

```
✅ PNBOIA: Sincronização concluída com sucesso
   Boias ativas: 14/14
   Taxa de sucesso: 100%
```

ou

```
✅ PNBOIA: Sincronização concluída com sucesso
   Boias ativas: 12/14
   Taxa de sucesso: 86%
```

**Qualquer taxa acima de 80% é ÓTIMA** ✅

---

#### ⚠️ **POSSÍVEL PROBLEMA - Muitos Erros:**

```
❌ PNBOIA: Erro na sincronização: Failed to fetch
```

ou

```
⚠️ PNBOIA: Taxa de sucesso baixa: 3/14 (21%)
```

**Taxa abaixo de 50% requer investigação** 🔍

---

## 🔬 VERIFICAÇÃO DETALHADA

### **Opção 1: Ver Logs Completos no Backend**

Cole isso no console:

```javascript
// Copiar suas credenciais primeiro
const projectId = 'SEU_PROJECT_ID'; // Pegar de /utils/supabase/info.tsx
const anonKey = 'SUA_ANON_KEY';     // Pegar de /utils/supabase/info.tsx

// Sincronizar e ver logs detalhados
fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${anonKey}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log('═══════════════════════════════════════');
  console.log('📊 RESUMO DA SINCRONIZAÇÃO');
  console.log('═══════════════════════════════════════');
  console.log(`Total: ${data.summary.total} boias`);
  console.log(`Sucesso: ${data.summary.success} ✅`);
  console.log(`Falhas: ${data.summary.failed} ❌`);
  console.log(`Taxa: ${data.summary.successRate}`);
  console.log('');
  console.log('📋 DETALHES POR BOIA:');
  console.log('═══════════════════════════════════════');
  
  data.results.forEach((result, i) => {
    if (result.success) {
      const method = result.data.method || 'unknown';
      const height = result.data.waveHeight?.toFixed(2) || '?';
      
      // Emojis baseados na fonte
      const emoji = 
        method === 'api' ? '✅ API' : 
        method === 'scraping' ? '⚡ HTML' : 
        method === 'mock' ? '⚠️ MOCK' : '❓';
      
      console.log(`${i+1}. ${result.buoyId}`);
      console.log(`   Fonte: ${emoji}`);
      console.log(`   Hs: ${height}m | Tp: ${result.data.wavePeriod}s`);
      console.log(`   Atualizado: ${new Date(result.data.timestamp).toLocaleString('pt-BR')}`);
      console.log('');
    } else {
      console.log(`${i+1}. ${result.buoyId} - ❌ ERRO: ${result.error}`);
      console.log('');
    }
  });
  
  // Estatísticas por fonte
  const byMethod = {};
  data.results.forEach(r => {
    if (r.success) {
      const m = r.data.method || 'unknown';
      byMethod[m] = (byMethod[m] || 0) + 1;
    }
  });
  
  console.log('═══════════════════════════════════════');
  console.log('📈 ESTATÍSTICAS POR FONTE:');
  console.log('═══════════════════════════════════════');
  console.log(`API GOOS: ${byMethod.api || 0} boias ✅`);
  console.log(`Scraping HTML: ${byMethod.scraping || 0} boias ⚡`);
  console.log(`Mock (fallback): ${byMethod.mock || 0} boias ⚠️`);
  console.log('');
  
  // Interpretação
  const realData = (byMethod.api || 0) + (byMethod.scraping || 0);
  const total = data.summary.success;
  const realPercentage = Math.round((realData / total) * 100);
  
  console.log('═══════════════════════════════════════');
  console.log('🎯 INTERPRETAÇÃO:');
  console.log('═══════════════════════════════════════');
  
  if (realPercentage >= 90) {
    console.log('✅ EXCELENTE! ' + realPercentage + '% dados reais');
    console.log('   Sistema funcionando perfeitamente!');
  } else if (realPercentage >= 70) {
    console.log('✅ BOM! ' + realPercentage + '% dados reais');
    console.log('   Algumas boias podem estar offline temporariamente.');
  } else if (realPercentage >= 50) {
    console.log('⚠️ ACEITÁVEL. ' + realPercentage + '% dados reais');
    console.log('   Investigar se API GOOS ou site estão instáveis.');
  } else {
    console.log('❌ PROBLEMA! Apenas ' + realPercentage + '% dados reais');
    console.log('   Verificar conectividade e status das fontes.');
  }
  console.log('═══════════════════════════════════════');
})
.catch(error => {
  console.error('❌ ERRO ao sincronizar:', error);
  console.log('');
  console.log('Possíveis causas:');
  console.log('1. projectId ou anonKey incorretos');
  console.log('2. Backend não está rodando');
  console.log('3. Problema de CORS ou rede');
});
```

---

### **Opção 2: Verificar Boia Específica**

Cole isso no console:

```javascript
const projectId = 'SEU_PROJECT_ID';
const anonKey = 'SUA_ANON_KEY';

// Verificar boia de Florianópolis
fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/pnboia-florianopolis`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${anonKey}`,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => {
  console.log('🌊 BOIA DE FLORIANÓPOLIS');
  console.log('═══════════════════════════════════════');
  
  if (data.latestReading) {
    const r = data.latestReading;
    const idade = Math.round((Date.now() - new Date(r.timestamp)) / (1000 * 60));
    
    console.log(`Altura (Hs): ${r.waveHeight}m`);
    console.log(`Período (Tp): ${r.wavePeriod}s`);
    console.log(`Direção: ${r.waveDirection}°`);
    console.log(`Vento: ${r.windSpeed} km/h de ${r.windDirection}°`);
    console.log(`Temp. água: ${r.waterTemp}°C`);
    console.log(`Última atualização: ${idade} minutos atrás`);
    console.log('');
    
    if (idade < 360) {
      console.log('✅ Dados RECENTES (< 6 horas)');
    } else {
      console.log('⚠️ Dados ANTIGOS (> 6 horas) - boia pode estar offline');
    }
    
    console.log('');
    console.log(`📊 Histórico 24h: ${data.last24h?.length || 0} leituras`);
  } else {
    console.log('❌ Nenhum dado disponível para esta boia');
  }
})
.catch(error => {
  console.error('❌ Erro:', error);
});
```

---

## 🎯 TESTE NO PICO (Bias Correction)

### **Passo 1: Acessar um Pico Próximo a uma Boia**

Picos de Florianópolis (próximos à boia PNBOIA-Florianópolis):

- Joaquina
- Praia Mole
- Barra da Lagoa
- Santinho
- Campeche

---

### **Passo 2: Procurar no Console**

Ao abrir detalhes de um pico, procure por:

#### ✅ **COM BIAS CORRECTION (Dados Reais):**

```
🌊 PNBOIA BIAS CORRECTION ATIVO
   Boia: pnboia-florianopolis
   Distância: 12.5 km
   Fator de correção: 0.85
   Open-Meteo: 1.2m → Corrigido: 1.02m
```

ou

```
✅ Aplicando bias correction da boia pnboia-florianopolis
   Dados coletados há 45 minutos
   Ajuste aplicado: -15%
```

#### ⚠️ **SEM BIAS CORRECTION:**

```
⚠️ Nenhuma boia próxima encontrada (raio 300km)
   Usando apenas dados Open-Meteo
```

ou

```
⚠️ Boia disponível mas dados muito antigos (>6h)
   Bias correction desabilitado
```

---

## 📊 INTERPRETAÇÃO DOS RESULTADOS

### **Cenário 1: PERFEITO ✅**

```
Sincronização: 14/14 boias (100%)
Fontes: 14 API + 0 Scraping + 0 Mock
Bias Correction: Ativo em todos picos próximos
```

**O que significa:**
- Todas as boias respondendo
- API GOOS funcionando perfeitamente
- Previsões com máxima precisão

---

### **Cenário 2: NORMAL ✅**

```
Sincronização: 12/14 boias (86%)
Fontes: 10 API + 2 Scraping + 0 Mock
Bias Correction: Ativo em 90% dos picos
```

**O que significa:**
- API GOOS com pequena instabilidade
- Scraping HTML compensando
- Sistema funcionando bem

---

### **Cenário 3: ACEITÁVEL ⚠️**

```
Sincronização: 10/14 boias (71%)
Fontes: 7 API + 3 Scraping + 0 Mock
Bias Correction: Ativo em 70% dos picos
```

**O que significa:**
- API GOOS mais instável
- Scraping fazendo papel importante
- Alguns picos sem bias correction

---

### **Cenário 4: PROBLEMA ❌**

```
Sincronização: 5/14 boias (36%)
Fontes: 0 API + 2 Scraping + 3 Mock
Bias Correction: Ativo apenas em 30% dos picos
```

**O que significa:**
- API GOOS offline
- Site da Marinha com problemas
- Usando muitos dados mockados

**Ação necessária:**
1. Verificar conectividade
2. Checar status das fontes
3. Ver logs do backend

---

## 🔧 TROUBLESHOOTING RÁPIDO

### **Problema: "Não vejo nada no console"**

**Solução:**
1. Certifique-se que está na aba Console (F12)
2. Recarregue a página
3. Aguarde 2-3 minutos
4. Procure por "PNBOIA"

Se ainda não aparecer:
- Hook não está sendo executado
- Verificar se `/hooks/usePNBOIAAutoSync.tsx` está importado no App.tsx

---

### **Problema: "Erro 404 ou 401"**

**Solução:**
```
❌ fetch failed: 404 Not Found
   → Backend não está rodando ou URL errada

❌ fetch failed: 401 Unauthorized  
   → anonKey incorreta ou expirada
```

Verificar:
1. `/utils/supabase/info.tsx` tem projectId e anonKey corretos
2. Backend `/supabase/functions/server/index.tsx` está deployado

---

### **Problema: "Taxa de sucesso 0%"**

**Solução:**
```
❌ Sincronização: 0/14 boias (0%)
```

Causas possíveis:
1. **API GOOS offline** - Checar: `http://goosbrasil.org:8080/pnboia`
2. **Site da Marinha offline** - Checar: `https://www.marinha.mil.br/chm/dados-do-goos-brasil/pnboia`
3. **Scraper quebrado** - HTML do site mudou
4. **Timeout muito curto** - Aumentar timeout no código

---

### **Problema: "Muito mock (>50%)"**

**Solução:**
```
⚠️ Fontes: 0 API + 0 Scraping + 14 Mock
```

Verificar:
1. Ainda tem `?useMock=true` na URL? → Remover
2. API e Site estão ambos offline? → Aguardar ou ajustar scraper
3. Firewall bloqueando requests? → Verificar CORS

---

## 📸 EXEMPLO DE TESTE COMPLETO

### **Console do Navegador:**

```
[App carregou]

🌊 PNBOIA: Iniciando sincronização automática...
🔍 PNBOIA: Sincronizando em https://xxx.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all

[2-3 minutos depois]

✅ PNBOIA: Sincronização concluída com sucesso
   Boias ativas: 13/14
   Taxa de sucesso: 93%

[Você clica em "Joaquina"]

🌊 Carregando previsão para Joaquina...
✅ Boia próxima encontrada: pnboia-florianopolis (18.2 km)
🌊 PNBOIA BIAS CORRECTION ATIVO
   Open-Meteo prevê: 1.35m
   Boia mediu: 1.15m
   Fator de correção: 0.85
   ✅ Previsão corrigida: 1.15m

[No console após colar o script de verificação]

═══════════════════════════════════════
📊 RESUMO DA SINCRONIZAÇÃO
═══════════════════════════════════════
Total: 14 boias
Sucesso: 13 ✅
Falhas: 1 ❌
Taxa: 93%

📋 DETALHES POR BOIA:
═══════════════════════════════════════
1. pnboia-florianopolis
   Fonte: ✅ API
   Hs: 1.15m | Tp: 8.2s
   Atualizado: 07/11/2025 14:30:00

2. pnboia-santos
   Fonte: ✅ API
   Hs: 1.28m | Tp: 7.5s
   Atualizado: 07/11/2025 14:25:00

3. pnboia-rio-grande
   Fonte: ⚡ HTML
   Hs: 1.85m | Tp: 9.8s
   Atualizado: 07/11/2025 14:20:00

... (mais boias)

═══════════════════════════════════════
📈 ESTATÍSTICAS POR FONTE:
═══════════════════════════════════════
API GOOS: 11 boias ✅
Scraping HTML: 2 boias ⚡
Mock (fallback): 0 boias ⚠️

═══════════════════════════════════════
🎯 INTERPRETAÇÃO:
═══════════════════════════════════════
✅ EXCELENTE! 100% dados reais
   Sistema funcionando perfeitamente!
═══════════════════════════════════════
```

**ISSO É PERFEITO!** ✅

---

## ✅ CHECKLIST FINAL

Marque conforme testa:

- [ ] Console mostra sincronização iniciando
- [ ] Após 2-3 min: Sincronização concluída
- [ ] Taxa de sucesso >80%
- [ ] Maioria das boias com fonte "API" ou "Scraping"
- [ ] Poucos ou zero com fonte "Mock"
- [ ] Ao acessar pico próximo: Bias correction ativo
- [ ] Console mostra correção sendo aplicada
- [ ] Previsão parece realista (comparar com outros sites)

Se **todos os itens** estão marcados: **Sistema 100% funcional!** 🎉

---

## 🆘 PRECISA DE AJUDA?

1. **Copie TODO o console** (Ctrl+A, Ctrl+C)
2. **Cole em um arquivo .txt**
3. **Compartilhe os logs**
4. Inclua também resultado do script de verificação

---

**Criado em:** 07/11/2025  
**Versão:** 1.0  
**Status:** ✅ Dados reais ativados
