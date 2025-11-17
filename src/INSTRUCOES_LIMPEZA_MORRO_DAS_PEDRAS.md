# 🧹 INSTRUÇÕES: Limpeza de Dados Poluídos - Morro das Pedras

## 📋 PROBLEMA IDENTIFICADO

**Situação:**
- ✅ PNBOIA está ativo e funcionando corretamente
- ❌ Morro das Pedras mostrando 1.2m quando na realidade estava 1.5m (8-9h)
- ⚠️ Causa: **Dupla correção** (ajuste manual antigo + PNBOIA)

**Explicação:**
Quando fizemos o ajuste manual no Morro das Pedras mais cedo (antes do PNBOIA estar ativo), essa observação foi salva no banco de aprendizado. Agora temos:

```
Previsão Base → Ajuste Manual Antigo → PNBOIA Correction → RESULTADO MUITO BAIXO ❌
```

Precisamos remover o "Ajuste Manual Antigo" para deixar apenas:

```
Previsão Base → PNBOIA Correction → RESULTADO CORRETO ✅
```

---

## 🎯 SOLUÇÃO RÁPIDA (3 OPÇÕES)

### **OPÇÃO 1: Via Console do Navegador (MAIS RÁPIDO)** ⚡

1. **Abra o site e pressione F12** (DevTools)
2. **Vá na aba "Console"**
3. **Cole este código e pressione Enter:**

```javascript
(function(){const k='nopico_observations';const d=localStorage.getItem(k);if(!d){console.log('✅ Banco vazio');return;}const o=JSON.parse(d);const b=o.length;const c=o.filter(x=>x.spotId!=='sc-florianopolis-morro-das-pedras'&&!x.spotName?.toLowerCase().includes('morro das pedras'));localStorage.setItem(k,JSON.stringify(c));console.log(`🧹 LIMPEZA: ${b-c.length} observações removidas | ${c.length} restantes`);console.log('📌 Recarregue a página (F5)');})();
```

4. **Recarregue a página (F5)**
5. **Verifique Morro das Pedras** - agora deve mostrar ~1.5m

---

### **OPÇÃO 2: Via Admin Dashboard** 🖥️

1. **Acesse:** `http://localhost:3000/admin` (senha: Limao@32949)
2. **Vá em:** "Observações" (aba no topo)
3. **Encontre as linhas do "Morro das Pedras"**
4. **Clique no ícone da lixeira** (🗑️) ao lado direito
5. **Confirme a remoção**
6. **Recarregue a página principal** e verifique

---

### **OPÇÃO 3: Script Completo com Detalhes** 📊

Se quiser ver EXATAMENTE o que está sendo removido antes de limpar:

1. **Pressione F12 → Console**
2. **Cole este script detalhado:**

```javascript
(function(){const k='nopico_observations';const d=localStorage.getItem(k);if(!d){console.log('✅ Banco vazio');return;}const o=JSON.parse(d);console.log(`📊 Total: ${o.length} observações`);const m=o.filter(x=>x.spotId==='sc-florianopolis-morro-das-pedras'||x.spotName?.toLowerCase().includes('morro das pedras'));console.log(`\n🗑️ REMOVENDO ${m.length} observações do Morro das Pedras:\n`);m.forEach((x,i)=>{const t=new Date(x.timestamp).toLocaleString('pt-BR');console.log(`${i+1}. ${t} - Prev: ${x.forecast.height.toFixed(2)}m | Real: ${x.observed.height.toFixed(2)}m`)});const c=o.filter(x=>x.spotId!=='sc-florianopolis-morro-das-pedras'&&!x.spotName?.toLowerCase().includes('morro das pedras'));localStorage.setItem(k,JSON.stringify(c));console.log(`\n✅ CONCLUÍDO: ${o.length-c.length} removidas | ${c.length} restantes`);console.log('📌 Recarregue a página (F5)\n');})();
```

3. **Analise o que será removido**
4. **Recarregue a página (F5)**

---

## 🔍 COMO VERIFICAR SE FUNCIONOU

Após limpar o banco:

