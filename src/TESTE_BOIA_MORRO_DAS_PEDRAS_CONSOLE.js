/**
 * 🧪 TESTE DEFINITIVO: DADOS DE BOIA PARA MORRO DAS PEDRAS
 * 
 * COPIE E COLE NO CONSOLE DO NAVEGADOR (F12)
 * 
 * Este teste vai:
 * 1. Buscar dados da boia diretamente
 * 2. Buscar forecast do Morro das Pedras
 * 3. Mostrar EXATAMENTE o que está acontecendo
 */

(async function testeMorroBoias() {
  console.log('🧪 ======================================');
  console.log('🧪 TESTE: DADOS DE BOIA - MORRO DAS PEDRAS');
  console.log('🧪 ======================================\n');
  
  // Coordenadas do Morro das Pedras
  const lat = -27.7433;
  const lon = -48.5089;
  
  // 1️⃣ TESTAR PNBOIA API DIRETAMENTE
  console.log('1️⃣ TESTANDO PNBOIA API...\n');
  
  try {
    const { getPNBOIAData } = await import('./services/pnboiaApi.ts');
    const pnboiaData = await getPNBOIAData(lat, lon);
    
    console.log('📊 RESULTADO PNBOIA:');
    console.log('   Available:', pnboiaData?.available);
    console.log('   Buoy:', pnboiaData?.buoy?.name);
    console.log('   Distance:', pnboiaData?.distance?.toFixed(0), 'km');
    console.log('   Data Age:', pnboiaData?.dataAge?.toFixed(0), 'min');
    console.log('   Wave Height:', pnboiaData?.latestReading?.waveHeight, 'm');
    console.log('   Buoy ID:', pnboiaData?.latestReading?.buoyId);
    console.log('   Is Mock:', pnboiaData?.latestReading?.isMockData);
    console.log('   Latest Reading:', pnboiaData?.latestReading);
    console.log('');
    
    if (!pnboiaData || !pnboiaData.available) {
      console.error('❌ PNBOIA NÃO DISPONÍVEL!');
      console.log('\n🔍 MOTIVOS POSSÍVEIS:');
      console.log('   1. Nenhuma boia ativa próxima');
      console.log('   2. Boia muito distante (>300km)');
      console.log('   3. Dados muito antigos (>36h)');
      console.log('   4. Erro no backend');
      return;
    }
    
    // 2️⃣ TESTAR WAVE API (FORECAST)
    console.log('2️⃣ TESTANDO WAVE API (FORECAST)...\n');
    
    const spotMorro = {
      id: 'sc-floripa-morro-das-pedras-1',
      name: 'Morro das Pedras',
      lat: -27.7433,
      lon: -48.5089,
      orientation: 120
    };
    
    const { getWaveData } = await import('./services/waveApi.ts');
    const waveData = await getWaveData(spotMorro);
    
    console.log('📊 RESULTADO WAVE API:');
    console.log('   Current Height:', waveData.current.height, 'm');
    console.log('   Bias Corrected:', waveData.current.biasCorrected);
    console.log('');
    
    console.log('📊 DADOS HORÁRIOS (PRIMEIRA HORA):');
    const firstHourly = waveData.hourly[0];
    console.log('   Wave Height:', firstHourly.waveHeight, 'm');
    console.log('   Offshore Height:', firstHourly.offshoreHeight, 'm');
    console.log('   Buoy Height:', firstHourly.buoyHeight, 'm');
    console.log('   Buoy ID:', firstHourly.buoyId);
    console.log('   Bias Corrected:', firstHourly.biasCorrected);
    console.log('');
    
    // 3️⃣ VERIFICAR O QUE O OBSERVATION FORM VAI PEGAR
    console.log('3️⃣ O QUE O OBSERVATION FORM VAI PEGAR:\n');
    
    const buoyHeight = firstHourly?.buoyHeight ?? null;
    const buoyId = firstHourly?.buoyId ?? 'N/A';
    
    console.log('   buoyHeight:', buoyHeight);
    console.log('   buoyId:', buoyId);
    console.log('   hasBuoyData:', buoyHeight !== null && buoyHeight !== undefined);
    console.log('');
    
    // 4️⃣ DIAGNÓSTICO
    console.log('4️⃣ DIAGNÓSTICO:\n');
    
    if (buoyHeight === null || buoyHeight === undefined) {
      console.error('❌ BUOY HEIGHT É NULL/UNDEFINED!');
      console.log('\n🔍 VERIFICAR:');
      console.log('   1. pnboiaData.available =', pnboiaData.available);
      console.log('   2. ENABLE_PNBOIA_BIAS_CORRECTION = true?');
      console.log('   3. Erro em applyBiasCorrection?');
      console.log('   4. Confiança < 30%?');
    } else {
      console.log('✅ BUOY HEIGHT OK:', buoyHeight, 'm');
      console.log('✅ A observação DEVERIA salvar dados da boia!');
    }
    
    console.log('\n🧪 ======================================');
    console.log('🧪 FIM DO TESTE');
    console.log('🧪 ======================================');
    
  } catch (error) {
    console.error('❌ ERRO NO TESTE:', error);
  }
})();
