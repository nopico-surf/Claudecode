import { useState } from "react";
import { brazilianSurfSpots } from "../data/spots";
import { Search, X } from "lucide-react";

export function AllSpots() {
  const [searchQuery, setSearchQuery] = useState("");
  // Organizar dados por estado e cidade
  const organizedData: Record<string, Record<string, string[]>> = {};
  let totalSpots = 0;
  
  // ✅ PROTEÇÃO: Verificar se brazilianSurfSpots existe e é array
  if (!brazilianSurfSpots || !Array.isArray(brazilianSurfSpots)) {
    console.error('❌ AllSpots: brazilianSurfSpots não é um array válido');
    return <div className="p-8 text-red-600">Erro ao carregar dados dos picos.</div>;
  }
  
  brazilianSurfSpots.forEach(state => {
    if (!state || !state.cities || !state.name) return;
    
    state.cities.forEach(city => {
      if (!city || !city.beaches || !city.name) return;
      
      city.beaches.forEach(beach => {
        if (!beach || !beach.spots) return;
        
        beach.spots.forEach(spot => {
          if (!spot || !spot.name) return;
          
          if (!organizedData[state.name]) {
            organizedData[state.name] = {};
          }
          if (!organizedData[state.name][city.name]) {
            organizedData[state.name][city.name] = [];
          }
          // ✅ PROTEÇÃO ADICIONAL: Verificar se o array foi criado
          if (Array.isArray(organizedData[state.name][city.name])) {
            organizedData[state.name][city.name].push(spot.name);
            totalSpots++;
          }
        });
      });
    });
  });

  // Calcular estatísticas
  // const totalSpots já foi calculado acima
  const totalCities = Object.values(organizedData).reduce(
    (sum, cities) => sum + Object.keys(cities).length, 
    0
  );
  const totalStates = Object.keys(organizedData).length;

  // Filtrar dados baseado na busca
  const normalizeText = (text: string) => 
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredData = Object.entries(organizedData).reduce((acc, [state, cities]) => {
    const normalizedQuery = normalizeText(searchQuery);
    
    if (!searchQuery) {
      acc[state] = cities;
      return acc;
    }

    // Verifica se o estado corresponde
    if (normalizeText(state).includes(normalizedQuery)) {
      acc[state] = cities;
      return acc;
    }

    // Filtra cidades e spots
    const filteredCities = Object.entries(cities).reduce((cityAcc, [city, spots]) => {
      if (normalizeText(city).includes(normalizedQuery)) {
        cityAcc[city] = spots;
        return cityAcc;
      }

      const filteredSpots = spots.filter(spot => 
        normalizeText(spot).includes(normalizedQuery)
      );

      if (filteredSpots.length > 0) {
        cityAcc[city] = filteredSpots;
      }

      return cityAcc;
    }, {} as Record<string, string[]>);

    if (Object.keys(filteredCities).length > 0) {
      acc[state] = filteredCities;
    }

    return acc;
  }, {} as Record<string, Record<string, string[]>>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Botão Voltar */}
      <div className="container mx-auto px-4 pt-4">
        <a 
          href="/"
          className="inline-flex items-center gap-2 bg-[#001f3d] text-white px-4 py-2 rounded-lg hover:bg-[#003366] transition-colors"
        >
          ← Voltar para Home
        </a>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-[#001f3d] rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-center mb-4">🏄‍♂️ Picos de Surf do Brasil</h1>
          <p className="text-center text-white/80 mb-6">Lista completa de todos os spots de surf</p>
          
          {/* Stats */}
          <div className="flex gap-6 justify-center flex-wrap">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
              <div className="text-3xl font-bold">{totalSpots}</div>
              <div className="text-sm text-white/80">Picos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
              <div className="text-3xl font-bold">{totalCities}</div>
              <div className="text-sm text-white/80">Cidades</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
              <div className="text-3xl font-bold">{totalStates}</div>
              <div className="text-sm text-white/80">Estados</div>
            </div>
          </div>
        </div>

        {/* Busca */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar estado, cidade ou pico..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {Object.keys(filteredData).length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {Object.entries(filteredData).map(([state, cities]) => {
            const stateSpotsCount = Object.values(cities).reduce(
              (sum, spots) => sum + spots.length, 
              0
            );
            
            return (
              <div key={state} className="mb-8 pb-8 border-b border-gray-200 last:border-b-0">
                {/* State Header */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg px-6 py-4 mb-6 flex items-center justify-between">
                  <h2 className="text-2xl">📍 {state}</h2>
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                    {stateSpotsCount} picos
                  </span>
                </div>

                {/* Cities */}
                {Object.entries(cities).map(([city, spots]) => (
                  <div key={city} className="mb-6 pl-4">
                    <h3 className="text-xl text-blue-900 mb-3 pb-2 border-b-2 border-blue-100">
                      {city}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {spots.sort().map(spot => (
                        <div
                          key={spot}
                          className="bg-gray-50 hover:bg-blue-50 transition-colors px-4 py-2 rounded-lg text-gray-700 cursor-pointer"
                        >
                          🏄‍♂️ {spot}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              Nenhum resultado encontrado para "{searchQuery}"
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>Previsão de ondas por nível de surf • {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    </div>
  );
}
