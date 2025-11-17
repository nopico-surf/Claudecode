# 🚀 SETUP GITHUB ACTIONS - PNBOIA AUTO SYNC

## ✅ O QUE FOI CRIADO

Criei um **Cron Job automático** usando GitHub Actions que:

- ✅ Sincroniza boias PNBOIA **a cada 3 horas** (24/7)
- ✅ Garante dados sempre frescos (mesmo sem usuários no site)
- ✅ Roda nos horários: **00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00 UTC**
- ✅ Resiste a falhas (tenta novamente em 3h)
- ✅ Pode ser executado manualmente quando quiser

---

## 🔧 CONFIGURAÇÃO (5 MINUTOS)

### **PASSO 1: Adicionar Secrets no GitHub**

1. **Ir para o repositório do GitHub**
   ```
   https://github.com/SEU_USUARIO/SEU_REPOSITORIO
   ```

2. **Clicar em:** `Settings` (⚙️ no topo)

3. **No menu lateral esquerdo:**
   - Clicar em `Secrets and variables`
   - Clicar em `Actions`

4. **Adicionar os seguintes secrets:**

   Clicar em **"New repository secret"** e adicionar:

   #### **Secret #1: SUPABASE_PROJECT_ID**
   ```
   Nome: SUPABASE_PROJECT_ID
   Valor: rqgubpqniscyoojkwltn
   ```
   
   #### **Secret #2: SUPABASE_ANON_KEY**
   ```
   Nome: SUPABASE_ANON_KEY
   Valor: [SUA SUPABASE_ANON_KEY]
   ```
   
   **Como encontrar sua ANON_KEY:**
   - Ir em: https://supabase.com/dashboard
   - Abrir seu projeto
   - Settings → API
   - Copiar: `anon` `public` key

   ⚠️ **IMPORTANTE:** Use a chave `anon public`, NÃO a `service_role`!

---

### **PASSO 2: Fazer Push do Workflow**

Agora você precisa fazer commit e push do arquivo que criei:

```bash
# No terminal, na pasta do projeto:

git add .github/workflows/pnboia-sync.yml
git commit -m "Add: GitHub Actions cron job for PNBOIA auto-sync (every 3h)"
git push
```

---

### **PASSO 3: Verificar que Funcionou**

1. **Ir para o repositório no GitHub**

2. **Clicar na aba `Actions`** (topo da página)

3. **Você verá:**
   ```
   ┌─────────────────────────────────────────┐
   │ Workflows                               │
   ├─────────────────────────────────────────┤
   │ 🌊 PNBOIA Auto Sync                     │
   │    Scheduled to run every 3 hours       │
   └─────────────────────────────────────────┘
   ```

4. **Para testar AGORA (sem esperar 3h):**
   - Clicar em `PNBOIA Auto Sync`
   - Clicar em `Run workflow` (botão à direita)
   - Clicar em `Run workflow` (confirmar)
   - Aguardar ~1-2 minutos
   - Ver logs em tempo real!

---

## 📊 COMO MONITORAR

### **Ver Execuções:**

1. GitHub → Actions → PNBOIA Auto Sync
2. Ver lista de todas as execuções:
   ```
   ✅ Sincronizar Boias PNBOIA - 2h ago (success)
   ✅ Sincronizar Boias PNBOIA - 5h ago (success)
   ⚠️ Sincronizar Boias PNBOIA - 8h ago (warning)
   ✅ Sincronizar Boias PNBOIA - 11h ago (success)
   ```

### **Ver Detalhes de uma Execução:**

Clicar em qualquer execução para ver:
```
🌊 Iniciando sincronização PNBOIA...
⏰ Horário: 2024-11-12 15:00:00 UTC
📥 Status HTTP: 200
📦 Resposta: {"summary":{"success":12,"total":14}}
✅ Sincronização concluída com sucesso!
📊 Resultado: 12/14 boias sincronizadas

🔍 Verificando status atual das boias...
📊 Status obtido com sucesso:
{
  "active": 12,
  "total": 14,
  "percentage": 86,
  "lastGlobalSync": "2024-11-12T15:00:23.456Z"
}

✅ Boias ativas: 12/14
🟢 Status excelente! Maioria das boias online.
```

