import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { X, Save, AlertCircle } from 'lucide-react';
import { brazilianSurfSpots } from '../../data/spots';
import { addObservation } from '../../data/calibration/observationLog';
import { getWaveData } from '../../services/waveApi';
import { saveObservation } from '../../services/observationsApi';

interface ObservationFormProps {
  onClose: () => void;
  onSaved: () => void;
  preselectedSpotId?: string;
}

export function ObservationForm({ onClose, onSaved, preselectedSpotId }: ObservationFormProps) {
  const [spotId, setSpotId] = useState(preselectedSpotId || '');
  const [observedHeight, setObservedHeight] = useState('');
  const [quality, setQuality] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [tide, setTide] = useState<'low' | 'mid' | 'high'>('mid');
  const [wind, setWind] = useState('');
  const [notes, setNotes] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  
  // Auto-preencher com dados de forecast
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  // Buscar todos os spots para o dropdown
  const safeSpots = Array.isArray(brazilianSurfSpots) ? brazilianSurfSpots : [];
  
  const allSpots = safeSpots.flatMap(state => {
    if (!state?.cities) return [];
    return (state.cities || []).flatMap(city => {
      if (!city?.beaches) return [];
      return (city.beaches || []).flatMap(beach => {
        if (!beach?.spots) return [];
        return (beach.spots || [])
          .filter(spot => spot && spot.id && spot.name)
          .map(spot => ({
            id: spot.id,
            name: spot.name,
            city: city.name,
            state: state.name
          }));
      });
    });
  }).filter(Boolean);
  
  // Carregar forecast quando spot for selecionado
  useEffect(() => {
    if (spotId) {
      loadForecast();
    }
  }, [spotId]);
  
  const loadForecast = async () => {
    if (!spotId) return;
    
    setLoading(true);
    try {
      const spot = allSpots.find(s => s.id === spotId);
      if (!spot) return;
      
      const fullSpot = brazilianSurfSpots
        .flatMap(s => s?.cities || [])
        .flatMap(c => c?.beaches || [])
        .flatMap(b => b?.spots || [])
        .find(s => s.id === spotId);
      
      if (fullSpot) {
        const data = await getWaveData(fullSpot);
        setForecastData(data);
        
        // Auto-preencher hora atual
        const now = new Date();
        setSessionTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
      }
    } catch (error) {
      console.error('Erro ao carregar forecast:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async () => {
    if (!spotId || !observedHeight || !forecastData) {
      alert('Preencha pelo menos: Pico, Altura Observada');
      return;
    }
    
    const spot = allSpots.find(s => s.id === spotId);
    if (!spot) return;
    
    const current = forecastData.current;
    const firstHourly = forecastData.hourly?.[0];
    
    const forecastHeight = current.height;
    const offshoreHeight = firstHourly?.offshoreHeight ?? current.height;
    const buoyHeight = firstHourly?.buoyHeight ?? null;
    const buoyId = firstHourly?.buoyId ?? 'N/A';
    
    console.log('📊 DADOS PARA OBSERVAÇÃO:');
    console.log('   🎯 PREVISTO (site):', forecastHeight.toFixed(2), 'm');
    console.log('   🏖️  OFFSHORE (API):', offshoreHeight.toFixed(2), 'm');
    console.log('   🌊 BOIA PNBOIA:', buoyHeight?.toFixed(2) || 'N/A', 'm');
    console.log('   🆔 BOIA ID:', buoyId);
    console.log('   🔢 MULTIPLICADOR:', (forecastHeight / offshoreHeight).toFixed(2));
    
    // Perguntar se quer calibrar ANTES de salvar
    // ✅ CORRIGIDO: (Real - Previsto) / Previsto × 100
    const erroPrevisao = ((parseFloat(observedHeight) - forecastHeight) / forecastHeight * 100);
    const erroAbsoluto = Math.abs(erroPrevisao);
    const ERRO_THRESHOLD = 15;
    
    let calibrationEnabled = false;
    
    if (erroAbsoluto > ERRO_THRESHOLD) {
      const fatorSugerido = (parseFloat(observedHeight) / forecastHeight).toFixed(3);
      const percentualAjuste = ((parseFloat(fatorSugerido) - 1) * 100).toFixed(0);
      const direcao = parseFloat(fatorSugerido) > 1 ? 'aumentar' : 'reduzir';
      
      const mensagem = `🎯 CALIBRAÇÃO AUTOMÁTICA DISPONÍVEL\n\n` +
        `Pico: ${spot.name}\n` +
        `Erro detectado: ${erroAbsoluto.toFixed(0)}% (>${ERRO_THRESHOLD}%)\n\n` +
        `Previsto: ${forecastHeight.toFixed(2)}m\n` +
        `Observado: ${parseFloat(observedHeight).toFixed(2)}m\n\n` +
        `💡 Sugestão: ${direcao} previsões em ${Math.abs(parseFloat(percentualAjuste))}%\n` +
        `Fator de ajuste: ${fatorSugerido}x\n\n` +
        `⚡ ATIVAR calibração automática para este pico?\n\n` +
        `✅ Se SIM: As próximas previsões serão ajustadas automaticamente\n` +
        `❌ Se NÃO: Observação fica registrada, mas NÃO afeta o site`;
      
      calibrationEnabled = confirm(mensagem);
      
      if (calibrationEnabled) {
        console.log(`✅ [CALIBRAÇÃO] Ajuste automático ATIVADO para ${spot.name}`);
      } else {
        console.log(`⚠️ [CALIBRAÇÃO] Usuário optou por NÃO ativar ajuste para ${spot.name}`);
      }
    }
    
    // Criar observação com flag de calibração
    const observation = addObservation({
      spotId,
      spotName: spot.name,
      offshore: {
        height: offshoreHeight,
        period: current.period,
        direction: typeof current.direction === 'string' ? 0 : current.direction,
        directionLabel: typeof current.direction === 'string' ? current.direction : getDirectionLabel(current.direction)
      },
      ...(buoyHeight && {
        buoy: {
          height: buoyHeight,
          period: firstHourly?.wavePeriod || current.period,
          direction: firstHourly?.waveDirection || 0,
          buoyId: buoyId,
          correctionApplied: current.biasCorrected || false
        }
      }),
      forecast: {
        height: forecastHeight,
        multiplier: forecastHeight / offshoreHeight,
        source: 'manual'
      },
      observed: {
        height: parseFloat(observedHeight),
        quality
      },
      context: {
        tide,
        wind: wind || 'N/A',
        sessionTime: sessionTime || new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      },
      notes,
      confidence: 'high',
      calibrationEnabled
    });
    
    console.log('📝 Salvando observação no servidor...', observation);
    console.log('🔧 Calibração ativada:', calibrationEnabled);
    
    const saved = await saveObservation(observation);
    
    if (!saved) {
      alert('❌ Erro ao salvar observação. Verifique o console.');
      return;
    }
    
    console.log('✅ Observação salva no servidor!');
    
    if (calibrationEnabled) {
      const fatorSugerido = (parseFloat(observedHeight) / forecastHeight).toFixed(3);
      alert(`✅ Calibração ativada!\n\nO site agora ajustará automaticamente as previsões de ${spot.name} usando o fator ${fatorSugerido}x`);
    }
    
    onSaved();
    onClose();
  };
  
  const getDirectionLabel = (deg: number): string => {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return dirs[index];
  };
  
  const selectedSpot = allSpots.find(s => s.id === spotId);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">📝 Registrar Observação</h2>
              <p className="text-sm text-gray-500 mt-1">Compare previsão vs realidade surfada</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Form */}
          <div className="space-y-4">
            {/* Pico */}
            <div>
              <Label>📍 Pico *</Label>
              <select
                value={spotId}
                onChange={(e) => setSpotId(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione um pico...</option>
                {allSpots.map(spot => (
                  <option key={spot.id} value={spot.id}>
                    {spot.name} - {spot.city}, {spot.state}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Forecast auto-preenchido */}
            {forecastData && forecastData.current && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">🌊 Previsão Atual</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-blue-700">Altura:</span>{' '}
                    <span className="font-semibold">{forecastData.current.height.toFixed(2)}m</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Período:</span>{' '}
                    <span className="font-semibold">{forecastData.current.period.toFixed(0)}s</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Altura Observada */}
            <div>
              <Label>🌊 Altura Observada (m) *</Label>
              <Input
                type="number"
                step="0.01"
                value={observedHeight}
                onChange={(e) => setObservedHeight(e.target.value)}
                placeholder="Ex: 1.2"
                className="mt-1"
              />
            </div>
            
            {/* Qualidade */}
            <div>
              <Label>⭐ Qualidade das Ondas</Label>
              <div className="flex gap-2 mt-1">
                {[1, 2, 3, 4, 5].map(q => (
                  <button
                    key={q}
                    onClick={() => setQuality(q as 1 | 2 | 3 | 4 | 5)}
                    className={`px-4 py-2 rounded-lg ${
                      quality === q
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Maré */}
            <div>
              <Label>🌊 Maré</Label>
              <div className="flex gap-2 mt-1">
                {[
                  { value: 'low', label: 'Baixa' },
                  { value: 'mid', label: 'Média' },
                  { value: 'high', label: 'Alta' }
                ].map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTide(t.value as 'low' | 'mid' | 'high')}
                    className={`px-4 py-2 rounded-lg ${
                      tide === t.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Vento */}
            <div>
              <Label>💨 Condição do Vento</Label>
              <Input
                value={wind}
                onChange={(e) => setWind(e.target.value)}
                placeholder="Ex: Vento offshore"
                className="mt-1"
              />
            </div>
            
            {/* Hora */}
            <div>
              <Label>🕐 Hora da Sessão</Label>
              <Input
                type="time"
                value={sessionTime}
                onChange={(e) => setSessionTime(e.target.value)}
                className="mt-1"
              />
            </div>
            
            {/* Notas */}
            <div>
              <Label>📝 Notas (opcional)</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Observações adicionais..."
                className="mt-1"
                rows={3}
              />
            </div>
            
            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSubmit}
                disabled={loading || !spotId || !observedHeight}
                className="flex-1"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Observação
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
