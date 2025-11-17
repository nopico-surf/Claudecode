# 🎯 **SOLUÇÃO OBJETIVA - www.nopico.com.br**

---

## 🔍 **SITUAÇÃO ATUAL:**

✅ **Site funcionando:** https://nopicosurf.vercel.app  
❌ **APIs PNBOIA:** 404 (pasta em local errado)  
🎯 **OBJETIVO:** www.nopico.com.br funcionando

---

## ✅ **AÇÃO TOMADA:**

Simplifiquei o `vercel.json` para focar no **site principal** (sem APIs PNBOIA por enquanto).

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [{ ... }]
}
```

---

## 🚀 **PRÓXIMOS PASSOS:**

### **1️⃣ Fazer PUSH (AGORA)**

No Figma Make:
- Clicar **"Publish to GitHub"**
- Mensagem: `fix: Simplificar vercel.json para SPA`
- Clicar **"Publish"**

---

### **2️⃣ Verificar se site está funcionando (após 1-2 min)**

```
https://nopicosurf.vercel.app
```

**Esperado:** ✅ Site carregando normalmente

---

### **3️⃣ Configurar domínio personalizado no Vercel**

**IMPORTANTE:** Isso é feito **no dashboard do Vercel**, não no código!

#### **Passo a passo:**

1. **Ir para o Vercel:**
   ```
   https://vercel.com/nopicosurf (ou seu projeto)
   ```

2. **Clicar em "Settings"**

3. **Clicar em "Domains"**

4. **Adicionar domínio:**
   ```
   www.nopico.com.br
   nopico.com.br
   ```

5. **Seguir instruções do Vercel para configurar DNS:**
   - Tipo: `CNAME`
   - Nome: `www` ou `@`
   - Valor: `cname.vercel-dns.com`

6. **Aguardar propagação DNS (2-48h)**

---

## 📊 **SOBRE AS APIs PNBOIA (SECUNDÁRIO):**

As APIs PNBOIA estão em `/src/api` no GitHub, mas o Vercel precisa que estejam em `/api` (raiz).

**Problema:**
- Figma Make coloca tudo em `/src` automaticamente
- Vercel Functions precisam estar em `/api` (raiz)
- **Não há como resolver isso dentro do Figma Make**

**Opções:**

### **Opção A: Mover manualmente no GitHub**
1. Ir no GitHub
2. Copiar arquivos de `/src/api` para `/api`
3. Deletar `/src/api`
4. Commit

### **Opção B: Usar Edge Functions do Supabase**
- Você já tem Edge Functions configuradas em `/supabase/functions/server`
- Pode usar essas ao invés das Vercel Functions
- Já está funcionando!

### **Opção C: Desativar PNBOIA temporariamente**
- Site funciona sem as APIs PNBOIA
- Pode reativar depois

---

## 🎉 **RECOMENDAÇÃO:**

1. ✅ **AGORA:** Fazer push e configurar domínio
2. ✅ **Site funcionando em www.nopico.com.br**
3. ⏳ **DEPOIS:** Decidir sobre APIs PNBOIA (A, B ou C)

---

## 📝 **RESUMO:**

```
✅ vercel.json simplificado
🚀 Fazer push agora
⏳ Aguardar 1-2 min
🌐 Configurar domínio no Vercel Dashboard
✅ www.nopico.com.br funcionando!
```

---

**🏄‍♂️ Clique "Publish to GitHub" AGORA!**

Depois me avise para eu te orientar na configuração do domínio no Vercel! 🚀
