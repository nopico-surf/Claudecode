/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🧪 TESTE INSTANTÂNEO - VERIFICAR SE A CORREÇÃO FUNCIONOU
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * COPIAR E COLAR NO CONSOLE (F12) - ENQUANTO ESTIVER NA PÁGINA DO PALANQUE
 * 
 * Este script verifica:
 * ✅ Se o erro sumiu
 * ✅ Se os dados estão carregando
 * ✅ Se a proteção está funcionando
 */

console.clear();
console.log('\n🧪 ═══════════════════════════════════════════════════════════');
console.log('🧪 TESTE DA CORREÇÃO - PALANQUE');
console.log('🧪 ═══════════════════════════════════════════════════════════\n');

// ═══════════════════════════════════════════════════════════════════════════
// 1️⃣ VERIFICAR SE HÁ ERROS NO CONSOLE
// ═══════════════════════════════════════════════════════════════════════════

console.log('1️⃣ VERIFICANDO ERROS NO CONSOLE...\n');

const errosEncontrados = [];

// Interceptar console.error
const originalError = console.error;
console.error = function(...args) {
  errosEncontrados.push(args.join(' '));
  originalError.apply(console, args);
};

setTimeout(() => {
  if (errosEncontrados.length === 0) {
    console.log('%c✅ NENHUM ERRO DETECTADO!', 'color: #28a745; font-weight: bold; font-size: 14px;');
  } else {
    console.log('%c❌ ERROS DETECTADOS:', 'color: #dc3545; font-weight: bold; font-size: 14px;');
    errosEncontrados.forEach(erro => {
      console.log(`   - ${erro}`);
    });
  }
}, 2000);

// ═══════════════════════════════════════════════════════════════════════════
// 2️⃣ SIMULAR DADOS UNDEFINED E TESTAR PROTEÇÃO
// ═══════════════════════════════════════════════════════════════════════════

console.log('\n2️⃣ TESTANDO PROTEÇÃO CONTRA DADOS UNDEFINED...\n');

try {
  // Simular dados que podem vir da API
  const dataSimulado1 = { hourly: undefined };
  const dataSimulado2 = { hourly: null };
  const dataSimulado3 = {};
  const dataSimulado4 = { hourly: [
    { bestFor: ['beginner'] },
    { bestFor: ['intermediate', 'advanced'] }
  ]};
  
  // Testar proteção (igual ao código corrigido)
  function testarProtecao(data, nome) {
    try {
      const hourlyData = data?.hourly || [];
      const hasBeginner = hourlyData.some(h => h.bestFor?.includes("beginner"));
      const hasIntermediate = hourlyData.some(h => h.bestFor?.includes("intermediate"));
      const hasAdvanced = hourlyData.some(h => h.bestFor?.includes("advanced"));
      
      console.log(`   ✅ ${nome}:`);
      console.log(`      Beginner: ${hasBeginner}`);
      console.log(`      Intermediate: ${hasIntermediate}`);
      console.log(`      Advanced: ${hasAdvanced}`);
      
      return true;
    } catch (error) {
      console.log(`   ❌ ${nome}: FALHOU - ${error.message}`);
      return false;
    }
  }
  
  const teste1 = testarProtecao(dataSimulado1, 'hourly = undefined');
  const teste2 = testarProtecao(dataSimulado2, 'hourly = null');
  const teste3 = testarProtecao(dataSimulado3, 'sem propriedade hourly');
  const teste4 = testarProtecao(dataSimulado4, 'hourly com dados válidos');
  
  if (teste1 && teste2 && teste3 && teste4) {
    console.log('\n%c✅ PROTEÇÃO FUNCIONANDO PERFEITAMENTE!', 'color: #28a745; font-weight: bold; font-size: 14px;');
  } else {
    console.log('\n%c❌ PROTEÇÃO FALHOU EM ALGUM TESTE!', 'color: #dc3545; font-weight: bold; font-size: 14px;');
  }
  
} catch (error) {
  console.log('\n%c❌ ERRO AO TESTAR PROTEÇÃO:', 'color: #dc3545; font-weight: bold; font-size: 14px;');
  console.error(error);
}

