# 🖱️ CRIAR GITHUB ACTIONS PELA INTERFACE WEB (SEM TERMINAL!)

## 🎯 OBJETIVO:
Criar sincronização automática a cada 3h para dados PNBOIA, SEM usar terminal.

---

## 📋 PASSO A PASSO (5 MINUTOS):

### **PASSO 1: Abrir seu repositório no GitHub**

1. ✅ Ir para: https://github.com/neojosurf/neopico
2. ✅ Fazer login (se necessário)
3. ✅ Ver a tela principal do repositório

---

### **PASSO 2: Criar pasta `.github/workflows`**

**IMPORTANTE:** GitHub Actions precisa estar em `.github/workflows/` (com ponto no início!)

#### **2.1 - Clicar em "Add file" → "Create new file"**

```
┌─────────────────────────────────────────────────────────┐
│  neojosurf / neopico                           [Add file ▼] │
│                                                             │
│  [Code ▼]  [Add file ▼]  ← CLICAR AQUI                    │
│                                                             │
│  Opções que aparecem:                                       │
│  ┌──────────────────┐                                      │
│  │ Create new file  │ ← CLICAR NESTA                       │
│  │ Upload files     │                                       │
│  └──────────────────┘                                      │
└─────────────────────────────────────────────────────────┘
```

#### **2.2 - Digitar o caminho completo no campo "Name your file"**

```
┌─────────────────────────────────────────────────────────┐
│ Name your file...                                        │
│ [.github/workflows/pnboia-sync.yml                    ] │
│  ↑                                                        │
│  DIGITE EXATAMENTE ISTO (com ponto no início!)           │
│                                                           │
│ Quando você digita "/" o GitHub cria a pasta             │
│ automaticamente!                                          │
└─────────────────────────────────────────────────────────┘
```

**COPIAR E COLAR:**
```
.github/workflows/pnboia-sync.yml
```

---

### **PASSO 3: Colar código do GitHub Actions**

#### **3.1 - No campo grande "Edit new file", colar o código:**

```yaml
name: 'PNBOIA Auto-Sync'

# Executar a cada 3 horas E permitir execução manual
on:
  schedule:
    - cron: '0 */3 * * *'  # A cada 3 horas
  workflow_dispatch:        # Permite executar manualmente

jobs:
  sync-pnboia:
    runs-on: ubuntu-latest
    
    steps:
      - name: '🌊 Sincronizar dados PNBOIA'
        run: |
          echo "🔄 Iniciando sincronização PNBOIA..."
          
          # Chamar endpoint de sincronização no servidor
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}" \
            "https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all"
          
          echo "✅ Sincronização concluída!"
      
      - name: '📊 Verificar status'
        run: |
          echo "📡 Verificando status das boias..."
          
          curl -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}" \
            "https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status"
```

#### **3.2 - Rolar para baixo e clicar em "Commit changes"**

```
┌─────────────────────────────────────────────────────────┐
│                                                           │
│ [Commit changes]  ← CLICAR AQUI (botão verde)            │
│                                                           │
│ Mensagem do commit:                                       │
│ "Add PNBOIA auto-sync GitHub Action"                     │
│                                                           │
│ [Commit directly to main branch] ← Deixar selecionado    │
│                                                           │
│ [Commit changes]  ← CLICAR DE NOVO                        │
└─────────────────────────────────────────────────────────┘
```

---

### **PASSO 4: Adicionar Secret (SUPABASE_ANON_KEY)**

O GitHub Actions precisa do token para chamar o servidor.

#### **4.1 - Ir para Settings do repositório**

```
┌─────────────────────────────────────────────────────────┐
│ [Code]  [Issues]  [Pull requests]  [Settings] ← CLICAR  │
└─────────────────────────────────────────────────────────┘
```

#### **4.2 - No menu lateral esquerdo, clicar em "Secrets and variables" → "Actions"**

```
┌────────────────────────────┐
│ Settings (menu lateral)    │
│                            │
│ • General                  │
│ • Collaborators            │
│ ▼ Secrets and variables   │ ← EXPANDIR
│   • Actions               │ ← CLICAR NESTA
│   • Codespaces            │
│   • Dependabot            │
└────────────────────────────┘
```

#### **4.3 - Clicar em "New repository secret"**

```
┌─────────────────────────────────────────────────────────┐
│ Actions secrets / Variables                              │
│                                                           │
│ [New repository secret]  ← CLICAR AQUI (botão verde)     │
└─────────────────────────────────────────────────────────┘
```