---

## ⚙️ CONFIGURAÇÕES AVANÇADAS

### **Mudar Frequência:**

Editar arquivo `/.github/workflows/pnboia-sync.yml`:

```yaml
# A cada 3 horas (atual):
- cron: '0 */3 * * *'

# A cada 2 horas:
- cron: '0 */2 * * *'

# A cada 6 horas:
- cron: '0 */6 * * *'

# Horários específicos (ex: 6h, 12h, 18h UTC):
- cron: '0 6,12,18 * * *'
```

### **Pausar Temporariamente:**

1. GitHub → Settings → Actions
2. Encontrar "PNBOIA Auto Sync"
3. Clicar em `...` → `Disable workflow`

### **Ativar Novamente:**

1. GitHub → Actions
2. Workflows → PNBOIA Auto Sync
3. Clicar em `Enable workflow`

---

## 🎯 BENEFÍCIOS

| Antes | Depois |
|-------|--------|
| Sincronização só quando usuário visita | Sincronização 24/7 automática |
| Edge Function pode "dormir" | Edge Function sempre ativo |
| Dados podem ficar antigos de madrugada | Dados sempre frescos |
| Dependente de tráfego | Independente de tráfego |
| Surfista 6h AM: dados antigos | Surfista 6h AM: dados de 3h atrás (fresco!) |

---

## ❓ TROUBLESHOOTING

### **Workflow não aparece no GitHub:**
- Verificar que arquivo está em: `/.github/workflows/pnboia-sync.yml`
- Fazer push: `git push`
- Aguardar 1-2 minutos

### **Workflow falha com "Error: Bad credentials":**
- Verificar que secrets foram adicionados corretamente
- Nome EXATO: `SUPABASE_PROJECT_ID` e `SUPABASE_ANON_KEY`
- Sem espaços extras nos valores

### **Workflow executa mas retorna HTTP 401:**
- ANON_KEY está incorreta
- Ir em Supabase → Settings → API
- Copiar novamente a chave `anon public`

### **Workflow executa mas retorna HTTP 500:**
- Normal! Significa que banco Supabase está offline temporariamente
- Workflow continuará tentando a cada 3h
- Sistema continua funcionando (modo degradado)

---

## 📝 LOGS EXEMPLO

### **Execução com Sucesso:**
```
🌊 Iniciando sincronização PNBOIA...
⏰ Horário: 2024-11-12 18:00:00 UTC
📥 Status HTTP: 200
✅ Sincronização concluída com sucesso!
📊 Resultado: 13/14 boias sincronizadas
🔍 Verificando status atual das boias...
✅ Boias ativas: 13/14
🟢 Status excelente! Maioria das boias online.
🔄 Próxima sincronização: 21:00 UTC
```

### **Execução com Falha (Normal):**
```
🌊 Iniciando sincronização PNBOIA...
⏰ Horário: 2024-11-12 03:00:00 UTC
📥 Status HTTP: 500
⚠️ Sincronização retornou status 500
ℹ️ Isso pode acontecer se:
   - Boias PNBOIA estão offline (normal)
   - Servidor Supabase está lento
   - Timeout excedido
🔄 Próxima tentativa em 3 horas
```

---

## ✅ CHECKLIST FINAL

- [ ] Secrets adicionados no GitHub (PROJECT_ID + ANON_KEY)
- [ ] Arquivo commitado e pushed (`git push`)
- [ ] Workflow aparece em GitHub Actions
- [ ] Teste manual executado com sucesso
- [ ] Primeira execução automática agendada

---

## 🎉 PRONTO!

Seu sistema agora tem sincronização PNBOIA **100% automática e confiável**!

**Próximos passos:**
1. Configurar secrets (2 min)
2. Fazer push (30 seg)
3. Testar manualmente (1 min)
4. Relaxar! Sistema roda sozinho 24/7 🏄‍♂️🌊

---

**Dúvidas?** Verifique os logs em: GitHub → Actions → PNBOIA Auto Sync