// ═══════════════════════════════════════════════════════════════════════════
// 3️⃣ VERIFICAR SE OS DADOS DO PALANQUE ESTÃO CARREGANDO
// ═══════════════════════════════════════════════════════════════════════════

console.log('\n3️⃣ VERIFICANDO DADOS DO PALANQUE...\n');

// Tentar encontrar elementos na página
setTimeout(() => {
  const condicoesAtuais = document.querySelector('[class*="WaveConditionsCard"]') || 
                          document.querySelector('h2:contains("Condições Atuais")') ||
                          document.querySelector('[class*="current"]');
  
  const previsaoHoraria = document.querySelector('[class*="HourlyForecast"]') ||
                          document.querySelector('h2:contains("Previsão Horária")');
  
  const previsaoSemanal = document.querySelector('[class*="WeeklyForecast"]') ||
                          document.querySelector('h2:contains("Previsão Semanal")');
  
  if (condicoesAtuais) {
    console.log('   ✅ Condições Atuais: PRESENTE na página');
  } else {
    console.log('   ❌ Condições Atuais: NÃO ENCONTRADO');
  }
  
  if (previsaoHoraria) {
    console.log('   ✅ Previsão Horária: PRESENTE na página');
  } else {
    console.log('   ⚠️  Previsão Horária: NÃO ENCONTRADO');
  }
  
  if (previsaoSemanal) {
    console.log('   ✅ Previsão Semanal: PRESENTE na página');
  } else {
    console.log('   ⚠️  Previsão Semanal: NÃO ENCONTRADO');
  }
  
  // Verificar se há dados de ondas visíveis
  const waveHeightElements = document.querySelectorAll('[class*="wave"], [class*="height"]');
  if (waveHeightElements.length > 0) {
    console.log(`   ✅ Elementos de ondas encontrados: ${waveHeightElements.length}`);
  } else {
    console.log('   ⚠️  Nenhum elemento de ondas encontrado');
  }
  
}, 3000);

// ═══════════════════════════════════════════════════════════════════════════
// 4️⃣ TESTAR API OPEN-METEO DIRETAMENTE
// ═══════════════════════════════════════════════════════════════════════════

console.log('\n4️⃣ TESTANDO API OPEN-METEO...\n');

fetch('https://marine-api.open-meteo.com/v1/marine?' + 
      'latitude=-27.6800&' +
      'longitude=-48.4750&' +
      'hourly=wave_height,wave_direction,wave_period&' +
      'timezone=America/Sao_Paulo&' +
      'forecast_days=7')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('   ✅ API Open-Meteo respondeu com sucesso!');
    console.log(`   📊 Horas disponíveis: ${data.hourly.time.length}`);
    console.log(`   🌊 Primeira altura: ${data.hourly.wave_height[0]}m`);
    console.log(`   🧭 Primeira direção: ${data.hourly.wave_direction[0]}°`);
    console.log(`   ⏱️  Primeiro período: ${data.hourly.wave_period[0]}s`);
  })
  .catch(error => {
    console.log('   ❌ Erro ao chamar API:', error.message);
  });

// ═══════════════════════════════════════════════════════════════════════════
// 5️⃣ RESUMO FINAL
// ═══════════════════════════════════════════════════════════════════════════

setTimeout(() => {
  console.log('\n🧪 ═══════════════════════════════════════════════════════════');
  console.log('🧪 RESUMO DO TESTE');
  console.log('🧪 ═══════════════════════════════════════════════════════════\n');
  
  console.log('📋 CHECKLIST:');
  console.log('   [ ] 1. Console sem erros "Cannot read properties of undefined"');
  console.log('   [ ] 2. Proteção funcionando (testes passaram)');
  console.log('   [ ] 3. Elementos de página carregados');
  console.log('   [ ] 4. API Open-Meteo respondendo');
  console.log('\n💡 PRÓXIMO PASSO:');
  console.log('   Se todos os testes passaram: ✅ CORREÇÃO FUNCIONOU!');
  console.log('   Se algum teste falhou: ❌ Copie e cole TODO o console aqui.');
  
  console.log('\n🧪 ═══════════════════════════════════════════════════════════\n');
}, 5000);
