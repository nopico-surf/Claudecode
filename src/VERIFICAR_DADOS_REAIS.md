# 🔍 COMO VERIFICAR SE ESTÁ USANDO DADOS REAIS

## 🚀 TESTE RÁPIDO (INSTANTÂNEO ⚡)

### **Método 1: Ver Logs Automáticos**

1. Abra o site
2. Pressione **F12** (Console)
3. Recarregue a página (F5)
4. ⚡ **CARREGA INSTANTANEAMENTE** - Backend sincroniza sozinho em background!

**O que procurar:**

```
✅ SUCESSO - Carregamento INSTANTÂNEO:

🌊 PNBOIA: Sistema de monitoramento inicializado
ℹ️ Backend sincroniza automaticamente - Frontend lê instantaneamente
✅ PNBOIA: 12/14 boias com dados disponíveis
```

```
❌ PROBLEMA - Não está funcionando:

❌ PNBOIA: Erro na sincronização: Failed to fetch
```

---

### **Método 2: Script de Teste Completo**

1. Abra o Console (F12)
2. Copie TODO o código de: `/docs/TEST_DADOS_REAIS_CONSOLE.js`
3. Cole no console e pressione ENTER
4. Veja o relatório completo

**Você verá:**
- ✅ Taxa de sucesso por fonte (API, Scraping, Mock)
- 📊 Estatísticas detalhadas de cada boia
- 🎯 Interpretação automática dos resultados
- 📋 Lista de todas as boias com idade dos dados

---

### **Método 3: Teste em um Pico**

1. Acesse um pico próximo a uma boia (ex: **Joaquina** em Florianópolis)
2. Abra o Console (F12)
3. Procure por: `🌊 PNBOIA BIAS CORRECTION ATIVO`

**Se ver isso:**

```
✅ BIAS CORRECTION FUNCIONANDO:

🌊 PNBOIA BIAS CORRECTION ATIVO
   Boia: pnboia-florianopolis
   Distância: 18.2 km
   Fator de correção: 0.85
   Open-Meteo: 1.35m → Corrigido: 1.15m
```

**Sistema está usando dados REAIS!** ✅

---

## 📊 INTERPRETAÇÃO DOS RESULTADOS

### ✅ **EXCELENTE (>90% dados reais)**

```
API GOOS: 12 boias ✅
Scraping: 2 boias ⚡
Mock: 0 boias
```

**Sistema perfeito!** 🎉

---

### ✅ **BOM (70-90% dados reais)**

```
API GOOS: 9 boias ✅
Scraping: 3 boias ⚡
Mock: 0 boias
```

**Sistema funcionando bem!** Algumas boias podem estar offline temporariamente.

---

### ⚠️ **ACEITÁVEL (50-70% dados reais)**

```
API GOOS: 7 boias ✅
Scraping: 3 boias ⚡
Mock: 2 boias ⚠️
```

**Investigar.** API GOOS ou site podem estar instáveis.

---

### ❌ **PROBLEMA (<50% dados reais)**

```
API GOOS: 0 boias
Scraping: 2 boias ⚡
Mock: 12 boias ⚠️
```

**Ação necessária!** Verificar logs e conectividade.

---

## 🎯 PICOS PARA TESTAR BIAS CORRECTION

### **Florianópolis (Boia PNBOIA-Florianópolis)**

- ✅ Joaquina
- ✅ Praia Mole
- ✅ Barra da Lagoa
- ✅ Santinho
- ✅ Campeche

### **Santos (Boia PNBOIA-Santos)**

- ✅ Praia Grande
- ✅ Guarujá - Pitangueiras
- ✅ Santos - José Menino

### **Rio Grande do Sul (Boia PNBOIA-Rio Grande)**

- ✅ Cassino
- ✅ Molhes da Barra
- ✅ Torres

---

## 🔧 TROUBLESHOOTING RÁPIDO

### **"Não vejo nada no console"**

✅ Solução:
1. Certifique-se que está na aba **Console** (não Elements ou Network)
2. Recarregue a página (F5)
3. Aguarde 2-3 minutos
4. Scroll até o topo do console

---

### **"Erro 404 ou 401"**

✅ Solução:
1. Backend não está rodando **OU**
2. Credenciais incorretas em `/utils/supabase/info.tsx`

---

### **"Taxa de sucesso 0%"**

✅ Solução:
1. Verificar se API GOOS está online: http://goosbrasil.org:8080/pnboia
2. Verificar se site da Marinha está online: https://www.marinha.mil.br/chm/dados-do-goos-brasil/pnboia
3. Aguardar alguns minutos e tentar novamente

---

### **"Muito mock (>50%)"**

✅ Solução:
1. Verificar se ainda tem `?useMock=true` em `/hooks/usePNBOIAAutoSync.tsx` linha 97
2. Se sim: **REMOVER** `?useMock=true`
3. Recarregar página

---

## 📚 DOCUMENTAÇÃO COMPLETA

Para mais detalhes, consulte:

- 📘 **Guia Completo:** `/docs/COMO_VERIFICAR_DADOS_REAIS.md`
- 📗 **Script de Teste:** `/docs/TEST_DADOS_REAIS_CONSOLE.js`
- 📙 **Implementação:** `/docs/PNBOIA_IMPLEMENTACAO_COMPLETA.md`
- 📕 **Dados Reais:** `/docs/PNBOIA_DADOS_REAIS.md`

---

## ✅ CHECKLIST

Marque após testar:

- [ ] Console mostra sincronização automática
- [ ] Taxa de sucesso >80%
- [ ] Maioria das boias com fonte "API" ou "Scraping"
- [ ] Poucos ou zero com fonte "Mock"
- [ ] Bias correction ativo em picos próximos
- [ ] Previsões parecem realistas

**Se todos marcados:** Sistema 100% funcional! 🎉

---

**Status Atual:** ✅ Dados reais ATIVADOS  
**Última Atualização:** 07/11/2025  
**Versão:** 2.1.0
