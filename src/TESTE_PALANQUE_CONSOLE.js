/**
 * ═════════════════════════════════════════════════════════════════════════
 * 🚨 TESTE RÁPIDO - PALANQUE NÃO CARREGA
 * ═════════════════════════════════════════════════════════════════════════
 * 
 * COPIAR E COLAR NO CONSOLE DO NAVEGADOR (F12)
 * 
 * Executar ENQUANTO estiver na página do Palanque
 */

console.clear();
console.log('\n🔍 TESTE RÁPIDO - PALANQUE\n');

// Verificar se há erros no console
const erros = [];

// 1. Testar chamada direta à API Open-Meteo
async function testarOpenMeteo() {
  console.log('1️⃣ Testando Open-Meteo Marine API...\n');
  
  const lat = -27.6800;
  const lon = -48.4750;
  
  const url = `https://marine-api.open-meteo.com/v1/marine?` +
    `latitude=${lat}&` +
    `longitude=${lon}&` +
    `hourly=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,wind_speed_10m,wind_direction_10m&` +
    `daily=wave_height_max,wave_direction_dominant,wave_period_max&` +
    `timezone=America/Sao_Paulo&` +
    `forecast_days=7`;
  
  try {
    console.log('📡 URL:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('❌ Erro HTTP:', response.status, response.statusText);
      return null;
    }
    
    const data = await response.json();
    
    console.log('✅ API respondeu!');
    console.log('\n📊 Primeira hora de dados:');
    console.log('   Time:', data.hourly.time[0]);
    console.log('   Wave Height:', data.hourly.wave_height[0], 'm');
    console.log('   Swell Height:', data.hourly.swell_wave_height[0], 'm');
    console.log('   Wind Wave Height:', data.hourly.wind_wave_height[0], 'm');
    console.log('   Wave Direction:', data.hourly.wave_direction[0], '°');
    console.log('   Wind Speed:', data.hourly.wind_speed_10m[0], 'm/s');
    
    return data;
  } catch (error) {
    console.error('❌ Erro ao chamar API:', error);
    return null;
  }
}

// 2. Verificar configuração do pico
function verificarConfiguracao() {
  console.log('\n2️⃣ Verificando configuração do pico...\n');
  
  const config = {
    id: 'sc-floripa-campeche-4',
    name: 'Palanque',
    lat: -27.6800,
    lon: -48.4750,
    orientation: 160, // Sul-Sudeste
  };
  
  console.log('📍 Configuração:');
  console.log(JSON.stringify(config, null, 2));
  
  return config;
}

// 3. Verificar erros JavaScript
function verificarErros() {
  console.log('\n3️⃣ Verificando erros JavaScript...\n');
  
  const errosRecentes = window.performance?.getEntriesByType?.('mark') || [];
  
  console.log('🔍 Verificar na aba "Console" se há:');
  console.log('   - ❌ Erros em vermelho');
  console.log('   - ⚠️  Warnings em amarelo');
  console.log('   - 🚫 Rejected promises');
  console.log('   - 🔴 CORS errors');
  
  console.log('\n💡 Dica: Se houver erro de "Cannot read property of undefined",');
  console.log('   significa que algum dado não está chegando do backend.');
}

// 4. Verificar localStorage/cache
function verificarCache() {
  console.log('\n4️⃣ Verificando cache...\n');
  
  try {
    // Limpar possível cache corrupto
    const keys = Object.keys(localStorage).filter(k => k.includes('wave') || k.includes('forecast'));
    
    if (keys.length > 0) {
      console.log('🗑️  Cache encontrado:', keys);
      console.log('   Considere limpar com: localStorage.clear()');
    } else {
      console.log('✅ Sem cache relevante');
    }
  } catch (e) {
    console.log('⚠️  Não foi possível acessar localStorage');
  }
}

// 5. Verificar network
function verificarNetwork() {
  console.log('\n5️⃣ Verificando requisições de rede...\n');
  
  console.log('🌐 Vá para a aba "Network" (Rede) do DevTools:');
  console.log('   1. Filtre por "marine-api" ou "wave"');
  console.log('   2. Recarregue a página (Ctrl+R)');
  console.log('   3. Veja se há requisições falhando (vermelho)');
  console.log('   4. Clique na requisição e veja "Response" (Resposta)');
}

// EXECUTAR TUDO
async function diagnosticoCompleto() {
  verificarConfiguracao();
  await testarOpenMeteo();
  verificarErros();
  verificarCache();
  verificarNetwork();
  
  console.log('\n═════════════════════════════════════════════════════════════════════════');
  console.log('📋 PRÓXIMOS PASSOS:');
  console.log('═════════════════════════════════════════════════════════════════════════\n');
  console.log('1. Se a API Open-Meteo respondeu OK ✅:');
  console.log('   → O problema está no código React/TypeScript');
  console.log('   → Verifique erros no console');
  console.log('');
  console.log('2. Se a API NÃO respondeu ❌:');
  console.log('   → Problema de conectividade ou coordenadas');
  console.log('   → Teste manualmente a URL no navegador');
  console.log('');
  console.log('3. Se há erros JavaScript 🔴:');
  console.log('   → Copie o erro completo');
  console.log('   → Cole aqui para eu corrigir');
  console.log('');
  console.log('4. Limpar cache:');
  console.log('   → Execute: localStorage.clear()');
  console.log('   → Recarregue a página (Ctrl+Shift+R)');
  console.log('\n═════════════════════════════════════════════════════════════════════════\n');
}

// EXECUTAR
diagnosticoCompleto();
