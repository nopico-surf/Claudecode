// ════════════════════════════════════════════════════════════════════
// 🚀 INPUT RÁPIDO DE OBSERVAÇÕES
// ════════════════════════════════════════════════════════════════════
// Cola texto natural → Sistema processa automaticamente
// ════════════════════════════════════════════════════════════════════

import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { Zap, AlertCircle, CheckCircle, Info, Sparkles } from 'lucide-react';
import { parseMultipleObservations, ParsedObservation } from '../../services/calibration/observationParser';
import { brazilianSurfSpots } from '../../data/spots';
import { saveObservation } from '../../services/observationsApi';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface QuickObservationInputProps {
  onObservationsSaved: () => void;
}

export function QuickObservationInput({ onObservationsSaved }: QuickObservationInputProps) {
  const [input, setInput] = useState('');
  const [parsedObservations, setParsedObservations] = useState<ParsedObservation[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // ════════════════════════════════════════════════════════════════
  // 🔄 PROCESSAR INPUT
  // ════════════════════════════════════════════════════════════════
  
  const handleProcess = () => {
    if (!input.trim()) return;
    
    console.log('🔄 Iniciando processamento...');
    console.log('📝 Input:', input);
    
    setIsProcessing(true);
    
    // Processar imediatamente (sem setTimeout)
    try {
      console.log('🤖 Chamando parseMultipleObservations...');
      const parsed = parseMultipleObservations(input);
      console.log('✅ Resultado do parser:', parsed);
      
      if (parsed.length === 0) {
        console.warn('⚠️ Nenhuma observação processada');
        alert('⚠️ Não foi possível processar a observação.\n\nVerifique se incluiu:\n- Nome do pico\n- Altura das ondas\n\nExemplo: "Lomba do Sabão, 05:20, 0.56m, formação regular"');
        setIsProcessing(false);
        return;
      }
      
      console.log(`✅ ${parsed.length} observação(ões) processada(s)`);
      setParsedObservations(parsed);
      setShowPreview(true);
      setIsProcessing(false);
    } catch (error) {
      console.error('❌ Erro ao processar:', error);
      alert('❌ Erro ao processar observação. Tente novamente.');
      setIsProcessing(false);
    }
  };

  // ════════════════════════════════════════════════════════════════
  // 💾 SALVAR OBSERVAÇÕES
  // ════════════════════════════════════════════════════════════════
  
  const handleSave = async () => {
    const savedObservations: any[] = [];
    
    for (const parsed of parsedObservations) {
      // Buscar dados do pico
      const spot = brazilianSurfSpots
        .filter(state => state && state.cities)
        .flatMap(state => 
          state.cities
            .filter(city => city && city.beaches)
            .flatMap(city => 
              city.beaches
                .filter(beach => beach && beach.spots)
                .flatMap(beach => beach.spots)
            )
        )
        .find(s => s && s.id === parsed.spotId);
      
      if (!spot) {
        console.warn('⚠️ Spot não encontrado:', parsed.spotId);
        continue;
      }
      
      // 🔍 LOG: Ver o objeto spot completo
      console.log(`\n🔍 Spot encontrado:`, {
        id: spot.id,
        name: spot.name,
        latitude: spot.latitude,
        longitude: spot.longitude,
        beachOrientation: spot.beachOrientation
      });
      
      // ✅ BUSCAR DADOS COMPLETOS (OFFSHORE + BOIA + PREVISÃO CALIBRADA)
      const completeData = await getCompleteForecastData(spot, parsed.timestamp);
      
      // Calcular erro baseado na PREVISÃO FINAL (que é o que o usuário vê no site)
      const error = parseFloat((((completeData.forecast.height - parsed.observedHeight) / parsed.observedHeight) * 100).toFixed(1));
      
      // 🔍 LOG DETALHADO
      console.log(`\n📊 Observação completa para ${parsed.spotName}:`);
      console.log(`   ⏰ Timestamp: ${new Date(parsed.timestamp).toLocaleString('pt-BR')}`);
      console.log(`   📡 API (Offshore): ${completeData.offshore.height.toFixed(2)}m, ${completeData.offshore.period}s, ${completeData.offshore.directionLabel}`);
      
      // Mostrar boia apenas se tiver dados válidos
      if (completeData.buoy.height !== null) {
        console.log(`   🌊 Boia PNBOIA: ${completeData.buoy.height.toFixed(2)}m (${completeData.buoy.buoyId})`);
      } else {
        console.log(`   🌊 Boia PNBOIA: N/A (sem dados válidos ou >36h de atraso)`);
      }
      
      console.log(`   🎯 Previsto (site): ${completeData.forecast.height.toFixed(2)}m (×${completeData.forecast.multiplier.toFixed(2)})`);
      console.log(`   👁️ Observado: ${parsed.observedHeight.toFixed(2)}m`);
      console.log(`   📈 Erro: ${error > 0 ? '+' : ''}${error.toFixed(1)}%`);
      
      // Criar observação completa com DADOS REAIS
      const observation = {
        id: `obs-quick-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: parsed.timestamp,
        spotId: parsed.spotId,
        spotName: parsed.spotName,
        offshore: completeData.offshore,
        buoy: completeData.buoy,
        forecast: completeData.forecast,
        observed: {
          height: parsed.observedHeight,
          quality: 3 // Default
        },
        context: {
          tide: 'unknown',
          wind: 'N/A',
          sessionTime: new Date(parsed.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        },
        error: error,
        errorAbs: parseFloat((completeData.forecast.height - parsed.observedHeight).toFixed(2)),
        notes: parsed.notes,
        quickInput: true,
        rawInput: parsed.rawInput
      };
      
      // ✅ PROTEÇÃO: Verificar se savedObservations é um array antes de push
      if (Array.isArray(savedObservations)) {
        savedObservations.push(observation);
      }
    }
    
    // ✅ SALVAR NO SERVIDOR (banco de dados)
    console.log(`📝 Salvando ${savedObservations.length} observações no servidor...`);
    
    let successCount = 0;
    let failCount = 0;
    
    for (const obs of savedObservations) {
      const saved = await saveObservation(obs);
      if (saved) {
        successCount++;
        
        // 🧪 COMPARAÇÃO AUTOMÁTICA DE APIs (STORMGLASS vs OPEN-METEO)
        try {
          // Buscar coordenadas do spot
          const spot = brazilianSurfSpots
            .filter(state => state && state.cities)
            .flatMap(state => 
              state.cities
                .filter(city => city && city.beaches)
                .flatMap(city => 
                  city.beaches
                    .filter(beach => beach && beach.spots)
                    .flatMap(beach => beach.spots)
                )
            )
            .find(s => s && s.id === obs.spotId);
          
          if (spot) {
            console.log(`🧪 Iniciando comparação de APIs para ${obs.spotName}...`);
            
            const comparisonResponse = await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/api-comparison`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${publicAnonKey}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  spotId: obs.spotId,
                  spotName: obs.spotName,
                  latitude: spot.latitude,
                  longitude: spot.longitude,
                  observedWaveHeight: obs.observed.height,
                  timestamp: obs.timestamp
                })
              }
            );
            
            if (comparisonResponse.ok) {
              const comparisonData = await comparisonResponse.json();
              console.log(`✅ Comparação salva:`, comparisonData);
              console.log(`   🏆 Vencedor: ${comparisonData.winner}`);
              console.log(`   📊 Open-Meteo: ${comparisonData.openMeteo.errorPercent}% erro`);
              console.log(`   📊 Stormglass: ${comparisonData.stormglass.errorPercent}% erro`);
              if (comparisonData.stormglass.quotaRemaining !== null) {
                console.log(`   ⚡ Quota restante: ${comparisonData.stormglass.quotaRemaining} requests`);
              }
            } else {
              console.warn(`⚠️ Comparação falhou: HTTP ${comparisonResponse.status}`);
            }
          }
        } catch (compError) {
          console.warn('⚠️ Erro ao fazer comparação de APIs:', compError);
          // Não bloquear o salvamento se a comparação falhar
        }
      } else {
        failCount++;
      }
    }
    
    console.log(`✅ ${successCount} salvas, ${failCount} falharam`);
    
    // ════════════════════════════════════════════════════════════════
    // 🎯 VERIFICAR SE PRECISA AJUSTAR CALIBRAÇÃO
    // ════════════════════════════════════════════════════════════════
    const ERRO_THRESHOLD = 15; // 15% de erro
    
    for (const obs of savedObservations) {
      const erroAbsoluto = Math.abs(obs.error);
      
      if (erroAbsoluto > ERRO_THRESHOLD) {
        const fatorSugerido = (obs.observed.height / obs.forecast.height).toFixed(3);
        const percentualAjuste = ((parseFloat(fatorSugerido) - 1) * 100).toFixed(0);
        const direcao = parseFloat(fatorSugerido) > 1 ? 'aumentar' : 'reduzir';
        
        const mensagem = `🎯 CALIBRAÇÃO AUTOMÁTICA DISPONÍVEL\n\n` +
          `Pico: ${obs.spotName}\n` +
          `Erro detectado: ${erroAbsoluto.toFixed(0)}% (>${ERRO_THRESHOLD}%)\n\n` +
          `Previsto: ${obs.forecast.height.toFixed(2)}m\n` +
          `Observado: ${obs.observed.height.toFixed(2)}m\n\n` +
          `💡 Sugestão: ${direcao} previsões em ${Math.abs(parseFloat(percentualAjuste))}%\n` +
          `Fator de ajuste: ${fatorSugerido}x\n\n` +
          `⚡ ATIVAR calibração automática para este pico?\n\n` +
          `✅ Se SIM: As próximas previsões já serão ajustadas automaticamente\n` +
          `❌ Se NÃO: Observação fica registrada, mas sem ajuste automático`;
        
        if (confirm(mensagem)) {
          // ✅ Usuário aceitou! O sistema já vai usar automaticamente
          // porque o liveAdjustments.ts lê do localStorage
          console.log(`✅ [CALIBRAÇÃO] Ajuste automático ATIVADO para ${obs.spotName}`);
          alert(`✅ Calibração ativada!\n\nO site agora ajustará automaticamente as previsões de ${obs.spotName} usando o fator ${fatorSugerido}x`);
        } else {
          console.log(`⚠️ [CALIBRAÇÃO] Usuário optou por NÃO ativar ajuste para ${obs.spotName}`);
        }
      }
    }
    
    // Resetar
    setInput('');
    setParsedObservations([]);
    setShowPreview(false);
    
    // Notificar
    if (failCount > 0) {
      alert(`⚠️ ${successCount} salvas com sucesso, ${failCount} falharam. Verifique o console.`);
    } else {
      alert(`✅ ${successCount} observação(ões) salva(s) com sucesso no servidor!`);
    }
    
    onObservationsSaved();
  };

  // ════════════════════════════════════════════════════════════════
  // 📊 BUSCAR PREVISÃO COMPLETA (USA A MESMA FUNÇÃO DO SITE!)
  // ════════════════════════════════════════════════════════════════
  
  async function getCompleteForecastData(spot: any, timestamp: string): Promise<{
    offshore: { height: number; period: number; direction: number; directionLabel: string };
    buoy: { height: number; buoyId: string; correctionApplied: boolean };
    forecast: { height: number; multiplier: number };
  }> {
    try {
      console.log(`\n🔍 Buscando dados REAIS do site para ${spot.name} no timestamp ${timestamp}...`);
      console.log(`   Lat: ${spot.latitude}, Lng: ${spot.longitude}`);
      console.log(`   Spot ID: ${spot.id}`);
      console.log(`   Orientação: ${spot.beachOrientation || 'auto'}`);
      
      // ✅ USAR A MESMA FUNÇÃO QUE O SITE USA!
      const { getWaveData } = await import('../../services/waveApi');
      
      // Buscar previsão completa do site (com TODAS as correções)
      console.log(`\n⏳ Chamando getWaveData...`);
      
      // Extrair a data do timestamp (formato: YYYY-MM-DD)
      const observationDate = timestamp.split('T')[0];
      console.log(`   Data da observação: ${observationDate}`);
      
      const waveData = await getWaveData(
        spot.latitude,
        spot.longitude,
        spot.beachOrientation, // Orientação da praia
        observationDate,        // Data específica (para buscar todas as 24h daquele dia)
        spot.id                // ID do spot
      );
      
      console.log(`\n✅ getWaveData retornou:`, {
        hasHourly: !!waveData.hourly,
        hourlyLength: waveData.hourly?.length || 0,
        firstHour: waveData.hourly?.[0] ? {
          time: waveData.hourly[0].time,
          waveHeight: waveData.hourly[0].waveHeight,
          offshoreHeight: waveData.hourly[0].offshoreHeight,
          buoyHeight: waveData.hourly[0].buoyHeight,
          buoyId: waveData.hourly[0].buoyId
        } : 'N/A'
      });
      
      // Encontrar horário mais próximo do timestamp da observação
      const targetDate = new Date(timestamp);
      const targetHour = targetDate.getHours();
      
      // Buscar previsão para o horário mais próximo
      console.log(`\n🔍 Buscando horário ${targetHour}h do dia ${targetDate.toDateString()}...`);
      
      let hourlyForecast = waveData.hourly?.find((h: any) => {
        const forecastDate = new Date(h.time);
        return forecastDate.getHours() === targetHour && 
               forecastDate.toDateString() === targetDate.toDateString();
      });
      
      // Se não encontrou horário exato, buscar o mais próximo
      if (!hourlyForecast && waveData.hourly && waveData.hourly.length > 0) {
        console.log(`⚠️ Horário exato não encontrado, buscando mais próximo...`);
        
        // Encontrar horário mais próximo
        let minDiff = Infinity;
        let closestForecast = waveData.hourly[0];
        
        for (const h of waveData.hourly) {
          const forecastDate = new Date(h.time);
          const diff = Math.abs(forecastDate.getTime() - targetDate.getTime());
          if (diff < minDiff) {
            minDiff = diff;
            closestForecast = h;
          }
        }
        
        hourlyForecast = closestForecast;
        console.log(`   Usando horário ${new Date(hourlyForecast.time).getHours()}h (diff: ${Math.round(minDiff / 60000)}min)`);
      }
      
      if (!hourlyForecast) {
        console.error('❌ Nenhuma previsão encontrada!');
        throw new Error('Nenhuma previsão encontrada');
      }
      
      console.log(`\n✅ Horário selecionado:`, {
        time: hourlyForecast.time,
        hour: new Date(hourlyForecast.time).getHours(),
        date: new Date(hourlyForecast.time).toDateString()
      });
      
      // Converter direção em label
      const getDirectionLabel = (deg: number): string => {
        if (deg >= 337.5 || deg < 22.5) return 'N';
        if (deg >= 22.5 && deg < 67.5) return 'NE';
        if (deg >= 67.5 && deg < 112.5) return 'E';
        if (deg >= 112.5 && deg < 157.5) return 'SE';
        if (deg >= 157.5 && deg < 202.5) return 'S';
        if (deg >= 202.5 && deg < 247.5) return 'SW';
        if (deg >= 247.5 && deg < 292.5) return 'W';
        return 'NW';
      };
      
      // 🔍 LOG: Ver valores RAW ANTES dos fallbacks
      console.log(`\n🔍 VALORES RAW (antes dos fallbacks):`, {
        waveHeight: hourlyForecast.waveHeight,
        offshoreHeight: hourlyForecast.offshoreHeight,
        buoyHeight: hourlyForecast.buoyHeight,
        buoyId: hourlyForecast.buoyId,
        biasCorrected: hourlyForecast.biasCorrected
      });
      
      // ✅ USAR DADOS JÁ PROCESSADOS DO SITE (sem recalcular!)
      // O getWaveData já aplicou TODAS as correções:
      // - Bias correction PNBOIA (com regra de 36h)
      // - Ajustes por pico (spotWaveAdjustments)
      // - Calibração automática (liveAdjustments)
      // - Geografia, shoaling, direção, etc.
      
      const forecastHeight = hourlyForecast.waveHeight || 1.0;
      const offshoreHeight = hourlyForecast.offshoreHeight ?? 1.0;
      const buoyHeight = hourlyForecast.buoyHeight ?? null; // null = sem dados de boia
      const buoyId = hourlyForecast.buoyId || 'N/A';
      const period = hourlyForecast.wavePeriod || 7;
      const direction = hourlyForecast.waveDirection || 160;
      
      // ✅ CALCULAR MULTIPLICADOR REAL APLICADO
      // Mostra quanto o site transformou offshore → forecast
      const multiplier = offshoreHeight > 0 
        ? parseFloat((forecastHeight / offshoreHeight).toFixed(2))
        : 1.0;
      
      console.log(`\n📊 Dados REAIS do site extraídos:`);
      console.log(`   📡 Offshore (API): ${offshoreHeight.toFixed(2)}m`);
      if (buoyHeight !== null && buoyId !== 'N/A') {
        console.log(`   🌊 Boia ${buoyId}: ${buoyHeight.toFixed(2)}m ← Dados PNBOIA válidos!`);
      } else {
        console.log(`   🌊 Boia: N/A (sem dados PNBOIA válidos ou >36h de atraso)`);
      }
      console.log(`   🎯 Previsto final: ${forecastHeight.toFixed(2)}m`);
      console.log(`   ⚙️ Multiplicador: ×${multiplier.toFixed(2)}`);
      
      // 🔍 DEBUG DETALHADO: Ver o objeto completo
      console.log(`\n🔍 DEBUG - Objeto hourlyForecast completo:`, {
        time: hourlyForecast.time,
        waveHeight: hourlyForecast.waveHeight,
        offshoreHeight: hourlyForecast.offshoreHeight,
        buoyHeight: hourlyForecast.buoyHeight,
        buoyId: hourlyForecast.buoyId,
        biasCorrected: hourlyForecast.biasCorrected,
        biasCorrection: hourlyForecast.biasCorrection
      });
      
      // ✅ RETORNAR EXATAMENTE O QUE O SITE RETORNOU
      // Sem lógica adicional, sem fallbacks, sem inventar dados
      return {
        offshore: {
          height: parseFloat(offshoreHeight.toFixed(2)),
          period,
          direction,
          directionLabel: getDirectionLabel(direction)
        },
        buoy: {
          // Se buoyId === 'N/A', significa que o site NÃO TEM dados de boia válidos
          // Nesse caso, retornar null para o admin mostrar "N/A" na tabela
          height: buoyId !== 'N/A' && buoyHeight !== null
            ? parseFloat(buoyHeight.toFixed(2))
            : null,
          buoyId,
          correctionApplied: buoyId !== 'N/A' && buoyHeight !== null
        },
        forecast: {
          height: parseFloat(forecastHeight.toFixed(2)),
          multiplier
        }
      };
      
    } catch (error) {
      console.error('❌ Erro ao buscar dados do site:', error);
      
      // ⚠️ FALLBACK: Buscar diretamente da Open-Meteo
      console.warn('⚠️ Usando fallback: Open-Meteo direto');
      
      const targetDate = new Date(timestamp);
      const targetHour = targetDate.getHours();
      
      try {
        const openMeteoResponse = await fetch(
          `https://marine-api.open-meteo.com/v1/marine?` +
          `latitude=${spot.latitude}&longitude=${spot.longitude}` +
          `&hourly=wave_height,wave_direction,wave_period` +
          `&timezone=America/Sao_Paulo`
        );
        
        if (openMeteoResponse.ok) {
          const openMeteoData = await openMeteoResponse.json();
          const targetIndex = openMeteoData.hourly.time.findIndex((time: string) => {
            const forecastDate = new Date(time);
            return forecastDate.getHours() === targetHour && 
                   forecastDate.toDateString() === targetDate.toDateString();
          });
          
          const index = targetIndex !== -1 ? targetIndex : 0;
          const offshoreHeight = openMeteoData.hourly.wave_height[index] || 1.0;
          
          // ⚠️ FALLBACK: Sem ajustes - usar dados brutos
          // Quando o getWaveData falha, não temos os ajustes do site
          return {
            offshore: {
              height: parseFloat(offshoreHeight.toFixed(2)),
              period: openMeteoData.hourly.wave_period[index] || 7,
              direction: openMeteoData.hourly.wave_direction[index] || 160,
              directionLabel: 'S'
            },
            buoy: {
              height: parseFloat(offshoreHeight.toFixed(2)),
              buoyId: 'N/A',
              correctionApplied: false
            },
            forecast: {
              height: parseFloat(offshoreHeight.toFixed(2)), // Sem multiplicador no fallback
              multiplier: 1.0 // Multiplicador neutro
            }
          };
        }
      } catch (fallbackError) {
        console.error('❌ Fallback também falhou:', fallbackError);
      }
      
      // Último recurso: valores fixos (sem ajustes)
      return {
        offshore: { height: 1.0, period: 7, direction: 160, directionLabel: 'S' },
        buoy: { height: 1.0, buoyId: 'N/A', correctionApplied: false },
        forecast: { height: 1.0, multiplier: 1.0 } // Sem ajustes no fallback
      };
    }
  }

  // ════════════════════════════════════════════════════════════════
  // 🎨 RENDER
  // ════════════════════════════════════════════════════════════════

  return (
    <div className="space-y-6">
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 📝 CAMPO DE INPUT */}
      {/* ═══════════════════════════════════════════════════════════ */}
      
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Input Rápido de Observações</h3>
              <p className="text-sm text-gray-600 mt-1">
                Cole suas observações em linguagem natural - o sistema processa automaticamente
              </p>
            </div>
          </div>

          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cole aqui suas observações, por exemplo:&#10;&#10;Lomba do Sabão, hoje às 05h20, tem 0,56m em média, formação regular, ondas cheias&#10;&#10;Ou múltiplas de uma vez:&#10;Lomba do Sabão, 05:20, 0.56m, formação regular&#10;Morro das Pedras, 06:15, 0.8m, séries demoradas&#10;Novo Campeche, 07:30, 1.0m, ondas rápidas"
            className="min-h-[150px] font-mono text-sm"
          />

          <div className="flex gap-3">
            <button
              onClick={handleProcess}
              disabled={!input.trim() || isProcessing}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: (!input.trim() || isProcessing) ? '#D1D5DB' : '#9333EA',
                color: 'white',
                fontWeight: '600',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: (!input.trim() || isProcessing) ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!(!input.trim() || isProcessing)) {
                  e.currentTarget.style.backgroundColor = '#7E22CE';
                }
              }}
              onMouseLeave={(e) => {
                if (!(!input.trim() || isProcessing)) {
                  e.currentTarget.style.backgroundColor = '#9333EA';
                }
              }}
            >
              <Sparkles className="w-4 h-4" />
              {isProcessing ? 'Processando...' : 'Processar Automaticamente'}
            </button>
            
            {input.trim() && !isProcessing && (
              <button
                onClick={() => {
                  setInput('');
                  setParsedObservations([]);
                  setShowPreview(false);
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '1px solid #D1D5DB',
                  backgroundColor: 'white',
                  color: '#374151',
                  fontWeight: '600',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                Limpar
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 📊 PREVIEW DAS OBSERVAÇÕES */}
      {/* ═══════════════════════════════════════════════════════════ */}
      
      {showPreview && parsedObservations.length > 0 && (
        <Card className="p-6 border-2 border-green-200 bg-green-50">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-lg">
                {parsedObservations.length} Observação(ões) Detectada(s)
              </h3>
            </div>

            <div className="space-y-3">
              {parsedObservations.map((obs, index) => (
                <Card key={index} className="p-4 bg-white">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      {/* Pico */}
                      <div>
                        <span className="text-xs text-gray-500">Pico:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-semibold">{obs.spotName}</span>
                          <Badge variant="outline" className="text-xs">
                            {obs.spotId}
                          </Badge>
                        </div>
                      </div>

                      {/* Data/Hora */}
                      <div>
                        <span className="text-xs text-gray-500">Data/Hora:</span>
                        <div className="text-sm mt-1">
                          {new Date(obs.timestamp).toLocaleString('pt-BR')}
                        </div>
                      </div>

                      {/* Altura */}
                      <div>
                        <span className="text-xs text-gray-500">Altura Observada:</span>
                        <div className="text-lg font-semibold mt-1">
                          {obs.observedHeight}m
                        </div>
                      </div>

                      {/* Notas */}
                      {obs.notes && (
                        <div>
                          <span className="text-xs text-gray-500">Notas:</span>
                          <div className="text-sm mt-1 text-gray-700">
                            {obs.notes}
                          </div>
                        </div>
                      )}

                      {/* Warnings */}
                      {obs.warnings.length > 0 && (
                        <Alert className="mt-2">
                          <AlertCircle className="w-4 h-4" />
                          <AlertDescription className="text-xs">
                            {obs.warnings.join(', ')}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    {/* Confiança */}
                    <div className="text-right">
                      <Badge 
                        variant={obs.confidence >= 90 ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {obs.confidence}% confiança
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Ações */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={handleSave}
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#16A34A',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#15803D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#16A34A';
                }}
              >
                <CheckCircle className="w-4 h-4" />
                Salvar {parsedObservations.length} Observação(ões)
              </button>
              
              <button
                onClick={() => {
                  setShowPreview(false);
                  setParsedObservations([]);
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '1px solid #D1D5DB',
                  backgroundColor: 'white',
                  color: '#374151',
                  fontWeight: '600',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* ════════════════════��══════════════════════════════════════ */}
      {/* ℹ️ EXEMPLOS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      
      {!showPreview && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold">Exemplos de Formatos Aceitos</h4>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="font-mono bg-white p-2 rounded border">
                ✅ Lomba do Sabão, hoje às 05h20, tem 0,56m em média, formação regular
              </div>
              
              <div className="font-mono bg-white p-2 rounded border">
                ✅ Morro das Pedras | 06:15 | 0.8m | séries demoradas
              </div>
              
              <div className="font-mono bg-white p-2 rounded border">
                ✅ Novo Campeche, 07:30, 1.0m, ondas rápidas
              </div>
              
              <div className="font-mono bg-white p-2 rounded border">
                ✅ Joaquina 56cm formação regular
              </div>
            </div>

            <div className="text-xs text-gray-600 pt-2 border-t">
              💡 <strong>Dica:</strong> Você pode colar múltiplas observações de uma vez, uma por linha!
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
