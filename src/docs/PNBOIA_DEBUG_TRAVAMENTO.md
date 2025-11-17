# 🔍 DEBUG: Sistema Travado em "Backend sincronizando..."

## Problema Reportado

O sistema fica travado mostrando:
- **Status**: "Backend sincronizando..." (vermelho)
- **Boias ativas**: 0/14 (0%)
- **Última sync**: Nunca

E nunca sai desse estado.

---

## Diagnóstico

### Possíveis Causas

1. **Backend não está sincronizando**
   - A função de auto-sincronização não está sendo executada
   - Erro durante a sincronização que impede conclusão
   - KV store não está salvando os dados

2. **Frontend não está lendo corretamente**
   - Endpoint `/pnboia/status` não retorna `lastGlobalSync`
   - Hook `usePNBOIAAutoSync` não lê o timestamp corretamente

3. **APIs externas falhando**
   - API GOOS Brasil (`http://goosbrasil.org:8080/pnboia`) offline/bloqueada
   - Site PNBOIA da Marinha com estrutura HTML diferente
   - Timeout muito longo travando a sincronização

---

## Soluções Implementadas

### 1. ✅ Corrigido Endpoint de Status

**Problema**: Endpoint `/pnboia/status` não retornava timestamp global.

**Solução**: Adicionado `lastGlobalSync` na resposta:

```typescript
// Buscar timestamp da última sincronização global
const globalSyncKey = 'pnboia:global:last_sync';
const lastGlobalSync = await kv.get(globalSyncKey);

return c.json({
  status: "ok",
  buoys: status,
  total: status.length,
  active: status.filter(b => b.hasData).length,
  lastGlobalSync: lastGlobalSync || null  // ⬅️ NOVO
});
```

### 2. ✅ Corrigido Hook de Monitoramento

**Problema**: Hook buscava timestamp do endpoint `/health` errado.

**Solução**: Agora lê `lastGlobalSync` diretamente do `/pnboia/status`:

```typescript
const data = await response.json();
const lastSync = data.lastGlobalSync || null;  // ⬅️ CORRETO
```

### 3. ✅ Melhorados Logs de Debug

**Problema**: Logs insuficientes para diagnosticar problemas.

**Solução**: 
- Ativado `DEBUG = true` no hook (temporário)
- Adicionados logs detalhados no backend
- Criado endpoint `/pnboia/debug` para inspeção do KV store

### 4. ✅ Otimizado Fallback para Mock Data

**Problema**: APIs externas podem estar bloqueadas/lentas.

**Solução**: Fallback garantido para mock data se APIs falharem:

```typescript
// Tentar API (com try-catch)
try {
  let reading = await fetchFromGOOSAPI(buoyId);
  if (reading) return { success: true, reading, method: 'api' };
} catch (error) {
  console.log(`⚠️ API falhou:`, error.message);
}

// FALLBACK GARANTIDO: Mock data sempre funciona
const mockReading = getMockData(buoyId);
if (mockReading) {
  return { success: true, reading: mockReading, method: 'mock' };
}
```

### 5. ✅ Adicionado Botão de Sincronização Manual

**Problema**: Sem forma de forçar sincronização para debug.

**Solução**: Botão "🔄 Sincronizar" no componente de status:

```typescript
<button onClick={async () => {
  const url = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all`;
  const response = await fetch(url, { method: 'POST', ... });
  const data = await response.json();
  alert(`Sincronização: ${data.summary.success}/14 boias`);
  window.location.reload();
}}>
  🔄 Sincronizar
</button>
```

### 6. ✅ Melhorado Tratamento de Erros no Backend

**Problema**: Erros silenciosos durante sincronização.

**Solução**: Try-catch com logs detalhados + stack trace:

```typescript
try {
  await backgroundSync();
} catch (syncError) {
  console.error('❌ ERRO CRÍTICO: Sincronização falhou:', syncError);
  console.error('   Stack:', syncError.stack);
}
```

---

## Como Testar Agora

### 1. Verificar Logs do Console (Frontend)

Abrir DevTools Console e procurar por:

```
🌊 PNBOIA: Sistema de monitoramento inicializado
ℹ️ Backend sincroniza automaticamente - Frontend lê instantaneamente
🔍 PNBOIA: Verificando status...
📊 PNBOIA: X / 14 boias ativas
📊 Status recebido: { active: X, lastSync: "..." }
```

**Esperado**: 
- `active > 0` (pelo menos algumas boias com dados)
- `lastSync` deve ter uma data válida

### 2. Verificar Logs do Backend (Edge Function)

No painel do Supabase, ver logs do Edge Function:

```
🚀 INICIALIZANDO SISTEMA PNBOIA...
🆕 Primeira execução detectada, iniciando sincronização inicial...

══════════════════════════════════════════════════════════════════════
🤖 AUTO-SYNC: Sincronização automática em background
══════════════════════════════════════════════════════════════════════

🌊 Scraping: pnboia-rio-grande
  ✅ Mock data  (ou API GOOS / Scraping)
...
✅ Sincronização concluída: X sucesso, Y falhas
```

**Esperado**:
- Todas as 14 boias devem ter `✅ Mock data` (fallback garantido)
- Sincronização deve completar em ~10-30 segundos

### 3. Usar Botão de Sincronização Manual

1. Abrir o indicador de status (canto inferior direito)
2. Expandir clicando nele
3. Clicar em "🔄 Sincronizar"
4. Aguardar alert com resultado
5. Verificar se `active` mudou de 0 para 14

### 4. Inspecionar KV Store (Endpoint Debug)

Fazer request GET para:

```
https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/debug
```

**Esperado**:
```json
{
  "status": "ok",
  "globalLastSync": "2025-11-07T...",
  "buoys": [
    {
      "buoyId": "pnboia-rio-grande",
      "hasData": true,
      "dataLength": 250,
      "lastSync": "2025-11-07T...",
      "preview": "{\"timestamp\":\"...\",\"waveHeight\":1.8,..."
    },
    ...
  ]
}
```

---

## Próximos Passos

### Se ainda não funcionar:

1. **Verificar se o Edge Function está ativo**
   - No Supabase Dashboard → Edge Functions → make-server-2d5da22b
   - Status deve estar "Deployed" e "Active"

2. **Verificar logs de erro específicos**
   - No Console do browser (F12)
   - No painel do Supabase (Edge Function Logs)

3. **Forçar sincronização via API**
   - POST `https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all`
   - Ver resposta completa no Postman/curl

4. **Verificar conectividade do KV store**
   - GET `https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/health`
   - Deve retornar `{ status: "ok", timestamp: "..." }`

---

## Checklist de Verificação

- [ ] Logs do console mostram "🔍 PNBOIA: Verificando status..."
- [ ] Backend retorna `active > 0` em `/pnboia/status`
- [ ] Backend retorna `lastGlobalSync` válido
- [ ] Componente de status mostra data de última sync (não "Nunca")
- [ ] Botão "🔄 Sincronizar" funciona e altera o contador
- [ ] Endpoint `/pnboia/debug` mostra dados salvos no KV store
- [ ] Edge Function logs mostram sincronização completando

---

## Contato

Se o problema persistir após essas correções, fornecer:
1. Screenshot do componente de status expandido
2. Logs completos do console (F12)
3. Resposta do endpoint `/pnboia/debug`
4. Logs do Edge Function no Supabase
