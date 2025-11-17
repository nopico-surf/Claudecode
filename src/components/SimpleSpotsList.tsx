import { brazilianSurfSpots } from "../data/spots";

export function SimpleSpotsList() {
  console.log("SimpleSpotsList - brazilianSurfSpots:", brazilianSurfSpots);
  console.log("SimpleSpotsList - tipo:", typeof brazilianSurfSpots);
  console.log("SimpleSpotsList - é array:", Array.isArray(brazilianSurfSpots));
  console.log("SimpleSpotsList - length:", brazilianSurfSpots?.length);
  
  // Organizar dados por estado e cidade
  const organizedData: Record<string, Record<string, string[]>> = {};
  
  // Verificar se o import foi bem sucedido
  if (!brazilianSurfSpots || !Array.isArray(brazilianSurfSpots)) {
    console.error("Erro: brazilianSurfSpots não é um array válido");
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="text-red-600">
          Erro ao carregar dados dos picos. Por favor, recarregue a página.
        </div>
      </div>
    );
  }
  
  // Iterar sobre todos os estados
  brazilianSurfSpots.forEach((state, stateIndex) => {
    console.log(`Estado ${stateIndex}:`, state?.name, state);
    
    if (!state || !state.name || !state.cities) {
      console.warn("Estado inválido:", state);
      return;
    }
    
    if (!organizedData[state.name]) {
      organizedData[state.name] = {};
    }
    
    // ✅ PROTEÇÃO: Verificar se o objeto foi criado corretamente
    if (typeof organizedData[state.name] !== 'object') {
      console.error(`Erro ao criar objeto para estado ${state.name}`);
      return;
    }
    
    // Iterar sobre todas as cidades do estado
    state.cities.forEach((city, cityIndex) => {
      console.log(`  Cidade ${cityIndex}:`, city?.name, city);
      
      if (!city || !city.name || !city.beaches) {
        console.warn("Cidade inválida:", city);
        return;
      }
      
      if (!organizedData[state.name][city.name]) {
        organizedData[state.name][city.name] = [];
      }
      
      // ✅ PROTEÇÃO: Verificar se o array foi criado corretamente
      if (!Array.isArray(organizedData[state.name][city.name])) {
        console.error(`Erro ao criar array para cidade ${city.name}, estado ${state.name}`);
        return;
      }
      
      // Iterar sobre todas as praias da cidade
      city.beaches.forEach((beach, beachIndex) => {
        console.log(`    Praia ${beachIndex}:`, beach?.name, beach);
        
        if (!beach || !beach.spots) {
          console.warn("Praia inválida:", beach);
          return;
        }
        
        // Adicionar todos os spots da praia
        beach.spots.forEach((spot, spotIndex) => {
          console.log(`      Spot ${spotIndex}:`, spot?.name);
          
          if (spot && spot.name && Array.isArray(organizedData[state.name][city.name])) {
            organizedData[state.name][city.name].push(spot.name);
          }
        });
      });
    });
  });
  
  console.log("Dados organizados:", organizedData);

  return (
    <div className="min-h-screen bg-white">
      {/* Botão Voltar */}
      <div className="bg-[#001f3d] py-4 px-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <a 
            href="/"
            className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            ← Voltar para Home
          </a>
          <h1 className="text-white text-xl">Lista de Picos</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Debug Info */}
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            Estados encontrados: {Object.keys(organizedData).length}
          </p>
        </div>
        
        {/* Lista Simples */}
        <div className="space-y-8">
          {Object.entries(organizedData).map(([state, cities]) => (
            <div key={state} className="border-b border-gray-200 pb-6">
              {/* Estado */}
              <h2 className="text-2xl text-[#001f3d] mb-4 sticky top-[72px] bg-white py-2 z-[5]">
                {state}
              </h2>
              
              {/* Cidades */}
              <div className="space-y-4 ml-4">
                {Object.entries(cities).map(([city, spots]) => (
                  <div key={`${state}-${city}`}>
                    {/* Cidade */}
                    <h3 className="text-lg text-[#003366] mb-2">
                      {city}
                    </h3>
                    
                    {/* Picos */}
                    <ul className="space-y-1 ml-4">
                      {spots.map((spot, index) => (
                        <li 
                          key={`${state}-${city}-${spot}-${index}`}
                          className="text-gray-700"
                        >
                          • {spot}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
