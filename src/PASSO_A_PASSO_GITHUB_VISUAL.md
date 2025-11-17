# 🎯 PASSO A PASSO VISUAL - GITHUB ACTIONS

## ✅ O QUE VOCÊ PRECISA FAZER (10 MINUTOS):

```
1️⃣ Fazer git push (Terminal)     → 2 minutos
2️⃣ Adicionar secrets (GitHub.com) → 5 minutos
3️⃣ Testar (GitHub.com)            → 3 minutos
```

---

## 1️⃣ FAZER GIT PUSH (TERMINAL - NÃO NO CONSOLE DO NAVEGADOR!)

### **ONDE:**
- **NO TERMINAL** (Mac/Linux) ou **GIT BASH** (Windows)
- **NÃO no Console F12 do navegador!**

### **COMANDOS:**
```bash
git add .github/workflows/pnboia-sync.yml
git commit -m "feat: Add GitHub Actions PNBOIA auto-sync"
git push
```

### **O QUE VAI APARECER:**
```
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 1.23 KiB | 1.23 MiB/s, done.
Total 4 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To github.com:SEU_USUARIO/SEU_REPO.git
   abc1234..def5678  main -> main
```

### **SE DER ERRO:**
```
# Erro: "fatal: not a git repository"
SOLUÇÃO: Você não está na pasta do projeto
         → Usar: cd caminho/para/projeto

# Erro: "fatal: The current branch has no upstream branch"
SOLUÇÃO: git push --set-upstream origin main
```

---

## 2️⃣ ADICIONAR SECRETS NO GITHUB.COM

### **PASSO 1: Ir para o GitHub**
```
1. Abrir: https://github.com/SEU_USUARIO/SEU_REPOSITORIO
2. Clicar em: "Settings" (⚙️ no menu superior)
```

### **PASSO 2: Ir em Secrets**
```
3. No menu LATERAL ESQUERDO, procurar seção "Security"
4. Clicar em: "Secrets and variables"
5. Clicar em: "Actions"
```

**VOCÊ VERÁ:**
```
┌────────────────────────────────────────────────┐
│ Actions secrets and variables                  │
├────────────────────────────────────────────────┤
│                                                │
│ Secrets  Variables  [New repository secret]   │
│                                                │
│ (Ainda vazio)                                  │
│                                                │
└────────────────────────────────────────────────┘
```

### **PASSO 3: Adicionar SECRET #1**
```
6. Clicar em botão verde: "New repository secret"
```

**PREENCHER:**
```
┌────────────────────────────────────────────────┐
│ Name *                                         │
│ ┌────────────────────────────────────────────┐ │
│ │ SUPABASE_PROJECT_ID                        │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ Secret *                                       │
│ ┌────────────────────────────────────────────┐ │
│ │ rqgubpqniscyoojkwltn                       │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│              [Add secret]                      │
└────────────────────────────────────────────────┘
```

```
7. Clicar em: "Add secret" (botão verde)
```

### **PASSO 4: Adicionar SECRET #2**
```
8. Clicar novamente em: "New repository secret"
```

**PREENCHER:**
```
┌────────────────────────────────────────────────┐
│ Name *                                         │
│ ┌────────────────────────────────────────────┐ │
│ │ SUPABASE_ANON_KEY                          │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ Secret *                                       │
│ ┌────────────────────────────────────────────┐ │
│ │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...    │ │
│ │ (copiar do arquivo /SECRETS_GITHUB.txt)    │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│              [Add secret]                      │
└────────────────────────────────────────────────┘
```

**ONDE PEGAR SUPABASE_ANON_KEY:**
- Abrir arquivo: `/SECRETS_GITHUB.txt`
- Copiar a chave COMPLETA (começa com eyJhbGciOi...)

```
9. Clicar em: "Add secret" (botão verde)
```

### **RESULTADO FINAL:**
```
┌────────────────────────────────────────────────┐
│ Actions secrets                                │
├────────────────────────────────────────────────┤
│                                                │
│ ✅ SUPABASE_PROJECT_ID     Updated 1 min ago  │
│ ✅ SUPABASE_ANON_KEY       Updated 1 min ago  │
│                                                │
└────────────────────────────────────────────────┘
```

---

## 3️⃣ TESTAR NO GITHUB

### **PASSO 1: Ir para Actions**
```
1. No menu superior, clicar em: "Actions"
```

**VOCÊ VERÁ:**
```
┌────────────────────────────────────────────────┐
│ All workflows                                  │
├────────────────────────────────────────────────┤
│                                                │
│ 🌊 PNBOIA Auto Sync                           │
│    Active                                      │
│    schedule                                    │
│                                                │
└────────────────────────────────────────────────┘
```

### **PASSO 2: Executar Manualmente**
```
2. Clicar em: "PNBOIA Auto Sync" (workflow)
3. À direita, clicar em: "Run workflow" ▼
4. Clicar em: "Run workflow" (confirmar - botão verde)
```

**AGUARDAR ~30 SEGUNDOS:**
```
┌────────────────────────────────────────────────┐
│ Workflow runs                                  │
├────────────────────────────────────────────────┤
│                                                │
│ 🟡 PNBOIA Auto Sync                           │
│    #1 • just now • Queued                     │
│                                                │
└────────────────────────────────────────────────┘
```

