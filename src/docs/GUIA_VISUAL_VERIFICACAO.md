# 👁️ GUIA VISUAL - Como Verificar Dados Reais

## 🎯 INDICADOR VISUAL NO APP

### **Localização**

O indicador aparece **automaticamente** no canto inferior direito da tela:

```
┌─────────────────────────────────────────┐
│                                         │
│         Seu App de Surf                 │
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
│                              ┌────────┐ │
│                              │ 12/14  │ │ ← AQUI!
│                              │   ✅   │ │
│                              └────────┘ │
└─────────────────────────────────────────┘
```

---

## 📱 VERSÃO MINIMIZADA (Padrão)

### **Visual:**

```
┌──────────────┐
│ 🌊 12/14  ✅ │  ← Pequeno badge flutuante
└──────────────┘
```

### **Significado:**

| Elemento | Significado |
|----------|-------------|
| `🌊` | Ícone de ondas (PNBOIA) |
| `12/14` | 12 de 14 boias ativas |
| `✅` | Status OK (dados reais) |

### **Cores:**

- 🟢 **Verde** = Excelente (≥80% dados reais)
- 🟡 **Amarelo** = Aceitável (50-80% dados reais)
- 🔴 **Vermelho** = Problema (<50% ou erro)
- 🟡 **Amarelo animado** = Sincronizando...

---

## 📊 VERSÃO EXPANDIDA (Clique no badge)

### **Visual Completo:**

```
┌─────────────────────────────────────┐
│ 🌊 Boias PNBOIA              🔽     │
├─────────────────────────────────────┤
│ Status:        ✅ Dados Reais       │
│ Boias ativas:  12/14 (86%)          │
│ Última sync:   15min atrás          │
├─────────────────────────────────────┤
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░  86%           │ ← Barra de progresso
├─────────────────────────────────────┤
│ ✅ Previsões usando dados reais     │
│    das boias da Marinha do Brasil   │
├─────────────────────────────────────┤
│  [ Forçar Sync ]    [ Fechar ]      │
└─────────────────────────────────────┘
```

### **Interpretações:**

#### **✅ EXCELENTE (Verde):**

```
Status:        ✅ Dados Reais
Boias ativas:  13/14 (93%)
Última sync:   5min atrás

▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  93%

✅ Previsões usando dados reais
   das boias da Marinha do Brasil
```

**Significa:** Sistema funcionando perfeitamente! 🎉

---

#### **⚠️ PARCIAL (Amarelo):**

```
Status:        ⚠️ Parcial
Boias ativas:  9/14 (64%)
Última sync:   1h atrás

▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░  64%

⚠️ Algumas boias offline, usando 
   dados parciais
```

**Significa:** Algumas boias temporariamente offline, mas maioria funcionando.

---

#### **❌ PROBLEMA (Vermelho):**

```
Status:        ❌ Offline
Boias ativas:  3/14 (21%)
Última sync:   3h atrás

▓▓▓▓░░░░░░░░░░░░░░░  21%

❌ Maioria das boias offline,
   verificar sistema
```

**Significa:** Problema! Investigar logs.

---

#### **🔄 SINCRONIZANDO (Amarelo animado):**

```
Status:        🔄 Sincronizando...
Boias ativas:  ?/14
Última sync:   Agora

▓▓▓▓▓▓▓▓░░░░░░░░░░░  ?%

⏳ Aguarde, buscando dados...
```

**Significa:** Sistema coletando dados neste momento (2-3 minutos).

---

## 🔍 CONSOLE DO NAVEGADOR

### **Como Abrir:**

1. **Windows/Linux:** Pressione `F12`
2. **Mac:** Pressione `Cmd + Option + I`
3. Clique na aba **Console**

### **O que Procurar:**

#### **✅ SUCESSO - Dados Reais:**

```
🌊 PNBOIA: Iniciando sincronização automática...
🔍 PNBOIA: Sincronizando em https://xxx.supabase.co/...
✅ PNBOIA: Sincronização concluída com sucesso
   Boias ativas: 12/14
   Taxa de sucesso: 86%
```

**Scroll para ver mais detalhes:**

```
🌊 Iniciando scraping para boia: pnboia-florianopolis
🔍 Tentando API GOOS Brasil...
✅ Dados obtidos da API GOOS para Florianópolis
   Hs: 1.35m | Tp: 8.5s | Dir: 125°
```

