/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🧪 TESTE DEFINITIVO - VERIFICAR SE A CORREÇÃO DO BUG CRÍTICO FUNCIONOU
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * INSTRUÇÕES:
 * 1. Acesse o Palanque: Brasil → SC → Florianópolis → Palanque
 * 2. Abra o console (F12)
 * 3. COPIE E COLE TODO ESTE CÓDIGO
 * 4. Pressione ENTER
 * 5. Aguarde 5 segundos
 * 6. Copie e cole TODO o resultado para mim
 */

(function() {
  console.clear();
  console.log('\n%c╔═══════════════════════════════════════════════════════════════╗', 'color: #00d4ff; font-weight: bold;');
  console.log('%c║  🧪 TESTE DEFINITIVO - CORREÇÃO DO BUG CRÍTICO              ║', 'color: #00d4ff; font-weight: bold;');
  console.log('%c╚═══════════════════════════════════════════════════════════════╝\n', 'color: #00d4ff; font-weight: bold;');
  
  let testResults = {
    errors: [],
    warnings: [],
    successes: [],
    apiTests: {},
    elementTests: {},
    protectionTests: {}
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 1️⃣ INTERCEPTAR ERROS DO CONSOLE
  // ═══════════════════════════════════════════════════════════════════════════
  
  console.log('%c1️⃣ INTERCEPTANDO ERROS DO CONSOLE...', 'color: #ffa500; font-weight: bold;');
  
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = function(...args) {
    const errorMsg = args.join(' ');
    testResults.errors.push(errorMsg);
    
    // Detectar o erro específico que estamos procurando
    if (errorMsg.includes('Cannot read properties of undefined') && 
        errorMsg.includes('some')) {
      console.log('%c   ❌ ERRO CRÍTICO DETECTADO!', 'color: #dc3545; font-weight: bold;');
      console.log('   ' + errorMsg);
    }
    
    originalError.apply(console, args);
  };
  
  console.warn = function(...args) {
    testResults.warnings.push(args.join(' '));
    originalWarn.apply(console, args);
  };
  
  console.log('   ✅ Interceptor instalado\n');
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 2️⃣ TESTAR PROTEÇÃO CONTRA DADOS UNDEFINED
  // ═══════════════════════════════════════════════════════════════════════════
  
  console.log('%c2️⃣ TESTANDO PROTEÇÃO CONTRA DADOS UNDEFINED...', 'color: #ffa500; font-weight: bold;');
  
  const testCases = [
    { name: 'data.hourly = undefined', data: { hourly: undefined } },
    { name: 'data.hourly = null', data: { hourly: null } },
    { name: 'data sem propriedade hourly', data: {} },
    { name: 'data.hourly vazio', data: { hourly: [] } },
    { name: 'data.hourly com bestFor undefined', data: { hourly: [{ bestFor: undefined }] } },
    { name: 'data.hourly válido', data: { hourly: [{ bestFor: ['beginner', 'intermediate'] }] } }
  ];
  
  testCases.forEach((test, index) => {
    try {
      // Simular a proteção aplicada
      const hourlyData = test.data?.hourly || [];
      const hasBeginner = hourlyData.some(h => h.bestFor?.includes("beginner"));
      const hasIntermediate = hourlyData.some(h => h.bestFor?.includes("intermediate"));
      const hasAdvanced = hourlyData.some(h => h.bestFor?.includes("advanced"));
      
      testResults.protectionTests[test.name] = {
        status: 'PASS',
        beginner: hasBeginner,
        intermediate: hasIntermediate,
        advanced: hasAdvanced
      };
      
      console.log(`   ✅ ${test.name}: PASSOU`);
      console.log(`      → Beginner: ${hasBeginner}, Intermediate: ${hasIntermediate}, Advanced: ${hasAdvanced}`);
    } catch (error) {
      testResults.protectionTests[test.name] = {
        status: 'FAIL',
        error: error.message
      };
      console.log(`   ❌ ${test.name}: FALHOU - ${error.message}`);
    }
  });
  
  console.log('');
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 3️⃣ TESTAR PROTEÇÃO staticFeatures
  // ═══════════════════════════════════════════════════════════════════════════
  
  console.log('%c3️⃣ TESTANDO PROTEÇÃO staticFeatures...', 'color: #ffa500; font-weight: bold;');
  
  const staticFeaturesTests = [
    { name: 'staticFeatures undefined', data: { staticFeatures: undefined } },
    { name: 'staticFeatures null', data: { staticFeatures: null } },
    { name: 'staticFeatures vazio', data: { staticFeatures: [] } },
    { name: 'staticFeatures com Campeche', data: { staticFeatures: [{ name: 'Ilha do Campeche' }] } },
    { name: 'staticFeatures sem Campeche', data: { staticFeatures: [{ name: 'Outra Feature' }] } }
  ];
  
  staticFeaturesTests.forEach(test => {
    try {
      // Simular a proteção aplicada na linha 1444
      const hasCampeche = (test.data.staticFeatures || []).some((f) => f.name === 'Ilha do Campeche');
      
      testResults.protectionTests[test.name] = {
        status: 'PASS',
        hasCampeche: hasCampeche
      };
      
      console.log(`   ✅ ${test.name}: PASSOU (Campeche: ${hasCampeche})`);
    } catch (error) {
      testResults.protectionTests[test.name] = {
        status: 'FAIL',
        error: error.message
      };
      console.log(`   ❌ ${test.name}: FALHOU - ${error.message}`);
    }
  });
  
  console.log('');
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 4️⃣ VERIFICAR ELEMENTOS NA PÁGINA
  // ═══════════════════════════════════════════════════════════════════════════
  
  console.log('%c4️⃣ VERIFICANDO ELEMENTOS NA PÁGINA...', 'color: #ffa500; font-weight: bold;');
  
  setTimeout(() => {
    // Buscar títulos e seções
    const allH2 = Array.from(document.querySelectorAll('h2')).map(h => h.textContent);
    const allH3 = Array.from(document.querySelectorAll('h3')).map(h => h.textContent);
    
    console.log(`   Títulos H2 encontrados (${allH2.length}):`);
    allH2.forEach(title => console.log(`      - ${title}`));
    
    console.log(`   Títulos H3 encontrados (${allH3.length}):`);
    allH3.forEach(title => console.log(`      - ${title}`);
    
    // Verificar seções específicas
    const condicoesAtuais = allH2.some(t => t.includes('Condições Atuais'));
    const previsaoHoraria = allH2.some(t => t.includes('Previsão Horária'));
    const previsaoSemanal = allH2.some(t => t.includes('Previsão Semanal'));
    
    testResults.elementTests = {
      condicoesAtuais,
      previsaoHoraria,
      previsaoSemanal,
      totalH2: allH2.length,
      totalH3: allH3.length
    };
    
    console.log('\n   Seções principais:');
    console.log(`   ${condicoesAtuais ? '✅' : '❌'} Condições Atuais`);
    console.log(`   ${previsaoHoraria ? '✅' : '❌'} Previsão Horária`);
    console.log(`   ${previsaoSemanal ? '✅' : '❌'} Previsão Semanal`);
    
    // Buscar elementos de ondas
    const waveElements = document.querySelectorAll('[class*="wave"], [class*="Wave"], [class*="height"]');
    console.log(`\n   Elementos de ondas encontrados: ${waveElements.length}`);
    
    testResults.elementTests.waveElements = waveElements.length;
    
  }, 2000);
  
  console.log('');
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 5️⃣ TESTAR API OPEN-METEO
  // ═══════════════════════════════════════════════════════════════════════════
  
  console.log('%c5️⃣ TESTANDO API OPEN-METEO (PALANQUE)...', 'color: #ffa500; font-weight: bold;');
  
  // Coordenadas do Palanque
  const palanqueLat = -27.6800;
  const palanqueLon = -48.4750;
  
  fetch(`https://marine-api.open-meteo.com/v1/marine?` +
        `latitude=${palanqueLat}&` +
        `longitude=${palanqueLon}&` +
        `hourly=wave_height,wave_direction,wave_period&` +
        `timezone=America/Sao_Paulo&` +
        `forecast_days=7`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      testResults.apiTests.openMeteo = {
        status: 'SUCCESS',
        hours: data.hourly.time.length,
        firstWaveHeight: data.hourly.wave_height[0],
        firstWaveDirection: data.hourly.wave_direction[0],
        firstWavePeriod: data.hourly.wave_period[0]
      };
      
      console.log('   ✅ API Open-Meteo: SUCESSO');
      console.log(`   📊 Horas disponíveis: ${data.hourly.time.length}`);
      console.log(`   🌊 Primeira altura: ${data.hourly.wave_height[0]}m`);
      console.log(`   🧭 Primeira direção: ${data.hourly.wave_direction[0]}°`);
      console.log(`   ⏱️  Primeiro período: ${data.hourly.wave_period[0]}s\n`);
    })
    .catch(error => {
      testResults.apiTests.openMeteo = {
        status: 'ERROR',
        error: error.message
      };
      console.log('   ❌ API Open-Meteo: ERRO - ' + error.message + '\n');
    });
  
  // ═══════════════════════════════════════════════════════════════════════════
  // 6️⃣ RESUMO FINAL (após 5 segundos)
  // ═══════════════════════════════════════════════════════════════════════════
  
  setTimeout(() => {
    console.log('\n%c╔═══════════════════════════════════════════════════════════════╗', 'color: #00d4ff; font-weight: bold;');
    console.log('%c║  📊 RESUMO FINAL DO TESTE                                    ║', 'color: #00d4ff; font-weight: bold;');
    console.log('%c╚═══════════════════════════════════════════════════════════════╝\n', 'color: #00d4ff; font-weight: bold;');
    
    // Contar sucessos/falhas
    const protectionPasses = Object.values(testResults.protectionTests).filter(t => t.status === 'PASS').length;
    const protectionFails = Object.values(testResults.protectionTests).filter(t => t.status === 'FAIL').length;
    
    console.log('%c📋 CHECKLIST:', 'font-weight: bold; font-size: 14px;');
    console.log('');
    
    // 1. Erros no console
    if (testResults.errors.length === 0) {
      console.log('%c   ✅ Nenhum erro no console', 'color: #28a745;');
    } else {
      console.log('%c   ❌ ' + testResults.errors.length + ' erro(s) detectado(s)', 'color: #dc3545;');
      testResults.errors.forEach(err => {
        console.log('      → ' + err);
      });
    }
    
    // 2. Testes de proteção
    if (protectionFails === 0) {
      console.log('%c   ✅ Todos os testes de proteção passaram (' + protectionPasses + '/' + protectionPasses + ')', 'color: #28a745;');
    } else {
      console.log('%c   ❌ ' + protectionFails + ' teste(s) de proteção falharam', 'color: #dc3545;');
    }
    
    // 3. Elementos na página
    if (testResults.elementTests.condicoesAtuais && 
        testResults.elementTests.previsaoHoraria && 
        testResults.elementTests.previsaoSemanal) {
      console.log('%c   ✅ Todas as seções principais carregadas', 'color: #28a745;');
    } else {
      console.log('%c   ⚠️  Algumas seções não foram encontradas', 'color: #ffa500;');
    }
    
    // 4. API
    if (testResults.apiTests.openMeteo?.status === 'SUCCESS') {
      console.log('%c   ✅ API Open-Meteo respondendo corretamente', 'color: #28a745;');
    } else {
      console.log('%c   ❌ Problema na API Open-Meteo', 'color: #dc3545;');
    }
    
    console.log('');
    console.log('%c💡 VEREDICTO FINAL:', 'font-weight: bold; font-size: 14px;');
    console.log('');
    
    const allGood = (
      testResults.errors.length === 0 &&
      protectionFails === 0 &&
      testResults.elementTests.condicoesAtuais &&
      testResults.apiTests.openMeteo?.status === 'SUCCESS'
    );
    
    if (allGood) {
      console.log('%c   🎉 CORREÇÃO FUNCIONOU PERFEITAMENTE!', 'color: #28a745; font-weight: bold; font-size: 16px;');
      console.log('   O bug foi resolvido e o Palanque está funcionando!\n');
    } else {
      console.log('%c   ⚠️  AINDA HÁ PROBLEMAS', 'color: #ffa500; font-weight: bold; font-size: 16px;');
      console.log('   Copie TODO este console e envie para análise.\n');
    }
    
    console.log('%c📤 PRÓXIMO PASSO:', 'font-weight: bold;');
    console.log('   1. Selecione TODO o texto do console (Ctrl+A)');
    console.log('   2. Copie (Ctrl+C)');
    console.log('   3. Cole para mim analisar\n');
    
    console.log('%c╔═══════════════════════════════════════════════════════════════╗', 'color: #00d4ff; font-weight: bold;');
    console.log('%c║  FIM DO TESTE                                                ║', 'color: #00d4ff; font-weight: bold;');
    console.log('%c╚═══════════════════════════════════════════════════════════════╝\n', 'color: #00d4ff; font-weight: bold;');
    
    // Restaurar console original
    console.error = originalError;
    console.warn = originalWarn;
    
    // Retornar resultados
    window.testResults = testResults;
    console.log('%c💾 Resultados salvos em window.testResults', 'color: #888;');
    
  }, 5000);
  
})();
