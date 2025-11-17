/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🔬 TESTE COMPARATIVO - QUAL ENDPOINT FUNCIONA?
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Este script testa endpoints DIFERENTES para descobrir qual está quebrado
 */

const BASE = 'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';

console.log('═══════════════════════════════════════════════════════════════════════════');
console.log('🔬 TESTE COMPARATIVO - ENDPOINTS PNBOIA');
console.log('═══════════════════════════════════════════════════════════════════════════');
console.log('');
console.log('⏳ Aguardando 3 segundos para cold start...\n');

setTimeout(async () => {
  
  console.log('─'.repeat(79));
  console.log('🧪 TESTE 1: Endpoint que SABEMOS que funciona (do seu print)');
  console.log('─'.repeat(79));
  console.log('');
  console.log('📡 POST /pnboia/sync-all');
  
  try {
    const r1 = await fetch(`${BASE}/pnboia/sync-all`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    
    console.log(`   HTTP ${r1.status} ${r1.statusText}`);
    
    if (r1.ok) {
      const data = await r1.json();
      console.log('   ✅ sync-all FUNCIONA!');
      console.log(`   Resposta: ${JSON.stringify(data).substring(0, 100)}...`);
    } else {
      console.log('   ❌ sync-all FALHOU (estranho, funcionava no print)');
      const txt = await r1.text();
      console.log(`   Erro: ${txt.substring(0, 100)}`);
    }
    
  } catch (error) {
    console.error('   ❌ ERRO:', error.message);
  }
  
  console.log('');
  console.log('─'.repeat(79));
  console.log('🧪 TESTE 2: Endpoint RAIZ (novo, adicionado agora)');
  console.log('─'.repeat(79));
  console.log('');
  console.log('📡 GET /pnboia');
  
  try {
    const r2 = await fetch(`${BASE}/pnboia`, {
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    
    console.log(`   HTTP ${r2.status} ${r2.statusText}`);
    
    if (r2.ok) {
      const data = await r2.json();
      console.log('   ✅ /pnboia FUNCIONA! (Deploy funcionou!)');
      console.log(`   Versão: ${data.version || 'N/A'}`);
      console.log(`   Endpoints disponíveis: ${data.endpoints?.length || 0}`);
    } else {
      console.log('   ❌ /pnboia FALHOU (Deploy ainda não chegou)');
      const txt = await r2.text();
      console.log(`   Erro: ${txt.substring(0, 100)}`);
    }
    
  } catch (error) {
    console.error('   ❌ ERRO:', error.message);
  }
  
  console.log('');
  console.log('─'.repeat(79));
  console.log('🧪 TESTE 3: Endpoint /status (o que está dando 404)');
  console.log('─'.repeat(79));
  console.log('');
  console.log('📡 GET /pnboia/status');
  
  try {
    const r3 = await fetch(`${BASE}/pnboia/status`, {
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    
    console.log(`   HTTP ${r3.status} ${r3.statusText}`);
    
    if (r3.ok) {
      const data = await r3.json();
      console.log('   ✅ /pnboia/status FUNCIONA! (Deploy funcionou!)');
      console.log(`   Boias: ${data.active}/${data.total}`);
      console.log(`   Última sync: ${data.lastGlobalSync || 'NUNCA'}`);
    } else {
      console.log('   ❌ /pnboia/status FALHOU (ainda 404)');
      const txt = await r3.text();
      console.log(`   Erro: ${txt.substring(0, 100)}`);
    }
    
  } catch (error) {
    console.error('   ❌ ERRO:', error.message);
  }
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log('📊 ANÁLISE');
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log('');
  console.log('Se /pnboia/sync-all funciona mas /pnboia e /status falham:');
  console.log('  → Deploy ainda não chegou. Aguarde 1-2 minutos e teste novamente.');
  console.log('');
  console.log('Se /pnboia funciona mas /status falha:');
  console.log('  → Problema específico no endpoint /status. Verificar código.');
  console.log('');
  console.log('Se todos funcionam:');
  console.log('  → 🎉 TUDO OK! Recarregue a página (Ctrl+R)');
  console.log('');
  console.log('Se nenhum funciona:');
  console.log('  → Edge Function crashou. Aguarde cold start (30s) e teste novamente.');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════════════');
  
}, 3000);