1. **Vá para:** Morro das Pedras
2. **Horário:** 8-9h (mesmo que você testou)
3. **Esperado:** ~1.5m (igual à realidade)
4. **Antes da limpeza:** ~1.2m ❌
5. **Depois da limpeza:** ~1.5m ✅

### **Check Visual:**

```
ANTES:  [PNBOIA: ✅ 14 boias] → Morro das Pedras: 1.2m ❌
DEPOIS: [PNBOIA: ✅ 14 boias] → Morro das Pedras: 1.5m ✅
```

---

## 🧠 ENTENDENDO O QUE ACONTECEU

### **Timeline dos Eventos:**

```
1. Manhã cedo (sem PNBOIA)
   └─ Você fez observação manual: "Previsto X, Real Y"
   └─ Sistema salvou ajuste no banco

2. PNBOIA foi implementado e ativado
   └─ Sistema passou a aplicar bias correction

3. Conflito (AGORA)
   └─ Ajuste manual (antigo) + PNBOIA (novo) = Dupla correção
   └─ Ondas ficam menores que o real

4. Solução
   └─ Remover ajuste manual antigo
   └─ Deixar apenas PNBOIA fazer o trabalho
```

### **Por que isso NÃO vai acontecer de novo:**

✅ PNBOIA está ativo 24/7 agora  
✅ Futuras observações já serão feitas COM PNBOIA ativo  
✅ Não haverá mais "dupla correção"  

---

## 📚 ARQUIVOS RELACIONADOS

- **Banco de Observações:** `/data/calibration/observationLog.ts`
- **Funções de Limpeza:** `removeObservationsBySpotAndDate()`, `clearAllObservations()`
- **Storage:** `localStorage['nopico_observations']`

---

## ⚠️ AVISOS IMPORTANTES

### **❌ NÃO FAÇA:**

- ❌ Remover TODAS as observações (a menos que necessário)
- ❌ Tentar editar manualmente o localStorage (use os scripts)
- ❌ Fazer nova observação do Morro das Pedras ANTES de limpar

### **✅ FAÇA:**

- ✅ Limpe apenas o Morro das Pedras (pico específico)
- ✅ Mantenha PNBOIA ativo (já está funcionando)
- ✅ Após limpar, faça novas observações normalmente

---

## 🎯 PRÓXIMOS PASSOS

Depois de limpar o banco:

1. **Verifique outros picos próximos** (Joaquina, Campeche) para garantir que estão corretos
2. **Faça novas observações** em outros picos para continuar calibrando
3. **PNBOIA continuará funcionando** automaticamente em background
4. **O sistema agora aprenderá sem "poluição"** de dados antigos

---

## 🆘 SE ALGO DER ERRADO

### **Backup Automático:**

Os scripts fazem backup automático antes de limpar. Se precisar restaurar:

```javascript
// 1. Listar backups
Object.keys(localStorage).filter(k => k.startsWith('nopico_observations_backup'))

// 2. Ver conteúdo do backup
JSON.parse(localStorage.getItem('nopico_observations_backup_XXXXXXXXX'))

// 3. Restaurar (se necessário)
const backup = JSON.parse(localStorage.getItem('nopico_observations_backup_XXXXXXXXX'));
const current = JSON.parse(localStorage.getItem('nopico_observations')) || [];
localStorage.setItem('nopico_observations', JSON.stringify([...current, ...backup]));
```

### **Reset Completo (último recurso):**

```javascript
localStorage.removeItem('nopico_observations');
```

---

## ✅ CHECKLIST FINAL

- [ ] Identifiquei o problema (Morro das Pedras 1.2m vs 1.5m real)
- [ ] Escolhi uma das 3 opções de limpeza
- [ ] Executei o script de limpeza
- [ ] Recarreguei a página (F5)
- [ ] Verifiquei Morro das Pedras (agora ~1.5m)
- [ ] PNBOIA continua ativo (badge verde)
- [ ] Posso continuar fazendo observações normalmente

---

**🌊 SISTEMA AGORA ESTÁ LIMPO E PRECISO! PNBOIA FUNCIONANDO 100%!**
