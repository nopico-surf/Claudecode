# 🎯 Sistema de Calibração Inteligente - Nopico

## 📋 VISÃO GERAL

O Sistema de Calibração permite que você, surfando regularmente, ajuste as previsões de ondas de forma **iterativa e científica**, tornando o Nopico cada vez mais preciso.

---

## 🚀 COMO FUNCIONA

### **Fluxo Básico:**
```
1. Você surfa uma praia
2. Compara previsão vs realidade
3. Registra observação no Admin
4. Sistema aprende e melhora
5. Aplica conhecimento para praias similares do Brasil
```

---

## 🔐 ACESSO AO ADMIN

**URL:** `https://nopico.com.br/admin`

### **Primeira vez:**
1. Acesse `/admin`
2. Sistema está aberto (sem senha por enquanto)
3. Você verá o Dashboard de Calibração

---

## 📊 ESTRUTURA DO ADMIN

### **1. Dashboard Principal** (`/admin`)
- **Estatísticas gerais:**
  - Total de observações registradas
  - Número de picos calibrados
  - Confiança média do sistema

- **Picos mais calibrados:**
  - Ranking por número de observações
  - Status de confiança (Alta/Média/Baixa)
  - Erro médio de cada pico

- **Observações recentes:**
  - Últimas 10 observações
  - Comparação previsão vs real

### **2. Registrar Observação** (modal)
Clique em **"+ Nova Observação"**

**Campos obrigatórios:**
- 📍 **Pico:** Selecione da lista
- 🌊 **Altura Real:** Quanto tinha NA PRAIA (em metros)

**Campos opcionais:**
- ⭐ **Qualidade:** 1-5 estrelas
- 🌊 **Maré:** Baixa/Média/Alta
- 💨 **Vento:** Ex: "NE 12kt"
- ⏰ **Horário:** Quando surfou
- 📝 **Notas:** Observações importantes

**Auto-preenchimento:**
- Sistema busca previsão atual automaticamente
- Mostra offshore (altura/período/direção)
- Mostra previsão na praia
- Calcula erro automaticamente

---

## 🧪 PROCESSO DE CALIBRAÇÃO (exemplo real)

### **Dia 1 - Primeira observação:**
```
📍 Pico: Morro das Pedras
🌊 Offshore: 1.8m @ 14s SE (150°)
📊 Previsto: 1.5m
✅ Real surfado: 1.3m
📉 Erro: +15% (superestimou)
📝 Nota: "Maré alta - reef ficou fundo - perdeu energia"

✅ Observação salva! (1/8 para confiança alta)
```

### **Dia 5 - Segunda observação (direção diferente):**
```
📍 Pico: Morro das Pedras
🌊 Offshore: 2.2m @ 13s SSW (200°)
📊 Previsto: 1.4m
✅ Real surfado: 1.0m
📉 Erro: +40% (MUITO superestimou)
📝 Nota: "SW pega MUITA sombra do Campeche"

💡 Sistema identifica: SW em Morro das Pedras = bloqueio forte
```

### **Dia 15 - Revisão:**
```
📊 Morro das Pedras - Status:

✅ SE (140-160°): 8 observações → Confiança ALTA
   Erro médio: 5% ✅ BOM!

⚠️ S (160-180°): 3 observações → Confiança MÉDIA
   Erro médio: 12% (melhorando)

❌ SW (190-210°): 2 observações → Confiança BAIXA
   Erro médio: 38% (precisa mais dados)

💡 Sistema sugere aguardar mais swells SW antes de ajustar
```

---

## 📐 SISTEMA DE CONFIANÇA

### **Por número de observações:**
- ✅ **Alta:** 8+ observações
- ⚠️ **Média:** 3-7 observações
- ❌ **Baixa:** 1-2 observações
- ⚪ **Nenhuma:** 0 observações

### **Por condição:**
O sistema rastreia separadamente:
- **Por direção:** SE, S, SW, etc.
- **Por período:** 10-12s, 12-14s, etc.
- **Por maré:** Baixa, média, alta

---

## 🎯 ESTRATÉGIA RECOMENDADA

### **FASE 1: Floripa (1-2 meses)**
Calibrar 10-15 picos principais:
- Morro das Pedras
- Joaquina
- Matadeiro
- Santinho
- Moçambique
- etc.

**Meta:** 5+ observações por pico, variando direções

### **FASE 2: Padrões Master (após Fase 1)**
Sistema identifica padrões:
- "SE beach break aberto" → baseado em Joaquina
- "SE reef protegido" → baseado em Morro das Pedras
- "S enseada protegida" → baseado em Matadeiro

