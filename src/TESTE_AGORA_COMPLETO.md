# 🧪 TESTE COMPLETO - DIAGNÓSTICO PNBOIA

## 🚀 **RODE ESTE TESTE AGORA**

---

## ✅ **PASSOS:**

### **1. Abra o Console**
- Pressione **F12**
- Clique na aba **Console**

### **2. Copie TODO o código abaixo:**

```javascript
const BASE_URL = 'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';

console.log('🧪 DIAGNÓSTICO COMPLETO PNBOIA');
console.log('');

fetch(`${BASE_URL}/pnboia/debug`, { headers: { 'Authorization': TOKEN } })
.then(r => r.json())
.then(d => {
  console.log('📊 DADOS NO SERVIDOR:');
  console.log(`   Última sync global: ${d.globalLastSync || 'NUNCA'}`);
  console.log(`   Boias com dados: ${d.summary.withData}/${d.summary.total}`);
  console.log('');
  d.buoys.forEach(b => {
    const status = b.hasData ? '✅' : '❌';
    console.log(`   ${status} ${b.buoyId}: ${b.lastSync}`);
  });
  console.log('');
  
  if (d.summary.withData === 0) {
    console.log('⚠️ Nenhum dado encontrado! Iniciando sincronização...');
    return fetch(`${BASE_URL}/pnboia/sync-all?useMock=false`, {
      method: 'POST',
      headers: { 'Authorization': TOKEN }
    });
  } else {
    console.log('✅ Sistema tem dados! Verificando status...');
    return fetch(`${BASE_URL}/pnboia/status`, { headers: { 'Authorization': TOKEN } });
  }
})
.then(r => r.json())
.then(d => {
  if (d.summary) {
    // Foi sincronização
    console.log(`✅ Sincronizado: ${d.summary.success}/${d.summary.total} boias`);
    d.results.forEach(r => {
      if (r.success) console.log(`  ✅ ${r.buoyId}: OK`);
      else console.log(`  ❌ ${r.buoyId}: ${r.error}`);
    });
    console.log('');
    console.log('🔄 Aguarde 5s e recarregue a página...');
  } else {
    // Foi status
    console.log(`✅ Status: ${d.active}/${d.total} boias ativas`);
    console.log('');
    console.log('🎉 SISTEMA FUNCIONANDO!');
  }
})
.catch(e => {
  console.error('❌ ERRO:', e.message);
});
```

### **3. Cole no console e pressione Enter**

### **4. Me diga o que apareceu:**

**Resultado Esperado:**
```
📊 DADOS NO SERVIDOR:
   Última sync global: 2025-01-10T...
   Boias com dados: 10/14
   
   ✅ pnboia-rio-grande: 2025-01-10T...
   ✅ pnboia-florianopolis: 2025-01-10T...
   ...
   
✅ Status: 10/14 boias ativas

🎉 SISTEMA FUNCIONANDO!
```

**OU:**
```
📊 DADOS NO SERVIDOR:
   Última sync global: NUNCA
   Boias com dados: 0/14
   
⚠️ Nenhum dado encontrado! Iniciando sincronização...
✅ Sincronizado: 10/14 boias
  ✅ pnboia-rio-grande: OK
  ...
  
🔄 Aguarde 5s e recarregue a página...
```

---

## 🐛 **SE DER ERRO:**

Me envie print mostrando:
1. O que apareceu no console
2. Qual foi a mensagem de erro

---

## ⏱️ **QUANTO TEMPO DEMORA:**

- **Se já tiver dados:** ~2 segundos
- **Se precisar sincronizar:** ~30-60 segundos

---

## 📞 **APÓS RODAR:**

Me confirme:
1. ✅ Funcionou?
2. 📊 Quantas boias ficaram ativas?
3. 🐛 Algum erro?

Vou ajustar o que for necessário! 🔧
