/**
 * 🧹 LIMPEZA DE CACHE CORRUPTO DAS BOIAS PNBOIA
 * 
 * PROBLEMA:
 * - Dados REAIS das boias estão marcados como isMockData: true
 * - Isso faz o bias correction REJEITAR os dados
 * - Observações ficam sem dados de boia (N/A)
 * 
 * SOLUÇÃO:
 * - Limpar TODOS os dados de boias no cache KV
 * - Forçar nova coleta com isMockData: false garantido
 * 
 * COPIE E COLE NO CONSOLE DO NAVEGADOR (F12)
 */

(async function limparCacheBoias() {
  console.log('🧹 ════════════════════════════════════════');
  console.log('🧹 LIMPEZA DE CACHE DAS BOIAS PNBOIA');
  console.log('🧹 ════════════════════════════════════════\n');
  
  try {
    // Importar info do Supabase
    const { projectId, publicAnonKey } = await import('./utils/supabase/info.tsx');
    
    const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b`;
    
    // 1️⃣ LISTAR TODAS AS BOIAS
    const boias = [
      'pnboia-rio-grande',
      'pnboia-florianopolis',
      'pnboia-santos',
      'pnboia-vitoria',
      'pnboia-arraial-do-cabo',
      'pnboia-cabo-frio',
      'pnboia-ilheus',
      'pnboia-recife',
      'pnboia-natal',
      'pnboia-fortaleza',
      'pnboia-sao-luis'
    ];
    
    console.log(`📊 Total de boias: ${boias.length}\n`);
    
    // 2️⃣ DELETAR CACHE DE CADA BOIA
    console.log('🗑️ Deletando cache antigo...\n');
    
    let deletedCount = 0;
    
    for (const buoyId of boias) {
      const key = `pnboia_buoy_${buoyId}`;
      
      try {
        const response = await fetch(`${BASE_URL}/kv/${key}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          console.log(`  ✅ ${buoyId} - cache deletado`);
          deletedCount++;
        } else {
          console.log(`  ⚠️ ${buoyId} - não encontrado (já limpo)`);
        }
        
      } catch (error) {
        console.error(`  ❌ ${buoyId} - erro: ${error.message}`);
      }
    }
    
    console.log(`\n✅ ${deletedCount} caches deletados!\n`);
    
    // 3️⃣ FORÇAR NOVA COLETA
    console.log('🔄 Forçando nova coleta com dados limpos...\n');
    
    try {
      const syncResponse = await fetch(`${BASE_URL}/pnboia/sync-all`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (syncResponse.ok) {
        const result = await syncResponse.json();
        console.log('✅ NOVA COLETA COMPLETA!');
        console.log(`   Boias atualizadas: ${result.results?.filter((r: any) => r.success).length || 0}`);
        console.log(`   Falhas: ${result.results?.filter((r: any) => !r.success).length || 0}\n`);
        
        // Mostrar dados de Florianópolis
        const flnResult = result.results?.find((r: any) => r.buoyId === 'pnboia-florianopolis');
        if (flnResult) {
          console.log('📊 FLORIANÓPOLIS (EXEMPLO):');
          console.log(`   Wave Height: ${flnResult.reading?.waveHeight}m`);
          console.log(`   isMockData: ${flnResult.reading?.isMockData}`);
          console.log(`   dataSource: ${flnResult.reading?.dataSource}\n`);
        }
        
      } else {
        console.error(`❌ Erro ao sincronizar: ${syncResponse.status}`);
      }
      
    } catch (error) {
      console.error(`❌ Erro ao sincronizar: ${error.message}`);
    }
    
    // 4️⃣ VERIFICAR RESULTADO
    console.log('🔍 VERIFICAÇÃO FINAL:\n');
    console.log('Agora tente adicionar UMA NOVA OBSERVAÇÃO no admin.');
    console.log('Os dados de boia DEVEM aparecer corretamente!\n');
    
    console.log('📋 O QUE ESPERAR:');
    console.log('   🌊 BOIA PNBOIA: 1.40m (ou valor real)');
    console.log('   🆔 BOIA ID: Florianópolis\n');
    
    console.log('🧹 ════════════════════════════════════════');
    console.log('🧹 LIMPEZA COMPLETA!');
    console.log('🧹 ════════════════════════════════════════');
    
  } catch (error) {
    console.error('❌ ERRO NA LIMPEZA:', error);
    console.error('\n💡 SOLUÇÃO MANUAL:');
    console.error('   1. Vá para /admin');
    console.error('   2. Clique em "PNBOIA Dashboard"');
    console.error('   3. Clique em "Sincronizar Todas as Boias"');
  }
})();