### **FASE 3: Expansão Brasil (gradual)**
Aplicar padrões para praias similares:
- Joaquina → Maresias (SP), Geribá (RJ)
- Morro das Pedras → Arpoador (RJ)
- Matadeiro → Camburi (Ubatuba)

---

## 💾 PERSISTÊNCIA DE DADOS

### **Atualmente:**
- ✅ Salvo no **localStorage** do navegador
- ✅ Persiste entre sessões
- ⚠️ Não sincroniza entre dispositivos

### **Futuro (próxima versão):**
- 🔄 Sincronização com Supabase
- ☁️ Backup automático na nuvem
- 📱 Acesso de qualquer dispositivo

---

## 🔧 HIERARQUIA DE AJUSTES

O sistema usa esta prioridade (do mais específico ao mais genérico):

```
1. ✅ MANUAL OVERRIDE (spotWaveAdjustments.ts)
   ↓ se não existe

2. 🤖 PADRÃO CALIBRADO (masterPatterns.ts)
   ↓ se não existe

3. 🔧 FALLBACK GENÉRICO (valores seguros)
```

**Importante:** Ajustes manuais existentes **NUNCA** são sobrescritos!

---

## 📁 ARQUIVOS DO SISTEMA

### **Dados:**
```
data/
├── calibration/
│   ├── observationLog.ts          # Banco de observações
│   └── confidenceLevels.ts        # Sistema de confiança
├── patterns/
│   └── masterPatterns.ts          # Padrões calibrados
└── spotWaveAdjustments.ts         # Ajustes manuais (mantido)
```

### **Componentes Admin:**
```
components/admin/
├── AdminLayout.tsx                # Layout do admin
├── CalibrationDashboard.tsx       # Dashboard principal
├── ObservationForm.tsx            # Form de observação
└── SpotCalibrationDetail.tsx      # Detalhe por pico
```

### **Serviços:**
```
services/calibration/
└── adjustmentResolver.ts          # Resolve hierarquia
```

---

## 🎓 DICAS IMPORTANTES

### **Para observações mais precisas:**

1. **Surf no horário da observação:**
   - Registre logo após surfar
   - Condições mudam rápido

2. **Seja honesto com a altura:**
   - Use referências (altura do peito, cabeça, etc)
   - Não exagere! :)

3. **Contexto importa:**
   - Maré tem impacto ENORME
   - Vento pode mudar tudo
   - Período faz diferença

4. **Notas detalhadas:**
   - "Reef raso em maré baixa"
   - "Sombra da ilha bloqueou SW"
   - "Período curto virou chop"

### **Condições ideais para calibrar:**
- ☀️ Boas condições de surf
- 📊 Swell definido (não vento local)
- ⏰ Manhã cedo (menos variáveis)
- 🌊 Diferentes direções ao longo do tempo

---

## 🚀 PRÓXIMOS PASSOS

### **Curto prazo (você):**
1. Acessar `/admin`
2. Registrar primeira observação
3. Continuar surfando e registrando
4. Acompanhar evolução no dashboard

### **Médio prazo (sistema):**
Quando tiver 5+ observações em Floripa:
- Sistema sugere ajustes
- Você aprova/rejeita
- Padrões são criados

### **Longo prazo (expansão):**
- Replicar padrões para Brasil
- Feedback de outros surfistas
- Machine learning automático

---

## ❓ FAQ

**Q: Perco meus ajustes manuais atuais?**
A: NÃO! Ajustes em `spotWaveAdjustments.ts` têm PRIORIDADE MÁXIMA.

**Q: Preciso calibrar todos os 223 picos?**
A: NÃO! Comece com 10-15 de Floripa. Sistema replica para similares.

**Q: E se eu errar uma observação?**
A: Por enquanto, não dá para editar (próxima versão). Mas 1 observação ruim entre várias não afeta muito.

**Q: Quantas observações preciso?**
A: Mínimo 3 para confiança média, 8+ para confiança alta.

**Q: Posso usar em outro navegador?**
A: Por enquanto não (localStorage). Próxima versão terá sincronização.

---

## 📞 SUPORTE

Dúvidas ou problemas:
- Console do navegador mostra logs
- Observações ficam em `localStorage` → `nopico_observations`

---

## 🎯 RESUMO EXECUTIVO

**Sistema permite:**
✅ Registrar observações surf vs previsão
✅ Calibrar picos gradualmente
✅ Criar padrões replicáveis
✅ Melhorar Brasil inteiro com dados de Floripa
✅ Manter ajustes manuais existentes

**Requisito:**
📝 Disciplina para registrar após surfar

**Resultado esperado:**
📈 Precisão 85-90% após 1-2 meses de calibração

---

**Bora calibrar o Brasil inteiro! 🏄‍♂️🌊🇧🇷**