---

#### **⚠️ PARCIAL - Alguns Erros:**

```
🌊 PNBOIA: Iniciando sincronização automática...
✅ PNBOIA: Sincronização concluída com sucesso
   Boias ativas: 9/14
   Taxa de sucesso: 64%

⚠️ Algumas boias não responderam
```

**Investigar quais falharam:**

```
❌ pnboia-natal: Timeout após 30s
⚠️ pnboia-recife: API offline, usando mock
✅ pnboia-florianopolis: OK (API)
✅ pnboia-santos: OK (Scraping)
```

---

#### **❌ ERRO - Não Funcionou:**

```
🌊 PNBOIA: Iniciando sincronização automática...
❌ PNBOIA: Erro na sincronização: Failed to fetch
```

**Possíveis causas:**

1. Backend não está rodando
2. Credenciais incorretas
3. Problema de rede/CORS

---

## 🧪 TESTE RÁPIDO (3 Passos)

### **Passo 1: Abrir o App**

Acesse seu site de surf.

---

### **Passo 2: Ver o Indicador**

Olhe no **canto inferior direito** da tela.

**Vê um badge com 🌊 e números?** ✅ Sistema instalado!

**Não vê nada?** ❌ Componente não foi adicionado ao App.tsx

---

### **Passo 3: Interpretar a Cor**

| Cor | Status | Ação |
|-----|--------|------|
| 🟢 Verde | Excelente | Nada! Está perfeito! |
| 🟡 Amarelo | Parcial/Sincronizando | Aguardar ou verificar logs |
| 🔴 Vermelho | Problema | Abrir console e investigar |

---

## 📍 TESTE EM UM PICO

### **Passo 1: Acessar Pico Próximo a Boia**

Picos de teste recomendados:

**Florianópolis (Boia PNBOIA-Florianópolis):**
- Joaquina
- Praia Mole  
- Santinho

**Santos (Boia PNBOIA-Santos):**
- Santos - José Menino
- Guarujá - Pitangueiras

---

### **Passo 2: Abrir Console**

Pressione `F12` → Aba **Console**

---

### **Passo 3: Procurar por Bias Correction**

#### **✅ FUNCIONANDO - Vê isso:**

```
🌊 Carregando previsão para Joaquina...
✅ Boia próxima encontrada: pnboia-florianopolis (18.2 km)
🌊 PNBOIA BIAS CORRECTION ATIVO
   Open-Meteo prevê: 1.35m
   Boia mediu: 1.15m
   Fator de correção: 0.85
   ✅ Previsão corrigida: 1.15m
```

**Sistema está usando dados REAIS!** 🎉

---

#### **⚠️ SEM BIAS CORRECTION - Vê isso:**

```
🌊 Carregando previsão para Jericoacoara...
⚠️ Nenhuma boia próxima encontrada (raio 300km)
   Usando apenas dados Open-Meteo
```

**Normal!** Nem todos os picos têm boia próxima.

---

#### **❌ PROBLEMA - Vê isso:**

```
🌊 Carregando previsão para Joaquina...
✅ Boia próxima encontrada: pnboia-florianopolis (18.2 km)
⚠️ Dados da boia muito antigos (>6h)
   Bias correction desabilitado
```

**Ação:** Sincronizar manualmente clicando em "Forçar Sync" no indicador.

---

## 🔧 AÇÕES RÁPIDAS

### **1. Forçar Sincronização**

```
1. Clicar no badge 🌊 12/14 ✅
2. Clicar em [ Forçar Sync ]
3. Aguardar 2-3 minutos
4. Verificar resultado
```

---

### **2. Ver Detalhes Completos no Console**

```
1. Abrir Console (F12)
2. Copiar todo o código de: /docs/TEST_DADOS_REAIS_CONSOLE.js
3. Colar no console
4. Pressionar ENTER
5. Ver relatório completo
```

---

### **3. Verificar Status de Boia Específica**

