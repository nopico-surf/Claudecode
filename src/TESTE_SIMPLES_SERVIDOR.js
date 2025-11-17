/**
 * TESTE SUPER SIMPLES - SERVIDOR ESTÁ RESPONDENDO?
 */

const BASE = 'https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';

console.log('🧪 TESTE 1/3: Servidor está vivo?');
console.log('⏳ Aguardando 2s para cold start...\n');

setTimeout(async () => {
  
  // TESTE 1: Endpoint raiz
  console.log('📡 Testando: /pnboia (endpoint raiz)');
  try {
    const r1 = await fetch(`${BASE}/pnboia`, {
      headers: {'Authorization': `Bearer ${TOKEN}`}
    });
    
    console.log(`   HTTP ${r1.status} ${r1.statusText}`);
    
    if (r1.ok) {
      const d1 = await r1.json();
      console.log('   ✅ Servidor RESPONDENDO!');
      console.log(`   Endpoints disponíveis: ${d1.endpoints?.length || 0}`);
      console.log('');
      
      // TESTE 2: Endpoint /status
      console.log('📡 Testando: /pnboia/status');
      const r2 = await fetch(`${BASE}/pnboia/status`, {
        headers: {'Authorization': `Bearer ${TOKEN}`}
      });
      
      console.log(`   HTTP ${r2.status} ${r2.statusText}`);
      
      if (r2.ok) {
        const d2 = await r2.json();
        console.log('   ✅ Endpoint /status OK!');
        console.log(`   Boias: ${d2.active}/${d2.total}`);
        console.log(`   Sync: ${d2.lastGlobalSync || 'NUNCA'}`);
        console.log('');
        
        if (d2.active > 0) {
          console.log('🎉 TUDO FUNCIONANDO! Recarregue a página (Ctrl+R)');
        } else {
          console.log('⚠️ Endpoint OK, mas sem dados. Aguarde 1 min e recarregue.');
        }
      } else {
        const txt = await r2.text();
        console.log('   ❌ Endpoint /status falhou:');
        console.log(`   ${txt.substring(0, 200)}`);
        console.log('');
        console.log('🔧 O servidor está vivo, mas /status está quebrado.');
        console.log('   Isso pode ser erro específico no handler do /status.');
      }
      
    } else {
      console.log('   ❌ Servidor não respondeu corretamente');
      console.log('');
      console.log('🚨 Edge Function pode ter crashado ou está em cold start.');
      console.log('   Aguarde 30 segundos e rode o teste novamente.');
    }
    
  } catch (error) {
    console.error('❌ ERRO:', error.message);
    console.log('');
    console.log('🚨 Não foi possível conectar ao servidor.');
    console.log('   Possíveis causas:');
    console.log('   1. Edge Function crashou');
    console.log('   2. Supabase está offline');
    console.log('   3. Problema de rede');
  }
  
}, 2000);
