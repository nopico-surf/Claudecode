/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SCRIPT DE LIMPEZA - MORRO DAS PEDRAS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * PROBLEMA:
 * - Fizemos ajuste manual no Morro das Pedras ANTES do PNBOIA estar ativo
 * - Agora há DUPLA CORREÇÃO: ajuste manual antigo + PNBOIA
 * - Isso "polui" o banco de aprendizado e deixa ondas menores
 * 
 * SOLUÇÃO:
 * - Remover observações antigas do Morro das Pedras
 * - Manter apenas PNBOIA + ajustes base
 * 
 * COMO USAR:
 * 1. Abra o console (F12)
 * 2. Cole este script completo
 * 3. Pressione Enter
 * 4. Recarregue a página (F5)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function cleanMorroDasPedras() {
  console.log('\n' + '='.repeat(80));
  console.log('🧹 LIMPEZA DO BANCO DE OBSERVAÇÕES - MORRO DAS PEDRAS');
  console.log('='.repeat(80) + '\n');

  try {
    // 1. Carregar dados do localStorage
    const storageKey = 'nopico_observations';
    const rawData = localStorage.getItem(storageKey);
    
    if (!rawData) {
      console.log('ℹ️ Nenhuma observação encontrada no localStorage');
      console.log('   Banco já está limpo ou vazio\n');
      return;
    }
    
    const observations = JSON.parse(rawData);
    console.log(`📊 Total de observações no banco: ${observations.length}\n`);
    
    // 2. Encontrar observações do Morro das Pedras
    const morroObservations = observations.filter(obs => 
      obs.spotId === 'sc-florianopolis-morro-das-pedras' ||
      obs.spotName?.toLowerCase().includes('morro das pedras')
    );
    
    console.log(`🎯 Observações do Morro das Pedras encontradas: ${morroObservations.length}`);
    
    if (morroObservations.length === 0) {
      console.log('✅ Nenhuma observação do Morro das Pedras para remover\n');
      return;
    }
    
    // 3. Mostrar o que será removido
    console.log('\n📋 OBSERVAÇÕES QUE SERÃO REMOVIDAS:\n');
    morroObservations.forEach((obs, index) => {
      const timestamp = new Date(obs.timestamp).toLocaleString('pt-BR');
      console.log(`${index + 1}. ${timestamp}`);
      console.log(`   Previsão: ${obs.forecast.height.toFixed(2)}m | Observado: ${obs.observed.height.toFixed(2)}m`);
      console.log(`   Erro: ${obs.error.toFixed(1)}%`);
      console.log(`   Notas: ${obs.notes || 'N/A'}`);
      console.log('');
    });
    
    // 4. Remover observações do Morro das Pedras
    const cleanedObservations = observations.filter(obs => 
      obs.spotId !== 'sc-florianopolis-morro-das-pedras' &&
      !obs.spotName?.toLowerCase().includes('morro das pedras')
    );
    
    const removedCount = observations.length - cleanedObservations.length;
    
    // 5. Salvar banco limpo
    localStorage.setItem(storageKey, JSON.stringify(cleanedObservations));
    
    console.log('='.repeat(80));
    console.log('✅ LIMPEZA CONCLUÍDA COM SUCESSO!\n');
    console.log(`   🗑️ Observações removidas: ${removedCount}`);
    console.log(`   💾 Observações restantes: ${cleanedObservations.length}`);
    console.log('\n📌 PRÓXIMO PASSO:');
    console.log('   Recarregue a página (F5) para aplicar as mudanças\n');
    console.log('='.repeat(80) + '\n');
    
    // 6. Backup das observações removidas (opcional)
    if (removedCount > 0) {
      const backupKey = `nopico_observations_backup_${Date.now()}`;
      localStorage.setItem(backupKey, JSON.stringify(morroObservations));
      console.log(`💾 Backup salvo em: ${backupKey}`);
      console.log('   (Pode ser restaurado se necessário)\n');
    }
    
  } catch (error) {
    console.error('❌ ERRO durante limpeza:', error);
    console.error('   Stack:', error.stack);
  }
})();

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * COMANDOS ADICIONAIS (OPCIONAL)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Para ver todas as observações atuais:
 *   JSON.parse(localStorage.getItem('nopico_observations'))
 * 
 * Para limpar TUDO (reset completo):
 *   localStorage.removeItem('nopico_observations')
 * 
 * Para restaurar backup (se necessário):
 *   // Encontre a chave do backup:
 *   Object.keys(localStorage).filter(k => k.startsWith('nopico_observations_backup'))
 *   
 *   // Restaure:
 *   const backup = JSON.parse(localStorage.getItem('nopico_observations_backup_XXXXXXXXX'));
 *   const current = JSON.parse(localStorage.getItem('nopico_observations'));
 *   localStorage.setItem('nopico_observations', JSON.stringify([...current, ...backup]));
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