**Status muda para:**
```
🟡 Queued    → Aguardando...
🔵 Running   → Executando agora!
✅ Success   → Funcionou! (verde)
❌ Failed    → Erro (vermelho)
```

### **PASSO 3: Ver Logs**
```
5. Clicar no workflow que apareceu (#1)
6. Clicar em: "Sincronizar Boias PNBOIA" (job)
```

**VOCÊ VERÁ:**
```
🌊 Sincronizar todas as boias
───────────────────────────────────────────────
🌊 Iniciando sincronização PNBOIA...
⏰ Horário: 2024-11-12 20:15:00 UTC
📥 Status HTTP: 200
✅ Sincronização concluída com sucesso!
📊 Resultado: 14/14 boias sincronizadas

📊 Verificar status das boias
───────────────────────────────────────────────
🔍 Verificando status atual das boias...
✅ Boias ativas: 14/14
🟢 Status excelente! Maioria das boias online.

📝 Resumo
───────────────────────────────────────────────
🌊 RESUMO DA SINCRONIZAÇÃO PNBOIA
⏰ Concluído em: 2024-11-12 20:15:45 UTC
🔄 Próxima execução: 23:00 UTC
📅 Frequência: A cada 3 horas (8x por dia)
```

---

## ✅ SUCESSO! O QUE ACONTECE AGORA?

```
A PARTIR DE AGORA:

⏰ 00:00 UTC → GitHub dispara sincronização
⏰ 03:00 UTC → GitHub dispara sincronização
⏰ 06:00 UTC → GitHub dispara sincronização
⏰ 09:00 UTC → GitHub dispara sincronização
⏰ 12:00 UTC → GitHub dispara sincronização
⏰ 15:00 UTC → GitHub dispara sincronização
⏰ 18:00 UTC → GitHub dispara sincronização
⏰ 21:00 UTC → GitHub dispara sincronização

VOCÊ:
   → Não precisa fazer NADA
   → Sistema roda sozinho
   → Pode ver logs em: GitHub → Actions

USUÁRIOS:
   → Sempre terão dados frescos
   → Independente de quantas pessoas estejam online
```

---

## 🆘 TROUBLESHOOTING

### **Workflow não aparece em Actions:**
```
PROBLEMA: Push ainda não foi feito
SOLUÇÃO: 
   1. Terminal: git push
   2. Aguardar 1-2 minutos
   3. Refresh da página GitHub
```

### **Workflow falha com erro "Bad credentials":**
```
PROBLEMA: Secrets não foram configurados corretamente
SOLUÇÃO:
   1. Verificar que nomes estão EXATOS:
      - SUPABASE_PROJECT_ID (sem espaços)
      - SUPABASE_ANON_KEY (sem espaços)
   2. Verificar que valores estão corretos
   3. Deletar secrets e criar novamente
```

### **Workflow executa mas retorna HTTP 401:**
```
PROBLEMA: ANON_KEY incorreta
SOLUÇÃO:
   1. Abrir: https://supabase.com/dashboard
   2. Seu projeto → Settings → API
   3. Copiar "anon public" (a PRIMEIRA chave, NÃO service_role)
   4. Atualizar secret no GitHub
```

### **Workflow executa mas retorna HTTP 500:**
```
ISSO É NORMAL!
   • Significa que banco Supabase está temporariamente offline
   • Sistema continuará tentando a cada 3h
   • Seu site continua funcionando (modo degradado)
   • Não é um erro crítico
```

---

## 📋 CHECKLIST FINAL

- [ ] ✅ Arquivo criado: `/.github/workflows/pnboia-sync.yml`
- [ ] ⏳ Git push feito no TERMINAL
- [ ] ⏳ Workflow aparece em GitHub → Actions
- [ ] ⏳ Secret #1 adicionado: SUPABASE_PROJECT_ID
- [ ] ⏳ Secret #2 adicionado: SUPABASE_ANON_KEY
- [ ] ⏳ Teste manual executado
- [ ] ⏳ Logs mostraram sucesso ✅

---

## 🎉 QUANDO TUDO ESTIVER ✅:

**PARABÉNS! Seu sistema agora:**
- ✅ Sincroniza automaticamente a cada 3h
- ✅ Funciona 24/7 (independente de usuários)
- ✅ Dados sempre frescos
- ✅ Zero manutenção necessária
- ✅ Pode monitorar logs no GitHub

**VOCÊ PODE:**
- 🏄‍♂️ Relaxar e surfar
- 📊 Ver execuções em GitHub → Actions
- 🔧 Executar manualmente quando quiser
- 📅 Ajustar frequência se quiser (editar arquivo .yml)

---

**PRECISA DE AJUDA?**
- Ler: `/EXPLICACAO_VISUAL_COMPLETA.md` (explica TUDO)
- Ler: `/SECRETS_GITHUB.txt` (tem as chaves prontas)
- Ler: `/COMANDOS_GIT_COPIAR_AGORA.txt` (comandos prontos)
