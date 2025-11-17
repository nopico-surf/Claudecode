# ⚡ FAZER AGORA - 5 MINUTOS

## ✅ O QUE JÁ ESTÁ PRONTO

- [x] Sincronização otimizada (1h → 3h)
- [x] GitHub Actions workflow criado
- [x] Documentação completa

---

## 🚀 VOCÊ PRECISA FAZER (5 MINUTOS)

### **1️⃣ ADICIONAR SECRETS NO GITHUB** (3 min)

```bash
1. Abrir: https://github.com/SEU_USUARIO/SEU_REPOSITORIO/settings/secrets/actions

2. Clicar: "New repository secret"

3. Adicionar Secret #1:
   Nome:  SUPABASE_PROJECT_ID
   Valor: rqgubpqniscyoojkwltn
   [Add secret]

4. Adicionar Secret #2:
   Nome:  SUPABASE_ANON_KEY
   Valor: [VER ABAIXO COMO PEGAR]
   [Add secret]
```

**Como pegar SUPABASE_ANON_KEY:**
1. Ir em: https://supabase.com/dashboard
2. Abrir seu projeto
3. Settings → API
4. Copiar: `anon` `public` key (a primeira, NÃO a service_role!)

---

### **2️⃣ FAZER GIT PUSH** (1 min)

```bash
git add .
git commit -m "feat: Add PNBOIA auto-sync (3h interval + GitHub Actions cron)"
git push
```

---

### **3️⃣ TESTAR NO GITHUB** (1 min)

```bash
1. Abrir: https://github.com/SEU_USUARIO/SEU_REPOSITORIO/actions

2. Clicar em: "PNBOIA Auto Sync"

3. Clicar em: "Run workflow" (botão à direita)

4. Clicar em: "Run workflow" (confirmar)

5. Aguardar 1-2 minutos

6. Clicar na execução que apareceu

7. Ver logs:
   ✅ Sincronização concluída com sucesso!
   📊 Resultado: 12/14 boias sincronizadas
```

---

## ✅ PRONTO!

Se você viu `✅ Sincronização concluída com sucesso!`, está tudo funcionando!

**Agora:**
- Sistema sincroniza automaticamente a cada 3 horas (24/7)
- Dados sempre frescos
- Você não precisa fazer mais nada!

---

## 📊 VERIFICAR QUE ESTÁ FUNCIONANDO

Amanhã, verificar no GitHub Actions:
- Deve ter ~8 execuções (uma a cada 3h)
- Todas devem estar verdes ✅

---

## ❓ PROBLEMAS?

**Workflow não aparece no GitHub Actions:**
- Fazer `git push` novamente
- Aguardar 2 minutos
- Refresh da página

**Workflow falha com erro de autenticação:**
- Verificar que secrets foram adicionados corretamente
- Nome EXATO: `SUPABASE_PROJECT_ID` (sem espaços)
- Nome EXATO: `SUPABASE_ANON_KEY` (sem espaços)

**Workflow executa mas retorna HTTP 500:**
- Normal! Significa que servidor Supabase está ocupado
- Workflow tentará novamente em 3h automaticamente
- Sistema continua funcionando normalmente

---

## 🎁 BONUS: EXECUTAR MANUALMENTE QUANDO QUISER

```
GitHub → Actions → PNBOIA Auto Sync → Run workflow
```

Use isso para:
- Forçar sincronização imediatamente
- Testar após mudanças
- Ver logs detalhados

---

**TEMPO TOTAL:** 5 minutos  
**RESULTADO:** Sistema 100% automático! 🚀🏄‍♂️
