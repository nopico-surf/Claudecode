# ⚡ FAZER AGORA (30 SEGUNDOS)

---

## 🎯 **3 PASSOS:**

### **1. AGUARDE 30 SEGUNDOS** ⏳

O Edge Function precisa fazer "cold start" após o deploy.

---

### **2. ABRA O CONSOLE (F12)**

Pressione **F12** → Aba **Console**

---

### **3. COPIE E COLE ESTE CÓDIGO:**

```javascript
const B='https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b';
const T='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';

console.log('🧪 Testando servidor...');
fetch(B+'/pnboia',{headers:{Authorization:T}})
.then(r=>{console.log('✅ HTTP',r.status);return r.json()})
.then(d=>{console.log('✅ Servidor OK!');return fetch(B+'/pnboia/status',{headers:{Authorization:T}})})
.then(r=>{console.log('✅ HTTP',r.status);return r.json()})
.then(d=>{console.log('✅ Status OK! Boias:',d.active+'/'+d.total);console.log(d.active>0?'🎉 RECARREGUE A PÁGINA!':'⚠️ Aguarde 1 min')})
.catch(e=>console.error('❌',e.message));
```

---

### **4. PRESSIONE ENTER**

---

## 📊 **RESULTADO ESPERADO:**

```
🧪 Testando servidor...
✅ HTTP 200
✅ Servidor OK!
✅ HTTP 200
✅ Status OK! Boias: 0/14
⚠️ Aguarde 1 min
```

**→ Aguarde 1 minuto e recarregue a página**

ou

```
✅ Status OK! Boias: 14/14
🎉 RECARREGUE A PÁGINA!
```

**→ Recarregue agora (Ctrl+R)**

---

## ❌ **SE DER ERRO:**

```
❌ Failed to fetch
```

**→ Aguarde mais 30s e rode novamente**

---

```
❌ HTTP 404
```

**→ Edge Function crashou - me envie print**

---

**ME ENVIE PRINT DO RESULTADO!** 📸
