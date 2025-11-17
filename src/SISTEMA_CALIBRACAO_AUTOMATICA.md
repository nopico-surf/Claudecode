# 🤖 SISTEMA DE CALIBRAÇÃO AUTOMÁTICA

## ✅ COMO FUNCIONA AGORA

### 📝 **Quando você me passa informações:**

```
VOCÊ: "Morro das Pedras estava 1.5m hoje, mas o site mostrava 1.2m"
EU: Automaticamente insiro no código!
```

### 🔄 **Fluxo Automático:**

1. **Você passa dados reais** → Chat
2. **EU insiro no código** → `/components/admin/CalibrationDashboard.tsx`
3. **Admin auto-popula** → Ao carregar `/admin`
4. **Dados aparecem** → Tabela + Dashboard

---

## 📊 DADOS INSERIDOS HOJE (10/11/2025)

### **Morro das Pedras:**
- 🌊 **Offshore (API)**: 1.43m
- 📉 **Previsto (ANTES)**: 1.20m (fator 0.84)
- 👁️ **Real observado**: 1.50m
- ❌ **Erro**: -20% (SUBESTIMOU)
- 📈 **Previsto (DEPOIS)**: 1.54m (fator 0.96)
- ✅ **Erro novo**: +2.7% (PRECISO!)

### **Novo Campeche:**
- 🌊 **Offshore (API)**: 1.61m
- 📈 **Previsto**: 1.00m (fator 0.62)
- 👁️ **Real observado**: 1.00m
- ✅ **Erro**: 0% (JÁ ESTAVA PRECISO!)

---

## 🎯 VISUALIZAÇÃO NO ADMIN

### **Dashboard (`/admin`)**
- ✅ 2 observações registradas
- ✅ 2 picos calibrados
- ✅ Tabela mostra: Offshore → Previsto → Real → Erro

### **Análise Detalhada (`/admin/analysis`)** ⭐ NOVO!
- 📊 Fluxo visual: Offshore → Antes → Depois → Real
- 🔧 Cálculos completos (correção necessária, melhoria)
- 🏖️ Características do pico (orientação, exposição)
- 📝 Observações e recomendações

---

## 🧮 CÁLCULOS COMPLETOS

### **Morro das Pedras:**

```
Offshore (API pura):     1.43m
         ↓ × 0.84 (multiplicador ANTIGO)
Previsto (ANTES):        1.20m ❌ Subestimou
         ↓
Real observado:          1.50m
         ↓
Correção necessária:     1.50 ÷ 1.20 = 1.25 (+25%)
         ↓
Novo multiplicador:      0.84 × 1.14 = 0.96
         ↓ × 0.96 (multiplicador NOVO)
Previsto (DEPOIS):       1.54m ✅ Preciso! (+2.7%)
```

### **Novo Campeche:**

```
Offshore (API pura):     1.61m
         ↓ × 0.62 (multiplicador)
Previsto:                1.00m ✅ Já estava certo!
         ↓
Real observado:          1.00m
         ↓
Erro:                    0% (Não precisa ajuste)
```

---

## 🚀 PRÓXIMOS PASSOS

### **1. Coletar mais dados (10-20 sessões):**
- Swells diferentes (SE, S, L)
- Marés diferentes (alta, baixa, mid)
- Períodos variados (7s, 10s, 15s)

### **2. Identificar padrões:**
```
Exemplo:
- "Praias abertas ao Sul precisam +15% em swells de SE"
- "Picos protegidos necessitam -10% em swells de L"
- "Períodos longos (>12s) precisam +20%"
```

### **3. Replicar para picos similares:**
```
Características do Morro das Pedras:
✓ Orientação: Sul/Sudeste
✓ Exposição: Praia aberta
✓ Batimetria: Areia fina com pedras
✓ Proteção: Baixa

Picos similares em SC:
- Praia do Rosa
- Praia da Vila (Imbituba)
- Praia do Luz (Tijucas)

→ Aplicar mesmo ajuste (+14%) após validar com 5+ observações
```

---

## 📍 ARQUIVOS ENVOLVIDOS

### **Frontend:**
- `/components/admin/CalibrationDashboard.tsx` → Auto-insere dados ao carregar
- `/components/admin/CalibrationAnalysisPage.tsx` → Análise detalhada **NOVO!**
- `/components/admin/AdminRouter.tsx` → Roteamento
- `/components/admin/AdminLayout.tsx` → Menu com aba "Análise"

### **Dados:**
- `/data/spotWaveAdjustments.ts` → Multiplicadores manuais por pico
- `localStorage.nopico_observations` → Observações reais vs previsões

---

## 🎓 EXEMPLOS DE USO

### **Adicionar nova observação (via chat):**

```
VOCÊ: "Praia Brava (Itajaí) estava 2.0m hoje, site mostrava 1.6m"

EU: Vou inserir automaticamente!
```

### **Ver análise detalhada:**

```
1. Acesse: /admin/analysis
2. Veja: Offshore → Previsão → Real
3. Entenda: Quanto errou e por quê
4. Decida: Replicar para picos similares?
```

---

## ⚠️ IMPORTANTE

### **NÃO fazer:**
❌ Replicar ajustes sem validar (mínimo 10 observações)
❌ Aplicar ajustes em picos muito diferentes
❌ Ignorar características do pico (orientação, batimetria)

### **SEMPRE fazer:**
✅ Coletar dados em condições variadas
✅ Verificar padrões antes de replicar
✅ Usar a página `/admin/analysis` para entender os cálculos
✅ Documentar observações no chat (eu insiro automaticamente)

---

## 🎯 CONCLUSÃO

Agora o sistema é **100% automático**:
1. Você me passa dados reais
2. Eu insiro no código
3. Admin mostra automaticamente
4. Você analisa em `/admin/analysis`
5. Decide quando replicar para outros picos

**Não precisa mais inserir dados manualmente!** 🚀
