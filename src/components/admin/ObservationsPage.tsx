import { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { ObservationForm } from './ObservationForm';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Plus, Search, Filter, Calendar, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { observationLog, loadFromLocalStorage, removeObservationsBySpotAndDate, clearAllObservations } from '../../data/calibration/observationLog';
import { getAllObservations, deleteObservation, deleteAllObservations as deleteAllObservationsApi, updateObservationCalibration } from '../../services/observationsApi';

export function ObservationsPage() {
  const [showObservationForm, setShowObservationForm] = useState(false);
  const [observations, setObservations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpot, setFilterSpot] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    refreshData();
  }, []);
  
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllObservations();
      setObservations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar observações:', error);
      setObservations([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteSingleObservation = async (obsId: string, spotName: string, date: string) => {
    if (confirm(`🗑️ Remover observação de "${spotName}" (${date})?`)) {
      const success = await deleteObservation(obsId);
      if (success) {
        alert(`✅ Observação removida com sucesso`);
        await refreshData();
      } else {
        alert('❌ Erro ao remover observação. Verifique o console.');
      }
    }
  };
  
  const handleDeleteSpotObservations = async (spotId: string, spotName: string) => {
    if (confirm(`⚠️ ATENÇÃO: Remover TODAS as observações de "${spotName}"?\n\nIsso limpará dados que podem estar poluindo o aprendizado.`)) {
      // Filtrar observações do spot
      const toDelete = observations.filter(o => o.spotId === spotId);
      
      if (toDelete.length === 0) {
        alert('ℹ️ Nenhuma observação encontrada para este pico');
        return;
      }
      
      // Deletar todas do spot
      let deleted = 0;
      for (const obs of toDelete) {
        const success = await deleteObservation(obs.id);
        if (success) deleted++;
      }
      
      alert(`✅ ${deleted} observação(ões) removida(s) de ${spotName}`);
      await refreshData();
    }
  };
  
  const handleClearAll = async () => {
    if (confirm('⚠️ ATENÇÃO: Limpar TODO o banco de observações?\n\nEsta ação NÃO pode ser desfeita!')) {
      if (confirm('🚨 CONFIRMAÇÃO FINAL: Tem certeza absoluta?')) {
        const success = await deleteAllObservationsApi();
        if (success) {
          alert(`🗑️ Banco limpo: todas as observações removidas`);
          await refreshData();
        } else {
          alert('❌ Erro ao limpar banco. Verifique o console.');
        }
      }
    }
  };
  
  const handleToggleCalibration = async (obsId: string, currentState: boolean | undefined, spotName: string) => {
    // Por padrão, observações sem o campo são consideradas ATIVAS (true)
    const isCurrentlyEnabled = currentState !== false;
    const newState = !isCurrentlyEnabled;
    
    console.log(`🔄 Toggle calibração: ${spotName} - De ${isCurrentlyEnabled ? 'ATIVA' : 'OFF'} para ${newState ? 'ATIVA' : 'OFF'}`);
    
    const success = await updateObservationCalibration(obsId, newState);
    
    if (success) {
      console.log(`✅ Calibração ${newState ? '🟢 ATIVADA' : '⚪ DESATIVADA'} para ${spotName}`);
      await refreshData();
    } else {
      alert('❌ Erro ao atualizar calibração. Verifique o console.');
    }
  };
  
  // Filtrar observações
  const filteredObservations = observations.filter(obs => {
    const matchesSearch = obs.spotName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         obs.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpot = filterSpot === 'all' || obs.spotId === filterSpot;
    return matchesSearch && matchesSpot;
  });
  
  // Lista de picos únicos
  const uniqueSpots = Array.from(new Set(observations.map(o => o.spotId)))
    .map(spotId => ({
      id: spotId,
      name: observations.find(o => o.spotId === spotId)?.spotName || ''
    }));
  
  // Estatísticas
  const totalObs = filteredObservations.length;
  const avgError = filteredObservations.length > 0
    ? filteredObservations.reduce((sum, o) => sum + Math.abs(o.error), 0) / filteredObservations.length
    : 0;
  const superestimadas = filteredObservations.filter(o => o.error > 10).length;
  const subestimadas = filteredObservations.filter(o => o.error < -10).length;
  
  // Análise da fonte de dados (Open-Meteo)
  // O campo 'error' já vem calculado como percentual
  const avgErrorPercent = filteredObservations.length > 0
    ? filteredObservations.reduce((sum, o) => sum + Math.abs(o.error || 0), 0) / filteredObservations.length
    : 0;
  
  const goodPredictions = filteredObservations.filter(o => {
    const absError = Math.abs(o.error || 0);
    return absError < 20;
  }).length;
  
  const moderatePredictions = filteredObservations.filter(o => {
    const absError = Math.abs(o.error || 0);
    return absError >= 20 && absError < 40;
  }).length;
  
  const badPredictions = filteredObservations.filter(o => {
    const absError = Math.abs(o.error || 0);
    return absError >= 40;
  }).length;
  
  return (
    <AdminLayout currentPage="observations">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📋 Observações</h1>
            <p className="text-gray-500 mt-1">Histórico completo de observações registradas</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowObservationForm(true)}
              variant="default"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Observação
            </Button>
            
            {observations.length > 0 && (
              <Button 
                onClick={handleClearAll}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar Tudo
              </Button>
            )}
          </div>
        </div>
        
        {/* Stats Cards - Linha 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Observações</p>
            <p className="text-2xl font-bold text-gray-900">{totalObs}</p>
          </Card>
          
          <Card className="p-4">
            <p className="text-sm text-gray-500">Erro Médio</p>
            <p className="text-2xl font-bold text-gray-900">{avgError.toFixed(1)}%</p>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <p className="text-sm text-gray-500">Superestimadas</p>
            </div>
            <p className="text-2xl font-bold text-red-600">{superestimadas}</p>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-green-500" />
              <p className="text-sm text-gray-500">Subestimadas</p>
            </div>
            <p className="text-2xl font-bold text-green-600">{subestimadas}</p>
          </Card>
        </div>
        
        {/* 🔬 Análise da Fonte de Dados (Open-Meteo) */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔬</span>
            <div>
              <h3 className="font-bold text-gray-900">Diagnóstico da Fonte (Open-Meteo API)</h3>
              <p className="text-sm text-gray-600">Análise de precisão baseada nas suas observações reais</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-white">
              <p className="text-sm text-gray-500 mb-1">Erro Médio %</p>
              <p className="text-3xl font-bold mb-2" style={{
                color: avgErrorPercent < 30 ? '#16a34a' : avgErrorPercent < 50 ? '#f59e0b' : '#dc2626'
              }}>
                {avgErrorPercent.toFixed(1)}%
              </p>
              <Badge variant={avgErrorPercent < 30 ? "default" : avgErrorPercent < 50 ? "secondary" : "destructive"} className="text-xs">
                {avgErrorPercent < 30 ? '✅ Confiável' : avgErrorPercent < 50 ? '⚠️ Moderado' : '❌ Impreciso'}
              </Badge>
            </Card>
            
            <Card className="p-4 bg-white">
              <p className="text-sm text-gray-500 mb-1">Boas (&lt;20%)</p>
              <p className="text-3xl font-bold text-green-600 mb-2">{goodPredictions}</p>
              <p className="text-xs text-gray-500">
                {totalObs > 0 ? ((goodPredictions / totalObs) * 100).toFixed(0) : 0}% do total
              </p>
            </Card>
            
            <Card className="p-4 bg-white">
              <p className="text-sm text-gray-500 mb-1">Moderadas (20-40%)</p>
              <p className="text-3xl font-bold text-yellow-600 mb-2">{moderatePredictions}</p>
              <p className="text-xs text-gray-500">
                {totalObs > 0 ? ((moderatePredictions / totalObs) * 100).toFixed(0) : 0}% do total
              </p>
            </Card>
            
            <Card className="p-4 bg-white">
              <p className="text-sm text-gray-500 mb-1">Ruins (&gt;40%)</p>
              <p className="text-3xl font-bold text-red-600 mb-2">{badPredictions}</p>
              <p className="text-xs text-gray-500">
                {totalObs > 0 ? ((badPredictions / totalObs) * 100).toFixed(0) : 0}% do total
              </p>
            </Card>
          </div>
          
          {/* Recomendação baseada nos dados */}
          {totalObs >= 5 && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-gray-900 mb-1">
                💡 {avgErrorPercent > 50 ? 'Recomendação Crítica:' : avgErrorPercent > 30 ? 'Recomendação:' : 'Status:'}
              </p>
              <p className="text-sm text-gray-700">
                {avgErrorPercent > 50 
                  ? `A Open-Meteo está com ${avgErrorPercent.toFixed(0)}% de erro médio. Considere fonte alternativa (NOAA, Stormglass) ou aumente peso das boias PNBOIA.`
                  : avgErrorPercent > 30
                  ? `Erro de ${avgErrorPercent.toFixed(0)}% indica que o bias correction das boias PNBOIA é essencial. Continue coletando observações.`
                  : `Qualidade boa (${avgErrorPercent.toFixed(0)}% erro). O sistema de bias correction está refinando bem as previsões.`
                }
              </p>
            </div>
          )}
        </Card>
        
        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por pico ou notas..."
                className="pl-10"
              />
            </div>
          </div>
          
          <select
            value={filterSpot}
            onChange={(e) => setFilterSpot(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os picos</option>
            {uniqueSpots.map(spot => (
              <option key={spot.id} value={spot.id}>{spot.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Observations Table */}
      {filteredObservations.length > 0 ? (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data/Hora</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pico</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">API (Offshore)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Boia</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Previsto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Real</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Erro</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Calibração</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confiança</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qualidade</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contexto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredObservations.slice().reverse().map(obs => {
                  // API Offshore (puro, sem multiplicador)
                  const offshoreRaw = obs.offshore.height;
                  
                  // Boia PNBOIA (se disponível) - SEM FALLBACK PARA OFFSHORE!
                  const buoyHeight = obs.buoy?.height;  // null se não houver dados de boia
                  const hasBuoyData = buoyHeight !== null && buoyHeight !== undefined;
                  
                  // Calcular confiança (quantas observações deste pico)
                  const spotObsCount = observations.filter(o => o.spotId === obs.spotId).length;
                  const confidenceLevel = spotObsCount >= 30 ? 'high' : spotObsCount >= 10 ? 'medium' : 'low';
                  const confidencePercent = Math.min((spotObsCount / 30) * 100, 100);
                  
                  return (
                    <tr key={obs.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <div>{new Date(obs.timestamp).toLocaleDateString('pt-BR')}</div>
                        <div className="text-gray-500 text-xs">{obs.context.sessionTime}</div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {obs.spotName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{offshoreRaw.toFixed(2)}m</div>
                        <div className="text-xs">{obs.offshore.period}s {obs.offshore.directionLabel}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-600">
                        <div>
                          {hasBuoyData ? `${buoyHeight.toFixed(2)}m` : (
                            <span className="text-gray-400 text-xs">N/A</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          {hasBuoyData ? `PNBOIA ${obs.buoy?.buoyId || ''}` : 'Sem dados de boia'}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        <div>{obs.forecast.height.toFixed(2)}m</div>
                        <div className="text-xs text-gray-400">
                          × {obs.forecast.multiplier.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {obs.observed.height.toFixed(2)}m
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge 
                          className={
                            Math.abs(obs.error) < 10
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'  // 🔵 AZUL: Erro pequeno (±10%)
                              : obs.error < 0
                                ? 'bg-red-600 hover:bg-red-700 text-white'  // 🔴 VERMELHO: Superestimou (< -10%)
                                : 'bg-green-600 hover:bg-green-700 text-white'  // 🟢 VERDE: Subestimou (> +10%)
                          }
                        >
                          {obs.error > 0 ? '+' : ''}{obs.error.toFixed(0)}%
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {(() => {
                            // Por padrão, observações sem o campo são consideradas ATIVAS
                            const isEnabled = obs.calibrationEnabled !== false;
                            
                            return (
                              <>
                                <button
                                  onClick={() => handleToggleCalibration(obs.id, isEnabled, obs.spotName)}
                                  className={`
                                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                    ${isEnabled 
                                      ? 'bg-green-600 hover:bg-green-700' 
                                      : 'bg-gray-400 hover:bg-gray-500'
                                    }
                                  `}
                                  role="switch"
                                  aria-checked={isEnabled}
                                  style={{
                                    backgroundColor: isEnabled ? '#16a34a' : '#9ca3af'
                                  }}
                                >
                                  <span
                                    className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md"
                                    style={{
                                      transform: isEnabled ? 'translateX(1.5rem)' : 'translateX(0.25rem)'
                                    }}
                                  />
                                </button>
                                <span 
                                  className={`text-sm font-medium`}
                                  style={{
                                    color: isEnabled ? '#16a34a' : '#6b7280'
                                  }}
                                >
                                  {isEnabled ? '🟢 Ativa' : '⚪ OFF'}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            confidenceLevel === 'high' ? 'default' :
                            confidenceLevel === 'medium' ? 'secondary' :
                            'outline'
                          } className="text-xs">
                            {confidenceLevel === 'high' ? '🟢' :
                             confidenceLevel === 'medium' ? '🟡' : '🔴'}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {spotObsCount}/30
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {'⭐'.repeat(obs.observed.quality)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 max-w-xs">
                        <div>Maré: {obs.context.tide === 'low' ? 'Baixa' : obs.context.tide === 'mid' ? 'Média' : 'Alta'}</div>
                        {obs.context.wind && <div className="text-xs">{obs.context.wind}</div>}
                        {obs.notes && <div className="text-xs text-gray-400 truncate mt-1">{obs.notes}</div>}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteSingleObservation(
                            obs.id, 
                            obs.spotName, 
                            new Date(obs.timestamp).toLocaleDateString('pt-BR')
                          )}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Remover esta observação"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchQuery || filterSpot !== 'all' ? 'Nenhuma observação encontrada' : 'Nenhuma Observação Ainda'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || filterSpot !== 'all' 
              ? 'Tente outros filtros de busca'
              : 'Comece registrando suas primeiras observações após surfar'}
          </p>
          {!searchQuery && filterSpot === 'all' && (
            <Button 
              onClick={() => setShowObservationForm(true)}
              variant="default"
            >
              <Plus className="w-4 h-4 mr-2" />
              Registrar Primeira Observação
            </Button>
          )}
        </Card>
      )}
      
      {/* Observation Form Modal */}
      {showObservationForm && (
        <ObservationForm
          onClose={() => setShowObservationForm(false)}
          onSaved={refreshData}
        />
      )}
    </AdminLayout>
  );
}
