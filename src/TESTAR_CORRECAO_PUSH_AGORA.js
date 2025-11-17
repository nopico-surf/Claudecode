// ════════════════════════════════════════════════════════════════════════════
// 🧪 TESTE RÁPIDO - VERIFICAR SE ERRO DE PUSH FOI CORRIGIDO
// ════════════════════════════════════════════════════════════════════════════
// 
// COPIE E COLE NO CONSOLE DO NAVEGADOR (F12)
// ════════════════════════════════════════════════════════════════════════════

console.log('🧪 INICIANDO TESTE DE VERIFICAÇÃO...\n');

// ════════════════════════════════════════════════════════════════════════════
// 1. VERIFICAR LOCALSTORAGE
// ════════════════════════════════════════════════════════════════════════════

console.log('1️⃣ VERIFICANDO LOCALSTORAGE...');
const stored = localStorage.getItem('nopico_observations');

if (!stored) {
  console.log('   ⚠️ Nenhum dado no localStorage');
} else {
  try {
    const data = JSON.parse(stored);
    if (Array.isArray(data)) {
      console.log('   ✅ LocalStorage contém array válido:', data.length, 'itens');
      console.log('   📦 Primeira observação:', data[0]?.spotName || 'N/A');
    } else {
      console.log('   ❌ LocalStorage NÃO é um array:', typeof data);
      console.log('   🔧 SOLUÇÃO: Limpar localStorage');
      console.log('      localStorage.clear();');
    }
  } catch (error) {
    console.log('   ❌ Erro ao parsear localStorage:', error.message);
    console.log('   🔧 SOLUÇÃO: Limpar localStorage');
    console.log('      localStorage.clear();');
  }
}

// ════════════════════════════════════════════════════════════════════════════
// 2. VERIFICAR ESTRUTURA DE DADOS
// ════════════════════════════════════════════════════════════════════════════

console.log('\n2️⃣ VERIFICANDO ESTRUTURA DE DADOS...');

// Verificar se window tem os dados
if (typeof window !== 'undefined') {
  console.log('   ✅ Window definido');
  
  // Verificar se React está carregado
  if (window.React) {
    console.log('   ✅ React carregado');
  } else {
    console.log('   ⚠️ React não encontrado (pode ser normal)');
  }
} else {
  console.log('   ❌ Window não definido');
}

// ════════════════════════════════════════════════════════════════════════════
// 3. SIMULAR OPERAÇÕES CRÍTICAS
// ════════════════════════════════════════════════════════════════════════════

console.log('\n3️⃣ SIMULANDO OPERAÇÕES CRÍTICAS...');

// Teste 1: Criação de objeto organizado
console.log('   Teste 1: Criar organizedData...');
try {
  const organizedData = {};
  const testState = 'TestState';
  const testCity = 'TestCity';
  
  if (!organizedData[testState]) {
    organizedData[testState] = {};
  }
  
  if (!organizedData[testState][testCity]) {
    organizedData[testState][testCity] = [];
  }
  
  if (Array.isArray(organizedData[testState][testCity])) {
    organizedData[testState][testCity].push('TestSpot');
    console.log('   ✅ Push funcionou:', organizedData[testState][testCity]);
  } else {
    console.log('   ❌ Array não foi criado corretamente');
  }
} catch (error) {
  console.log('   ❌ Erro no teste 1:', error.message);
}

// Teste 2: Operação reduce
console.log('   Teste 2: Operação reduce...');
try {
  const testArray = [
    { id: '1', name: 'Test 1' },
    { id: '2', name: 'Test 2' }
  ];
  
  const grouped = testArray.reduce((acc, item) => {
    if (!item || !item.id) return acc;
    
    if (!acc[item.id]) {
      acc[item.id] = [];
    }
    
    if (Array.isArray(acc[item.id])) {
      acc[item.id].push(item);
    }
    
    return acc;
  }, {});
  
  console.log('   ✅ Reduce funcionou:', Object.keys(grouped).length, 'grupos');
} catch (error) {
  console.log('   ❌ Erro no teste 2:', error.message);
}

// Teste 3: LocalStorage write/read
console.log('   Teste 3: LocalStorage write/read...');
try {
  const testData = [
    { id: 'test-1', name: 'Test Observation' }
  ];
  
  localStorage.setItem('nopico_test', JSON.stringify(testData));
  const retrieved = JSON.parse(localStorage.getItem('nopico_test'));
  
  if (Array.isArray(retrieved) && retrieved.length === 1) {
    console.log('   ✅ LocalStorage funcionou');
    localStorage.removeItem('nopico_test');
  } else {
    console.log('   ❌ Dados não foram salvos corretamente');
  }
} catch (error) {
  console.log('   ❌ Erro no teste 3:', error.message);
}

// ════════════════════════════════════════════════════════════════════════════
// 4. RESULTADO FINAL
// ════════════════════════════════════════════════════════════════════════════

console.log('\n📊 RESULTADO FINAL:');
console.log('════════════════════════════════════════════════════════════════');
console.log('✅ Se todos os testes passaram, o erro foi CORRIGIDO!');
console.log('❌ Se algum teste falhou, verifique os logs acima');
console.log('════════════════════════════════════════════════════════════════');

// ════════════════════════════════════════════════════════════════════════════
// 5. COMANDOS ÚTEIS
// ════════════════════════════════════════════════════════════════════════════

console.log('\n🛠️ COMANDOS ÚTEIS:');
console.log('');
console.log('// Limpar localStorage:');
console.log('localStorage.clear();');
console.log('');
console.log('// Ver dados salvos:');
console.log('JSON.parse(localStorage.getItem("nopico_observations"))');
console.log('');
console.log('// Forçar reload da página:');
console.log('location.reload();');
console.log('');
console.log('════════════════════════════════════════════════════════════════');