```javascript
// Cole no console (substitua credenciais)
const projectId = 'SEU_PROJECT_ID';
const anonKey = 'SUA_ANON_KEY';

fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/pnboia-florianopolis`, {
  method: 'GET',
  headers: { 'Authorization': `Bearer ${anonKey}` }
})
.then(r => r.json())
.then(data => {
  console.log('🌊 Boia de Florianópolis:');
  console.log(`   Hs: ${data.latestReading.waveHeight}m`);
  console.log(`   Tp: ${data.latestReading.wavePeriod}s`);
  console.log(`   Dir: ${data.latestReading.waveDirection}°`);
  console.log(`   Atualização: ${new Date(data.latestReading.timestamp).toLocaleString('pt-BR')}`);
});
```

---

## ✅ CHECKLIST DE VERIFICAÇÃO

### **Visual (No App):**

- [ ] Vejo badge 🌊 no canto inferior direito
- [ ] Badge mostra número de boias (ex: 12/14)
- [ ] Badge tem cor verde ou amarelo
- [ ] Ao clicar, abre painel expandido
- [ ] Painel mostra taxa de sucesso >80%
- [ ] Mensagem diz "dados reais"

### **Console:**

- [ ] Console mostra "PNBOIA: Iniciando sincronização"
- [ ] Após 2-3 min: "Sincronização concluída"
- [ ] Taxa de sucesso >80%
- [ ] Maioria das boias com fonte "API" ou "Scraping"
- [ ] Poucos ou zero com fonte "Mock"

### **Pico com Boia:**

- [ ] Ao acessar Joaquina (ou outro pico próximo)
- [ ] Console mostra "BIAS CORRECTION ATIVO"
- [ ] Previsão foi ajustada com base na boia
- [ ] Dados parecem realistas

### **Resultado:**

- [ ] **TODOS marcados:** Sistema 100% funcional! 🎉
- [ ] **Maioria marcados:** Sistema funcionando bem ✅
- [ ] **Poucos marcados:** Investigar problemas ⚠️

---

## 🎨 EXEMPLOS VISUAIS

### **Badge Verde (Excelente):**

```
┌──────────────┐
│ 🌊 13/14  ✅ │  ← Verde = >80% dados reais
└──────────────┘
```

### **Badge Amarelo (Parcial):**

```
┌──────────────┐
│ 🌊 9/14  ⚠️  │  ← Amarelo = 50-80% dados reais
└──────────────┘
```

### **Badge Vermelho (Problema):**

```
┌──────────────┐
│ 🌊 3/14  ❌  │  ← Vermelho = <50% ou erro
└──────────────┘
```

### **Badge Amarelo Animado (Sincronizando):**

```
┌──────────────┐
│ 🌊 ?/14  🔄  │  ← Animado = Buscando dados
└──────────────┘
```

---

## 🆘 TROUBLESHOOTING VISUAL

### **Problema: "Não vejo o badge"**

**Verificar:**

```
1. App.tsx tem import de PNBOIAStatusIndicator?
2. App.tsx tem <PNBOIAStatusIndicator /> antes do </div>?
3. Hook usePNBOIAAutoSync está sendo chamado?
4. Zoom do navegador está em 100%?
5. Scroll até o final da página (badge é fixo, mas pode estar escondido)
```

---

### **Problema: "Badge sempre vermelho"**

**Verificar no console:**

```
F12 → Console → Procurar por:

❌ PNBOIA: Erro na sincronização: [mensagem de erro]

Causas comuns:
1. Backend não está rodando
2. Credenciais incorretas
3. CORS bloqueando requests
4. API GOOS e site da Marinha offline
```

---

### **Problema: "Badge amarelo há muito tempo"**

**Verificar:**

```
1. Clicar no badge
2. Ver "Última sync"
3. Se >3 horas: Clicar em "Forçar Sync"
4. Se ainda amarelo após sync: Ver logs do console
```

---

## 📚 DOCUMENTAÇÃO RELACIONADA

- 📘 **Guia Completo:** `/docs/COMO_VERIFICAR_DADOS_REAIS.md`
- 📗 **Script de Teste:** `/docs/TEST_DADOS_REAIS_CONSOLE.js`
- 📙 **Dados Reais:** `/docs/PNBOIA_DADOS_REAIS.md`
- 📕 **Implementação:** `/docs/PNBOIA_IMPLEMENTACAO_COMPLETA.md`
- 📖 **Este Guia:** `/docs/GUIA_VISUAL_VERIFICACAO.md`

---

**Criado em:** 07/11/2025  
**Versão:** 1.0  
**Status:** ✅ Sistema visual implementado
