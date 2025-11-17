// COMPONENTE DE TESTE - BOTÃO SIMPLES

export function TestButton() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Teste de Botões</h1>
      
      {/* Botão Roxo */}
      <button
        className="w-full px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg"
        onClick={() => alert('Botão roxo funciona!')}
      >
        🟣 BOTÃO ROXO - CLIQUE AQUI
      </button>
      
      {/* Botão Verde */}
      <button
        className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg"
        onClick={() => alert('Botão verde funciona!')}
      >
        🟢 BOTÃO VERDE - CLIQUE AQUI
      </button>
      
      {/* Botão com estilo inline */}
      <button
        style={{
          width: '100%',
          padding: '1rem 1.5rem',
          backgroundColor: '#9333EA',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer'
        }}
        onClick={() => alert('Botão inline funciona!')}
      >
        🎨 BOTÃO COM STYLE INLINE
      </button>
    </div>
  );
}
