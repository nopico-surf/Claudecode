# 🔧 SOLUÇÃO - ERRO KV RETORNANDO HTML

## 🎯 **PROBLEMA IDENTIFICADO:**

```
⚠️ KV.get('pnboia:pnboia-florianopolis:last_sync') falhou: 
Error: <!DOCTYPE html>...
```

**O que significa:** O servidor Supabase está retornando **HTML** (página de erro) ao invés de **JSON** (dados esperados).

---

## 🔍 **CAUSAS POSSÍVEIS:**

### **Causa 1: Variáveis de Ambiente Faltando** (MAIS PROVÁVEL ⭐)

O servidor Edge Function não tem as variáveis de ambiente configuradas:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**Como verificar:**
```
Supabase Dashboard → Edge Functions → server → Settings → Environment Variables
```

**Deve ter:**
```
SUPABASE_URL = https://rqgubpqniscyoojkwltn.supabase.co
SUPABASE_SERVICE_ROLE_KEY = eyJhbGc... (service role key, não anon key)
```

---

### **Causa 2: Edge Function Não Deployada**

A Edge Function pode não estar deployada ou estar com erro.

**Como verificar:**
```
Supabase Dashboard → Edge Functions → server

Status deve estar: ✅ Deployed & Active
```

---

### **Causa 3: Erro no Código do Servidor**

O servidor pode ter erro de sintaxe ou importação que impede inicialização.

**Como verificar:**
```
Supabase Dashboard → Edge Functions → server → Logs

Ver se há erros de inicialização (em vermelho)
```

---

## ✅ **SOLUÇÕES (PASSO A PASSO):**

### **SOLUÇÃO 1: Configurar Variáveis de Ambiente** ⭐

**1. Ir para Supabase Dashboard:**
```
https://supabase.com/dashboard/project/rqgubpqniscyoojkwltn/settings/functions
```

**2. Clicar em "server" (Edge Function)**

**3. Ir para aba "Settings"**

**4. Scroll até "Environment Variables"**

**5. Adicionar variáveis:**

```
Nome: SUPABASE_URL
Valor: https://rqgubpqniscyoojkwltn.supabase.co

Nome: SUPABASE_SERVICE_ROLE_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDU3NDg4NSwiZXhwIjoyMDQ2MTUwODg1fQ.HhPlDdIK3_1H3XuNRvqS9VmL7CpNGVU2vslh3MQ3Hco
```

**⚠️ IMPORTANTE:** Use **SERVICE_ROLE_KEY**, NÃO a ANON_KEY!

**6. Salvar e fazer Re-deploy:**

Após salvar, a Edge Function deve ser re-deployada automaticamente.

---

### **SOLUÇÃO 2: Re-deploy Manual da Edge Function**

Se ainda não funcionar:

**1. Ir para Edge Functions:**
```
Supabase Dashboard → Edge Functions → server
```

**2. Clicar em "Deploy"** (botão no canto superior direito)

**3. Aguardar deploy** (30-60 segundos)

**4. Testar novamente**

---

### **SOLUÇÃO 3: Verificar Logs de Erro**

**1. Ir para Logs:**
```
Supabase Dashboard → Edge Functions → server → Logs
```

**2. Procurar por erros em vermelho**

**3. Se ver:**
```
❌ ERRO CRÍTICO: Variáveis de ambiente faltando:
   • SUPABASE_URL
   • SUPABASE_SERVICE_ROLE_KEY
```

→ Voltar para Solução 1 e configurar variáveis

**4. Se ver outros erros:**

Copiar erro e investigar (pode ser problema de código).

---

## 🧪 **COMO TESTAR SE FUNCIONOU:**

### **Teste 1: Endpoint de Diagnóstico**

Abra o console do navegador (F12) e cole:

```javascript
fetch('https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/kv-diagnostic', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NzQ4ODUsImV4cCI6MjA0NjE1MDg4NX0.w3r9HCnUQNMLBdHNO6viBrMzJdkMv0BsqfpZQs77WrM'
  }
})
.then(r => r.json())
.then(data => {
  console.log('✅ RESULTADO:', data);
  data.tests.forEach(test => {
    console.log(`${test.status === 'OK' ? '✅' : '❌'} ${test.name}: ${test.status}`);
    if (test.error) console.error('   Erro:', test.error);
  });
})
.catch(e => console.error('❌ ERRO:', e));
```