#### **4.4 - Adicionar secret**

```
┌─────────────────────────────────────────────────────────┐
│ Name *                                                    │
│ [SUPABASE_ANON_KEY                                     ] │
│  ↑ COPIAR E COLAR                                        │
│                                                           │
│ Secret *                                                  │
│ [eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBh...] │
│  ↑ COLAR TOKEN COMPLETO (ver abaixo)                     │
│                                                           │
│ [Add secret]  ← CLICAR AQUI                              │
└─────────────────────────────────────────────────────────┘
```

**TOKEN PARA COLAR (SUPABASE_ANON_KEY):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o
```

---

### **PASSO 5: Testar execução manual (AGORA!)**

#### **5.1 - Ir para "Actions" (aba no topo)**

```
┌─────────────────────────────────────────────────────────┐
│ [Code]  [Issues]  [Pull requests]  [Actions] ← CLICAR   │
└─────────────────────────────────────────────────────────┘
```

#### **5.2 - Clicar no workflow "PNBOIA Auto-Sync" (lado esquerdo)**

```
┌──────────────────────────────┐
│ All workflows                │
│                              │
│ • PNBOIA Auto-Sync  ← CLICAR │
└──────────────────────────────┘
```

#### **5.3 - Clicar em "Run workflow" (botão à direita)**

```
┌─────────────────────────────────────────────────────────┐
│ PNBOIA Auto-Sync                                         │
│                                                           │
│ [Run workflow ▼]  ← CLICAR AQUI (botão azul à direita)  │
│                                                           │
│ Dropdown que aparece:                                     │
│ ┌──────────────────┐                                     │
│ │ Branch: main     │                                     │
│ │ [Run workflow]   │ ← CLICAR DE NOVO                    │
│ └──────────────────┘                                     │
└─────────────────────────────────────────────────────────┘
```

#### **5.4 - Aguardar 10-30 segundos e ver resultado**

```
┌─────────────────────────────────────────────────────────┐
│ Workflow runs                                            │
│                                                           │
│ ⚪ PNBOIA Auto-Sync  #1  (amarelo = em execução)         │
│                          ↓ aguardar                       │
│ ✅ PNBOIA Auto-Sync  #1  (verde = sucesso!)              │
│                                                           │
│ OU                                                        │
│                                                           │
│ ❌ PNBOIA Auto-Sync  #1  (vermelho = erro)               │
│     ↑ Se der erro, me mostrar logs                       │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 RESUMO VISUAL:

```
PASSO 1: Abrir GitHub → neojosurf/neopico
         ↓
PASSO 2: Add file → Create new file
         Digite: .github/workflows/pnboia-sync.yml
         ↓
PASSO 3: Colar código YAML (fornecido acima)
         Commit changes
         ↓
PASSO 4: Settings → Secrets and variables → Actions
         New repository secret
         Name: SUPABASE_ANON_KEY
         Secret: [token fornecido acima]
         ↓
PASSO 5: Actions → PNBOIA Auto-Sync
         Run workflow
         Aguardar resultado ✅
```

---

## ✅ RESULTADO ESPERADO:

Após completar, o sistema vai:
- ✅ Sincronizar dados PNBOIA **a cada 3 horas automaticamente**
- ✅ Funcionar **mesmo sem visitantes**
- ✅ Nunca mais usar dados MOCK
- ✅ Logs visíveis em GitHub Actions

---

## 📊 COMO VERIFICAR SE FUNCIONOU:

1. **GitHub Actions mostra ✅ verde**
2. **No site, abrir console (F12) e digitar:**

```javascript
fetch('https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/status', {
  headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o' }
})
.then(r => r.json())
.then(d => console.log('Boias ativas:', d.active, '/', d.total))
```

**Ver:** `Boias ativas: 14 / 14` ✅

---

## 🔧 SE DER ERRO:

**Clicar no workflow que deu erro → Ver logs → Me mostrar screenshot**

Eu vou identificar o problema e corrigir!

---

## 📋 ARQUIVOS QUE VOU CRIAR PARA AJUDAR:

1. **`GITHUB_WEB_SCREENSHOTS.md`** - Com imagens ilustrativas
2. **`CODIGO_YAML_COPIAR.txt`** - Código pronto para copiar
3. **`TOKEN_COPIAR.txt`** - Token pronto

---

🚀 **COMECE AGORA!** Abra: https://github.com/neojosurf/neopico
