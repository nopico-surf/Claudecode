// ════════════════════════════════════════════════════════════════
// 🧪 TESTE RÁPIDO: ADMIN vs SITE
// ════════════════════════════════════════════════════════════════
// 
// COPIE E COLE ESTE CÓDIGO NO CONSOLE (F12) DO ADMIN
// quando estiver na tela de "Registrar Observação" com Morro das Pedras selecionado
// ════════════════════════════════════════════════════════════════

(async function testAdminVsSite() {
  console.clear();
  console.log('%c═════════════════════════════════════════════════════════════════', 'color: blue; font-weight: bold');
  console.log('%c🧪 TESTE ADMIN vs SITE - VERIFICAÇÃO DE DADOS', 'color: blue; font-weight: bold');
  console.log('%c═════════════════════════════════════════════════════════════════\n', 'color: blue; font-weight: bold');
  
  try {
    // 1. Buscar dados do spot Morro das Pedras usando a mesma função do site
    console.log('📡 Buscando dados do Morro das Pedras...\n');
    
    const spot = {
      id: 'sc-floripa-morropedras-1',
      name: 'Morro das Pedras',
      latitude: -27.7278,
      longitude: -48.4833,
      beachOrientation: 130
    };
    
    // Importar getWaveData (pode não funcionar aqui - use o método abaixo)
    // const { getWaveData } = await import('../services/waveApi');
    // const data = await getWaveData(spot.latitude, spot.longitude, spot.beachOrientation, undefined, spot.id);
    
    // Alternativa: usar fetch direto
    const response = await fetch(`https://vxqzzikhkzdowmffwuxr.supabase.co/functions/v1/make-server-2d5da22b/wave-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cXp6aWtoa3pkb3dtZmZ3dXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyOTgwMjUsImV4cCI6MjA0Njg3NDAyNX0.xOBF6p4UgUHj5FXHAUc8Q0zFZkMbNwUd_qEH_LKbYxE'
      },
      body: JSON.stringify({
        latitude: spot.latitude,
        longitude: spot.longitude,
        beachOrientation: spot.beachOrientation,
        spotId: spot.id
      })
    });
    
    if (!response.ok) {
      console.error('❌ Erro ao buscar dados:', response.status, response.statusText);
      return;
    }
    
    const data = await response.json();
    
    console.log('%c✅ DADOS RECEBIDOS:\n', 'color: green; font-weight: bold');
    
    // 2. Mostrar estrutura dos dados
    console.log('%c📊 ESTRUTURA DOS DADOS:', 'color: blue');
    console.log('   current:', data.current ? '✅ Existe' : '❌ Não existe');
    console.log('   hourly:', data.hourly ? `✅ ${data.hourly.length} horários` : '❌ Não existe');
    console.log('   daily:', data.daily ? `✅ ${data.daily.length} dias` : '❌ Não existe');
    console.log('');
    
    // 3. Extrair valores como o site faz
    const currentFromSite = {
      height: data.current.height,
      period: data.current.period,
      direction: data.current.direction,
      windSpeed: data.current.windSpeed
    };
    
    // 4. Extrair valores como o admin DEVE fazer agora
    const firstHourly = data.hourly[0];
    const currentFromAdmin = {
      forecastHeight: data.current.height, // ✅ CORRETO
      offshoreHeight: firstHourly?.offshoreHeight ?? data.current.height,
      buoyHeight: firstHourly?.buoyHeight ?? null,
      buoyId: firstHourly?.buoyId ?? 'N/A'
    };
    
    // 5. Comparar
    console.log('%c═══════════════════════════════════════════════════════════════', 'color: green; font-weight: bold');
    console.log('%c📊 COMPARAÇÃO SITE vs ADMIN', 'color: green; font-weight: bold');
    console.log('%c═══════════════════════════════════════════════════════════════\n', 'color: green; font-weight: bold');
    
    console.log('%c🌐 SITE mostra:', 'color: blue; font-weight: bold');
    console.log(`   Previsto: ${currentFromSite.height.toFixed(2)}m`);
    console.log(`   Período: ${currentFromSite.period.toFixed(0)}s`);
    console.log(`   Direção: ${currentFromSite.direction}`);
    console.log(`   Vento: ${currentFromSite.windSpeed.toFixed(1)} km/h`);
    console.log('');
    
    console.log('%c🎯 ADMIN deve mostrar:', 'color: orange; font-weight: bold');
    console.log(`   Previsto (site): ${currentFromAdmin.forecastHeight.toFixed(2)}m`);
    console.log(`   Offshore (API): ${currentFromAdmin.offshoreHeight.toFixed(2)}m`);
    console.log(`   Boia PNBOIA: ${currentFromAdmin.buoyHeight ? currentFromAdmin.buoyHeight.toFixed(2) + 'm' : 'N/A'}`);
    console.log(`   Boia ID: ${currentFromAdmin.buoyId}`);
    console.log(`   Multiplicador: ${(currentFromAdmin.forecastHeight / currentFromAdmin.offshoreHeight).toFixed(2)}`);
    console.log('');
    
    // 6. Verificar se está correto
    const isCorrect = currentFromSite.height === currentFromAdmin.forecastHeight;
    
    if (isCorrect) {
      console.log('%c✅ SUCESSO! Admin está usando os mesmos valores do site!', 'color: green; font-size: 14px; font-weight: bold');
    } else {
      console.log('%c❌ ERRO! Admin NÃO está usando os mesmos valores do site!', 'color: red; font-size: 14px; font-weight: bold');
      console.log(`   Site: ${currentFromSite.height.toFixed(2)}m`);
      console.log(`   Admin: ${currentFromAdmin.forecastHeight.toFixed(2)}m`);
    }
    
    console.log('\n%c═══════════════════════════════════════════════════════════════\n', 'color: blue; font-weight: bold');
    
    // 7. Retornar dados para inspeção
    return {
      site: currentFromSite,
      admin: currentFromAdmin,
      rawData: data
    };
    
  } catch (error) {
    console.error('%c❌ ERRO NO TESTE:', 'color: red; font-weight: bold', error);
    console.error('Stack:', error.stack);
  }
})();