**RESULTADO ESPERADO:**
```
✅ Leitura KV (direto): OK
✅ Leitura KV (safeKV): OK
✅ Escrita KV: OK
```

**SE DER ERRO:**
```
❌ Leitura KV (direto): ERRO
   Erro: <!DOCTYPE html>...
```

→ Variáveis de ambiente ainda não configuradas!

---

### **Teste 2: Status PNBOIA**

```javascript
fetch('https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NzQ4ODUsImV4cCI6MjA0NjE1MDg4NX0.w3r9HCnUQNMLBdHNO6viBrMzJdkMv0BsqfpZQs77WrM'
  }
})
.then(r => r.json())
.then(data => {
  console.log('✅ Status PNBOIA:', data);
  console.log(`Total: ${data.total}, Ativas: ${data.active}, Offline: ${data.offline}`);
})
.catch(e => console.error('❌ ERRO:', e));
```

**RESULTADO ESPERADO:**
```
✅ Status PNBOIA: { status: 'ok', total: 14, active: ..., offline: ... }
```

---

## 📊 **COMPARAÇÃO: ANTES vs DEPOIS**

### **ANTES (COM ERRO):**

```
KV.get() → HTML (<!DOCTYPE html>...)
Causa: Variáveis de ambiente faltando
Status: ❌ Não funciona
```

### **DEPOIS (CORRIGIDO):**

```
KV.get() → JSON (dados válidos)
Causa: Variáveis configuradas corretamente
Status: ✅ Funciona perfeitamente
```

---

## 🎯 **CHECKLIST RÁPIDO:**

```
☐ 1. Supabase Dashboard → Edge Functions → server
☐ 2. Settings → Environment Variables
☐ 3. Adicionar SUPABASE_URL
☐ 4. Adicionar SUPABASE_SERVICE_ROLE_KEY (⚠️ SERVICE ROLE, não ANON!)
☐ 5. Salvar (Re-deploy automático)
☐ 6. Aguardar 30-60 segundos
☐ 7. Testar endpoint /kv-diagnostic
☐ 8. Ver logs: ✅ "Variáveis de ambiente configuradas corretamente"
☐ 9. Testar PNBOIA: /pnboia/status
☐ 10. ✅ FUNCIONANDO!
```

---

## 📞 **SE AINDA NÃO FUNCIONAR:**

### **Verificar Logs do Servidor:**

```
Supabase Dashboard → Edge Functions → server → Logs
```

Procurar por:

**1. Mensagem de sucesso:**
```
✅ Variáveis de ambiente configuradas corretamente
   SUPABASE_URL: https://rqgubpqniscyoojkwltn.supabase.co
   SUPABASE_SERVICE_ROLE_KEY: eyJhbGciOiJIUzI1NiI...
```

**2. Mensagem de erro:**
```
❌ ERRO CRÍTICO: Variáveis de ambiente faltando:
   • SUPABASE_URL
   • SUPABASE_SERVICE_ROLE_KEY
```

**3. Erro HTML:**
```
❌ KV.get('...') retornou HTML ao invés de JSON!
   CAUSA: Supabase retornou página de erro
   SOLUÇÃO: Verificar se SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY estão corretos
```

---

## 🔑 **VALORES CORRETOS DAS VARIÁVEIS:**

```bash
# COPIAR EXATAMENTE ESTES VALORES:

SUPABASE_URL=https://rqgubpqniscyoojkwltn.supabase.co

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDU3NDg4NSwiZXhwIjoyMDQ2MTUwODg1fQ.HhPlDdIK3_1H3XuNRvqS9VmL7CpNGVU2vslh3MQ3Hco
```

⚠️ **CUIDADO:** Não confundir com SUPABASE_ANON_KEY (essa é diferente e NÃO funciona aqui)!

---

## ✅ **RESUMO:**

```
PROBLEMA:
   KV retorna HTML ao invés de JSON

CAUSA:
   Variáveis de ambiente faltando na Edge Function

SOLUÇÃO:
   Configurar SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY
   no Supabase Dashboard → Edge Functions → server → Settings

TESTE:
   Endpoint /kv-diagnostic deve retornar todos ✅ OK

RESULTADO:
   Sistema PNBOIA funcionando perfeitamente
   Dados reais das boias (não MOCK)
```

---

**Execute o diagnóstico completo rodando o arquivo `DIAGNOSTICAR_KV_ERRO_HTML.js` no console do navegador!** 🚀
