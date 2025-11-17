import { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart3,
  Activity,
  Award,
  AlertCircle,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import {
  calculateOverallStats,
  calculateSpotStats,
  calculateTemporalTrends,
  calculatePNBOIAImpact,
  getTopPreciseSpots,
  getSpotsNeedingAttention,
  getRankedCalibrationOpportunities,
  SpotStats
} from '../../services/analytics/statisticsEngine';
import { observationLog, loadFromLocalStorage } from '../../data/calibration/observationLog';

export function AnalyticsPageSimple() {
  const [activeTab, setActiveTab] = useState<'overview' | 'spots' | 'timeline' | 'pnboia'>('overview');
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadFromLocalStorage();
    setRefreshKey(prev => prev + 1);
  }, []);

  const overallStats = calculateOverallStats(observationLog);
  const temporalTrends = calculateTemporalTrends(observationLog);
  const pnboiaImpact = calculatePNBOIAImpact(observationLog);
  const topSpots = getTopPreciseSpots(5, observationLog);
  const needAttention = getSpotsNeedingAttention(5, observationLog);
  const calibrationOps = getRankedCalibrationOpportunities(observationLog);

  if (selectedSpotId) {
    const spotStats = calculateSpotStats(selectedSpotId, observationLog);
    if (spotStats) {
      return <SpotAnalyticsDetail spotStats={spotStats} onBack={() => setSelectedSpotId(null)} />;
    }
  }

  return (
    <AdminLayout currentPage="analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📊 Analytics</h1>
            <p className="text-gray-500 mt-1">Insights e tendências do sistema de previsão</p>
          </div>
          <Button 
            onClick={() => {
              loadFromLocalStorage();
              setRefreshKey(prev => prev + 1);
            }}
            variant="outline"
          >
            <Activity className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>

        {/* Cards de Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Observações</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{overallStats.totalObservations}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Precisão Média</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{overallStats.precision.toFixed(0)}%</p>
                <p className="text-xs text-gray-400 mt-1">Erro: ±{overallStats.avgErrorAbs.toFixed(0)}%</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                overallStats.precision >= 85 ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                <Target className={`w-6 h-6 ${
                  overallStats.precision >= 85 ? 'text-green-600' : 'text-yellow-600'
                }`} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Previsões Boas</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {overallStats.goodPredictions}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {overallStats.totalObservations > 0 
                    ? ((overallStats.goodPredictions / overallStats.totalObservations) * 100).toFixed(0)
                    : 0}% do total
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Precisam Atenção</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {calibrationOps.critical.length + calibrationOps.high.length}
                </p>
                <p className="text-xs text-gray-400 mt-1">Picos para calibrar</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs Simples */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex space-x-2 p-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📊 Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('spots')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'spots'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🏖️ Por Pico
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'timeline'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📈 Timeline
              </button>
              <button
                onClick={() => setActiveTab('pnboia')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'pnboia'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⚓ PNBOIA
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* TAB: Visão Geral */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Top Picos */}
                {topSpots.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">🏆 Top 5 Picos Precisos</h3>
                    <div className="space-y-3">
                      {topSpots.map((spot, idx) => (
                        <div 
                          key={spot.spotId}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                          onClick={() => setSelectedSpotId(spot.spotId)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-sm">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{spot.spotName}</p>
                              <p className="text-xs text-gray-500">{spot.observations} observações</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">
                              {spot.precision.toFixed(0)}%
                            </Badge>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Picos que Precisam Atenção */}
                {needAttention.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">⚠️ Picos que Precisam Atenção</h3>
                    <div className="space-y-3">
                      {needAttention.map((spot) => (
                        <div 
                          key={spot.spotId}
                          className="flex items-center justify-between p-4 border border-orange-200 bg-orange-50 rounded-lg hover:bg-orange-100 cursor-pointer transition-colors"
                          onClick={() => setSelectedSpotId(spot.spotId)}
                        >
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                            <div>
                              <p className="font-medium text-gray-900">{spot.spotName}</p>
                              <p className="text-sm text-gray-600">
                                Erro médio: {spot.avgError > 0 ? '+' : ''}{spot.avgError.toFixed(0)}% 
                                ({spot.avgError > 0 ? 'superestimando' : 'subestimando'})
                              </p>
                              <p className="text-xs text-gray-500">{spot.observations} observações</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-orange-300 text-orange-700">
                              {spot.precision.toFixed(0)}% precisão
                            </Badge>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {topSpots.length === 0 && needAttention.length === 0 && (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Ainda não há observações suficientes para análise.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Adicione observações na aba "Observações" para ver os dados aqui!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Por Pico */}
            {activeTab === 'spots' && (
              <div className="space-y-6">
                {calibrationOps.critical.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-red-900 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      PRIORIDADE CRÍTICA 🔴
                    </h4>
                    <div className="space-y-2">
                      {calibrationOps.critical.map(spot => (
                        <SpotCalibrationCard 
                          key={spot.spotId} 
                          spot={spot} 
                          onClick={() => setSelectedSpotId(spot.spotId)}
                          priority="critical"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {calibrationOps.high.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-orange-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      PRIORIDADE ALTA 🟡
                    </h4>
                    <div className="space-y-2">
                      {calibrationOps.high.map(spot => (
                        <SpotCalibrationCard 
                          key={spot.spotId} 
                          spot={spot} 
                          onClick={() => setSelectedSpotId(spot.spotId)}
                          priority="high"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {calibrationOps.calibrated.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-green-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      JÁ CALIBRADOS ✅
                    </h4>
                    <div className="space-y-2">
                      {calibrationOps.calibrated.slice(0, 5).map(spot => (
                        <SpotCalibrationCard 
                          key={spot.spotId} 
                          spot={spot} 
                          onClick={() => setSelectedSpotId(spot.spotId)}
                          priority="calibrated"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {calibrationOps.critical.length === 0 && 
                 calibrationOps.high.length === 0 && 
                 calibrationOps.calibrated.length === 0 && (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Ainda não há dados suficientes para análise por pico.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Timeline */}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                {temporalTrends.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-900 font-medium">Primeira Observação</p>
                        <p className="text-2xl font-bold text-blue-900 mt-1">
                          {new Date(temporalTrends[0].date).toLocaleDateString('pt-BR')}
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                          Precisão: {temporalTrends[0].precision.toFixed(0)}%
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-900 font-medium">Última Observação</p>
                        <p className="text-2xl font-bold text-green-900 mt-1">
                          {new Date(temporalTrends[temporalTrends.length - 1].date).toLocaleDateString('pt-BR')}
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                          Precisão: {temporalTrends[temporalTrends.length - 1].precision.toFixed(0)}%
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-900 font-medium">Período Total</p>
                        <p className="text-2xl font-bold text-purple-900 mt-1">
                          {Math.ceil((new Date(temporalTrends[temporalTrends.length - 1].date).getTime() - 
                            new Date(temporalTrends[0].date).getTime()) / (1000 * 60 * 60 * 24))} dias
                        </p>
                        <p className="text-sm text-purple-700 mt-1">
                          {temporalTrends.length} dias com dados
                        </p>
                      </div>
                    </div>

                    {temporalTrends.length >= 2 && (
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300">
                        <div className="flex items-center gap-3 mb-2">
                          <TrendingUp className="w-6 h-6 text-blue-600" />
                          <h4 className="text-lg font-bold text-blue-900">Evolução do Sistema</h4>
                        </div>
                        <p className="text-blue-900">
                          Sistema evoluiu de{' '}
                          <strong className="text-2xl">{temporalTrends[0].precision.toFixed(0)}%</strong>
                          {' '}para{' '}
                          <strong className="text-2xl">{temporalTrends[temporalTrends.length - 1].precision.toFixed(0)}%</strong>
                          {' '}de precisão
                        </p>
                        {temporalTrends[temporalTrends.length - 1].precision > temporalTrends[0].precision && (
                          <p className="text-green-700 mt-2 font-semibold">
                            🎉 Melhoria de +{(temporalTrends[temporalTrends.length - 1].precision - temporalTrends[0].precision).toFixed(0)} pontos!
                          </p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Sem dados suficientes para análise temporal
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: PNBOIA */}
            {activeTab === 'pnboia' && (
              <div className="space-y-6">
                {pnboiaImpact ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">❌ Sem PNBOIA (antes Out/2024)</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Observações:</span>
                            <span className="font-semibold">{pnboiaImpact.withoutPNBOIA.observations}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Erro médio:</span>
                            <span className="font-semibold">±{pnboiaImpact.withoutPNBOIA.avgError.toFixed(0)}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Precisão:</span>
                            <span className="font-semibold">{pnboiaImpact.withoutPNBOIA.precision.toFixed(0)}%</span>
                          </div>
                        </div>
                        <div className="mt-3 h-2 bg-gray-300 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gray-500"
                            style={{ width: `${pnboiaImpact.withoutPNBOIA.precision}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-300">
                        <p className="text-sm text-blue-900 font-medium mb-2">✅ Com PNBOIA (depois Out/2024)</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-800">Observações:</span>
                            <span className="font-semibold text-blue-900">{pnboiaImpact.withPNBOIA.observations}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-800">Erro médio:</span>
                            <span className="font-semibold text-blue-900">±{pnboiaImpact.withPNBOIA.avgError.toFixed(0)}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-800">Precisão:</span>
                            <span className="font-semibold text-blue-900">{pnboiaImpact.withPNBOIA.precision.toFixed(0)}%</span>
                          </div>
                        </div>
                        <div className="mt-3 h-2 bg-blue-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600"
                            style={{ width: `${pnboiaImpact.withPNBOIA.precision}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                      <div className="flex items-center gap-3 mb-4">
                        <Award className="w-8 h-8 text-green-600" />
                        <h4 className="text-lg font-bold text-green-900">Melhoria Alcançada</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-green-800">Aumento de Precisão</p>
                          <p className="text-3xl font-bold text-green-900">
                            +{pnboiaImpact.improvement.toFixed(0)} pontos
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-green-800">Redução de Erro</p>
                          <p className="text-3xl font-bold text-green-900">
                            {pnboiaImpact.errorReduction.toFixed(0)}% menos erro
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-green-800 mt-4">
                        🎉 PNBOIA está funcionando e melhorando significativamente a precisão das previsões!
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Ainda não há dados suficientes para comparar impacto do PNBOIA.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Continue registrando observações para ver a evolução!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// Componente para card de pico
function SpotCalibrationCard({ 
  spot, 
  onClick, 
  priority 
}: { 
  spot: SpotStats; 
  onClick: () => void;
  priority: 'critical' | 'high' | 'calibrated';
}) {
  const bgColor = {
    critical: 'bg-red-50 border-red-200 hover:bg-red-100',
    high: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    calibrated: 'bg-green-50 border-green-200 hover:bg-green-100',
  }[priority];

  const icon = {
    critical: <AlertCircle className="w-5 h-5 text-red-600" />,
    high: <AlertTriangle className="w-5 h-5 text-orange-600" />,
    calibrated: <CheckCircle2 className="w-5 h-5 text-green-600" />,
  }[priority];

  return (
    <div 
      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${bgColor}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="font-medium text-gray-900">{spot.spotName}</p>
          <p className="text-sm text-gray-600">
            {spot.avgError > 0 ? 'Superestimando' : 'Subestimando'} {Math.abs(spot.avgError).toFixed(0)}%
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">
              {spot.observations} obs
            </Badge>
            <Badge variant="outline" className="text-xs">
              {spot.confidence === 'high' ? 'Alta' : spot.confidence === 'medium' ? 'Média' : 'Baixa'} confiança
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={spot.precision >= 90 ? 'default' : 'secondary'}>
          {spot.precision.toFixed(0)}%
        </Badge>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}

// Componente de análise detalhada de um pico
function SpotAnalyticsDetail({ spotStats, onBack }: { spotStats: SpotStats; onBack: () => void }) {
  return (
    <AdminLayout currentPage="analytics">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Button onClick={onBack} variant="ghost" className="mb-4">
            ← Voltar
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">🏖️ {spotStats.spotName}</h1>
          <p className="text-gray-500 mt-1">Análise detalhada de calibração</p>
        </div>

        {/* Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <p className="text-sm text-gray-500">Observações</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{spotStats.observations}</p>
            <Badge variant="outline" className="mt-2">
              {spotStats.confidence === 'high' ? 'Alta' : spotStats.confidence === 'medium' ? 'Média' : 'Baixa'} confiança
            </Badge>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-gray-500">Erro Médio</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {spotStats.avgError > 0 ? '+' : ''}{spotStats.avgError.toFixed(0)}%
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {spotStats.avgError > 0 ? 'Superestimando' : 'Subestimando'}
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-gray-500">Precisão</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{spotStats.precision.toFixed(0)}%</p>
            <Badge variant={spotStats.precision >= 90 ? 'default' : 'secondary'} className="mt-2">
              {spotStats.status === 'excellent' ? 'Excelente' : 
               spotStats.status === 'good' ? 'Bom' : 
               spotStats.status === 'ok' ? 'OK' : 'Precisa atenção'}
            </Badge>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-gray-500">Desvio Padrão</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">±{spotStats.stdDev.toFixed(0)}%</p>
            <p className="text-xs text-gray-500 mt-2">
              {spotStats.stdDev < 10 ? 'Consistente' : 'Variável'}
            </p>
          </Card>
        </div>

        {/* Erro por Direção */}
        {spotStats.errorsByDirection.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">🧭 Erro por Direção de Swell</h3>
            <div className="space-y-3">
              {spotStats.errorsByDirection.map(dir => (
                <div key={dir.direction} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {dir.direction} ({dir.degRange[0]}° - {dir.degRange[1]}°)
                    </p>
                    <p className="text-sm text-gray-600">
                      {dir.observations} observaç{dir.observations === 1 ? 'ão' : 'ões'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {dir.avgError > 0 ? '+' : ''}{dir.avgError.toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-500">
                        {dir.status === 'good' ? '🟢 Bom' : dir.status === 'ok' ? '🟡 OK' : '🔴 Ruim'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Recomendação */}
        {spotStats.recommendedAdjustment ? (
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">💡 Recomendação Automática</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-blue-800">Novo Shoaling Factor Sugerido</p>
                <p className="text-3xl font-bold text-blue-900">
                  {spotStats.recommendedAdjustment.shoalingFactor.toFixed(2)}
                </p>
                {spotStats.currentAdjustment && (
                  <p className="text-sm text-blue-700 mt-1">
                    {spotStats.recommendedAdjustment.shoalingFactor > spotStats.currentAdjustment.shoalingFactor ? '↑' : '↓'} 
                    {' '}
                    {Math.abs(((spotStats.recommendedAdjustment.shoalingFactor / spotStats.currentAdjustment.shoalingFactor) - 1) * 100).toFixed(0)}% 
                    vs atual ({spotStats.currentAdjustment.shoalingFactor.toFixed(2)})
                  </p>
                )}
              </div>

              <div className="p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Precisão Esperada</p>
                <p className="text-2xl font-bold text-green-600">
                  {spotStats.recommendedAdjustment.expectedPrecision}%
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <p className="text-sm text-green-700">
                    +{spotStats.recommendedAdjustment.improvementPercent} pontos de melhoria
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6 bg-green-50 border-2 border-green-300">
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">✅ Pico Bem Calibrado!</h3>
              <p className="text-sm text-green-700">
                Precisão de {spotStats.precision.toFixed(0)}% está excelente.
                <br />
                Continue monitorando para manter a qualidade.
              </p>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
