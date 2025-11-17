/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SCRIPT DE MIGRAÇÃO: CORRIGIR ERRO PERCENTUAL DAS OBSERVAÇÕES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Este script recalcula o campo "error" de todas as observações no banco
 * usando a fórmula CORRETA: (Real - Previsto) / Previsto × 100
 * 
 * ANTES (errado): error = (Previsto - Real) / Real × 100
 * DEPOIS (certo): error = (Real - Previsto) / Previsto × 100
 */

import * as kv from './kv_store.tsx';

export async function migrateObservations() {
  console.log('🔄 Iniciando migração de observações...');
  
  try {
    // 1. Buscar todas as observações (salvas em 'observations:all')
    const observationsData = await kv.get('observations:all');
    
    if (!observationsData) {
      console.log('ℹ️ Nenhuma observação encontrada para migrar');
      return { success: true, migratedCount: 0 };
    }
    
    const allObservations = JSON.parse(observationsData);
    
    if (!allObservations || allObservations.length === 0) {
      console.log('ℹ️ Array de observações está vazio');
      return { success: true, migratedCount: 0 };
    }
    
    console.log(`📊 Encontradas ${allObservations.length} observações para migrar`);
    
    let migratedCount = 0;
    let skippedCount = 0;
    const migrationLog: Array<{ id: string; spotName: string; oldError: number; newError: number }> = [];
    
    // 2. Recalcular erro para cada observação
    for (const obs of allObservations) {
      try {
        const previsto = obs.forecast?.height;
        const real = obs.observed?.height;
        
        if (!previsto || !real) {
          console.warn(`⚠️ Observação ${obs.id} sem dados de forecast/observed, pulando...`);
          skippedCount++;
          continue;
        }
        
        // ✅ CALCULAR COM FÓRMULA CORRETA
        const newError = ((real - previsto) / previsto) * 100;
        const newErrorAbsolute = real - previsto;
        
        const oldError = obs.error || 0;
        
        // Atualizar observação
        obs.error = parseFloat(newError.toFixed(2));
        obs.errorAbsolute = parseFloat(newErrorAbsolute.toFixed(2));
        
        // Não precisa salvar individualmente - vamos salvar o array completo no final
        
        migrationLog.push({
          id: obs.id,
          spotName: obs.spotName,
          oldError: parseFloat(oldError.toFixed(2)),
          newError: parseFloat(newError.toFixed(2))
        });
        
        migratedCount++;
        
        console.log(
          `✅ ${obs.spotName}: Previsto ${previsto.toFixed(2)}m → Real ${real.toFixed(2)}m | ` +
          `Erro: ${oldError.toFixed(0)}% → ${newError.toFixed(0)}%`
        );
        
      } catch (error) {
        console.error(`❌ Erro ao migrar observação ${obs.id}:`, error);
        skippedCount++;
      }
    }
    
    // 3. Salvar array atualizado de volta no banco
    await kv.set('observations:all', JSON.stringify(allObservations));
    console.log('💾 Array de observações atualizado salvo no banco!');
    
    // 4. Resumo
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('✅ MIGRAÇÃO CONCLUÍDA!');
    console.log(`📊 Total de observações: ${allObservations.length}`);
    console.log(`✅ Migradas com sucesso: ${migratedCount}`);
    console.log(`⚠️ Puladas (sem dados): ${skippedCount}`);
    console.log('═══════════════════════════════════════════════════════════\n');
    
    // 5. Mostrar exemplos de mudanças
    console.log('📋 EXEMPLOS DE MUDANÇAS:');
    migrationLog.slice(0, 5).forEach(log => {
      const direction = log.newError > log.oldError ? '↑' : '↓';
      console.log(
        `   ${log.spotName}: ${log.oldError}% → ${log.newError}% ${direction}`
      );
    });
    
    return {
      success: true,
      migratedCount,
      skippedCount,
      total: allObservations.length,
      examples: migrationLog.slice(0, 10)
    };
    
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Helper para testar a migração (dry-run) sem salvar
 */
export async function testMigration() {
  console.log('🧪 TESTE DE MIGRAÇÃO (dry-run, não salva no banco)');
  
  const observationsData = await kv.get('observations:all');
  
  if (!observationsData) {
    console.log('ℹ️ Nenhuma observação encontrada');
    return { totalCount: 0, willChangeCount: 0, examples: [] };
  }
  
  const allObservations = JSON.parse(observationsData);
  
  if (!allObservations || allObservations.length === 0) {
    console.log('ℹ️ Array de observações está vazio');
    return { totalCount: 0, willChangeCount: 0, examples: [] };
  }
  
  console.log(`📊 Analisando ${allObservations.length} observações...\n`);
  
  const changes = allObservations
    .map(obs => {
      const previsto = obs.forecast?.height;
      const real = obs.observed?.height;
      
      if (!previsto || !real) return null;
      
      const oldError = obs.error || 0;
      const newError = ((real - previsto) / previsto) * 100;
      
      return {
        spotName: obs.spotName,
        timestamp: new Date(obs.timestamp).toLocaleString('pt-BR'),
        previsto: previsto.toFixed(2),
        real: real.toFixed(2),
        oldError: oldError.toFixed(0),
        newError: newError.toFixed(0),
        willChange: Math.abs(oldError - newError) > 0.1
      };
    })
    .filter(Boolean);
  
  const willChangeCount = changes.filter(c => c.willChange).length;
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`📊 Total: ${changes.length} observações`);
  console.log(`🔄 Serão alteradas: ${willChangeCount}`);
  console.log(`✓ Já corretas: ${changes.length - willChangeCount}`);
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log('🔍 EXEMPLOS DE MUDANÇAS:\n');
  changes
    .filter(c => c.willChange)
    .slice(0, 10)
    .forEach(c => {
      console.log(`📍 ${c.spotName} (${c.timestamp})`);
      console.log(`   Previsto: ${c.previsto}m | Real: ${c.real}m`);
      console.log(`   Erro: ${c.oldError}% → ${c.newError}%`);
      console.log('');
    });
  
  return {
    totalCount: changes.length,
    willChangeCount,
    examples: changes.filter(c => c.willChange).slice(0, 10)
  };
}
