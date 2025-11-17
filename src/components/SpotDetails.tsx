import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MapPin, RefreshCw, Mountain, Shield, Wind, Star } from "lucide-react";
import { Spot, HourlyForecast as HourlyForecastType, DailyForecast as DailyForecastType, GeographyInfluence } from "../types/surf";
import { WaveConditionsCard } from "./WaveConditionsCard";
import { HourlyForecast } from "./HourlyForecast";
import { WeeklyForecast } from "./WeeklyForecast";
import { getWaveData, getDirectionFromDegrees } from "../services/waveApi";
import { getGeographicInfluence, getGeographyDescription } from "../services/geographyApi";

interface SpotDetailsProps {
  spot: Spot;
  onBack: () => void;
}

export function SpotDetails({ spot, onBack }: SpotDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [loadingDayChange, setLoadingDayChange] = useState(false);
  const [conditions, setConditions] = useState(spot.conditions);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastType[]>([]);
  const [weeklyForecast, setWeeklyForecast] = useState<DailyForecastType[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [selectedHourData, setSelectedHourData] = useState<HourlyForecastType | null>(null);
  const [geographyInfluence, setGeographyInfluence] = useState<GeographyInfluence>({ swellProtection: [], swellExposure: [], windInfluence: [], features: [] });
  const [showGeography, setShowGeography] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const loadConditions = async (dateToLoad?: string) => {
    setLoading(true);
    try {
      console.log('Carregando condições para:', spot.name, spot.latitude, spot.longitude, dateToLoad ? `data: ${dateToLoad}` : '');
      
      const beachOrientation = spot.beachOrientation;
      
      if (beachOrientation) {
        console.log('✅ Usando orientação MANUAL configurada:', beachOrientation, '°');
      } else {
        console.log('ℹ️ Sem orientação manual - usando apenas cálculo de exposição angular');
      }
      
      // Buscar dados usando a nova API unificada (detecção automática se beachOrientation não definido)
      const data = await getWaveData(
        spot.latitude,
        spot.longitude,
        beachOrientation, // Agora é opcional - auto-detecta se undefined
        dateToLoad, // Passa a data selecionada (undefined se não houver)
        spot.id // SpotId para buscar proteção geográfica específica
      );
      
      console.log('Condições carregadas:', data.current);
      console.log('Previsão horária carregada:', data.hourly.length, 'horas');
      console.log('Previsão semanal carregada:', data.daily.length, 'dias');
      
      // 🌊 Verificar se bias correction foi aplicado
      if (data.current.biasCorrected && data.current.biasCorrection) {
        console.log('\\n🌊 PNBOIA BIAS CORRECTION ATIVO:');
        console.log(`   Boia: ${data.current.biasCorrection.buoyName}`);
        console.log(`   Fator de ajuste: ${data.current.biasCorrection.heightFactor.toFixed(2)}x`);
        console.log(`   Confiança: ${(data.current.biasCorrection.confidence * 100).toFixed(0)}%`);
        console.log(`   Idade dos dados: ${data.current.biasCorrection.dataAge} minutos`);
        console.log('   ✅ Previsões ajustadas com dados reais das boias da Marinha do Brasil\\n');
      }
      
      // A API já retorna os horários filtrados corretamente:
      // - Se dateToLoad existe: todas as 24h daquele dia
      // - Se não existe: apenas horários futuros a partir de agora
      // Limitamos a 24h para garantir
      let hourlyData = data.hourly.slice(0, 24);
      
      // ✅ CONDIÇÕES ATUAIS: Sempre mostrar o horário atual/próximo
      // Se dateToLoad é "hoje" ou undefined, buscar o horário mais próximo de agora
      let currentConditions = data.current;
      
      if (dateToLoad) {
        // Verificar se a data selecionada é HOJE
        const selected = new Date(dateToLoad + 'T12:00:00');
        const now = new Date();
        const saoPauloTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
        const today = new Date(saoPauloTime.toISOString().split('T')[0] + 'T12:00:00');
        const isToday = selected.toDateString() === today.toDateString();
        
        if (isToday && hourlyData.length > 0) {
          // Se é HOJE, buscar o horário mais próximo do horário atual
          const currentHour = saoPauloTime.getHours();
          const closestHour = hourlyData.find(h => h.hour >= currentHour) || hourlyData[0];
          
          // Verificar se closestHour tem as propriedades necessárias
          if (closestHour && typeof closestHour === 'object' && 'waveHeight' in closestHour) {
            currentConditions = {
              height: closestHour.waveHeight,
              direction: typeof closestHour.waveDirection === 'number'
                ? getDirectionFromDegrees(closestHour.waveDirection)
                : String(closestHour.waveDirection),
              period: closestHour.wavePeriod,
              windSpeed: closestHour.windSpeed,
              windDirection: typeof closestHour.windDirection === 'number'
                ? getDirectionFromDegrees(closestHour.windDirection)
                : String(closestHour.windDirection),
              windType: closestHour.windType,
              waterTemp: closestHour.waterTemp,
              tide: closestHour.tide,
              tideHeight: closestHour.tideHeight,
              rating: closestHour.rating,
              timestamp: closestHour.time,
            };
            
            console.log(`✅ Condições atuais ajustadas para horário ${closestHour.hour}:00 (horário mais próximo de agora)`);
          }
        }
      }
      
      setConditions(currentConditions);
      setHourlyForecast(hourlyData);
      setWeeklyForecast(data.daily);
      setLastUpdate(new Date());

      // 🚨 DEBUG: Ver dados sendo passados para HourlyForecast
      if (spot.id === 'sc-floripa-campeche-4') {
        console.log('\n🔍 DEBUG PALANQUE - DADOS PASSADOS PARA HOURLY FORECAST:');
        console.log(`Total de horários: ${hourlyData.length}`);
        hourlyData.slice(0, 5).forEach((h, idx) => {
          console.log(`\n  [${idx}] ${h.hour}:00`);
          console.log(`      Altura: ${h.waveHeight}m`);
          console.log(`      Direção: ${h.waveDirection}° (${getDirectionFromDegrees(h.waveDirection)})`);
          console.log(`      Período: ${h.wavePeriod}s`);
        });
      }

      // Buscar influências geográficas
      if (beachOrientation !== undefined && hourlyData.length > 0) {
        const geography = await getGeographicInfluence(
          spot.latitude,
          spot.longitude,
          beachOrientation,
          hourlyData[0].waveDirection,
          spot.id
        );
        setGeographyInfluence(geography);
      }
    } catch (error) {
      console.error("Erro ao carregar condições:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDay = async (date: string) => {
    setSelectedDate(date);
    setSelectedHourData(null); // Limpa a hora selecionada ao mudar de dia
    setLoadingDayChange(true);
    
    // Scroll para o topo do componente
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    try {
      await loadConditions(date);
    } finally {
      setLoadingDayChange(false);
    }
  };

  const handleClearDate = async () => {
    setSelectedDate(undefined);
    setSelectedHourData(null); // Limpa a hora selecionada ao voltar para hoje
    setLoadingDayChange(true);
    
    // Scroll para o topo do componente
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    try {
      await loadConditions(undefined);
    } finally {
      setLoadingDayChange(false);
    }
  };

  const handleSelectHour = (hourData: HourlyForecastType) => {
    console.log('📍 Horário selecionado:', hourData);
    setSelectedHourData(hourData);
    
    // Converte os dados do horário para o formato de conditions
    const hourConditions = {
      height: hourData.waveHeight,
      direction: typeof hourData.waveDirection === 'number' 
        ? getDirectionFromDegrees(hourData.waveDirection) 
        : String(hourData.waveDirection),
      period: hourData.wavePeriod,
      windSpeed: hourData.windSpeed,
      windDirection: typeof hourData.windDirection === 'number'
        ? getDirectionFromDegrees(hourData.windDirection)
        : String(hourData.windDirection),
      windType: hourData.windType,
      waterTemp: hourData.waterTemp,
      tide: hourData.tide,
      tideHeight: hourData.tideHeight,
      rating: hourData.rating,
      timestamp: hourData.time,
    };
    
    setConditions(hourConditions);
  };

  const handleClearHour = () => {
    console.log('🔄 Limpando horário selecionado, voltando para condições atuais');
    setSelectedHourData(null);
    
    // Volta para o primeiro horário da lista (condições atuais/futuras)
    if (hourlyForecast.length > 0) {
      const currentConditions = {
        height: hourlyForecast[0].waveHeight,
        direction: typeof hourlyForecast[0].waveDirection === 'number'
          ? getDirectionFromDegrees(hourlyForecast[0].waveDirection)
          : String(hourlyForecast[0].waveDirection),
        period: hourlyForecast[0].wavePeriod,
        windSpeed: hourlyForecast[0].windSpeed,
        windDirection: typeof hourlyForecast[0].windDirection === 'number'
          ? getDirectionFromDegrees(hourlyForecast[0].windDirection)
          : String(hourlyForecast[0].windDirection),
        windType: hourlyForecast[0].windType,
        waterTemp: hourlyForecast[0].waterTemp,
        tide: hourlyForecast[0].tide,
        tideHeight: hourlyForecast[0].tideHeight,
        rating: hourlyForecast[0].rating,
        timestamp: hourlyForecast[0].time,
      };
      setConditions(currentConditions);
    }
  };

  useEffect(() => {
    loadConditions();
  }, [spot.id]);



  return (
    <div className="space-y-6 relative">
      {/* Loading overlay quando troca de dia */}
      {loadingDayChange && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <Card className="p-6">
            <div className="flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-primary" />
              <p className="font-medium">Carregando previsão...</p>
            </div>
          </Card>
        </div>
      )}

      <div ref={topRef} className="border-b-4 border-accent pb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-primary">{spot.name}</h1>
          {(() => {
            // Verificar se tem calibração ativa (≥2 observações)
            if (typeof window !== 'undefined' && spot.id) {
              try {
                const stored = localStorage.getItem('nopico_observations');
                if (stored) {
                  const observations = JSON.parse(stored);
                  const spotObs = observations.filter((o: any) => o.spotId === spot.id);
                  if (spotObs.length >= 2) {
                    return (
                      <Badge className="bg-purple-500 text-white">
                        🎓 Calibrado ({spotObs.length} obs)
                      </Badge>
                    );
                  }
                }
              } catch {}
            }
            return null;
          })()}
        </div>
        <div className="flex items-center gap-2 mt-3 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4" />
          <span>{spot.beach} • {spot.city} • {spot.state}</span>
        </div>
      </div>

      {(() => {
        // Verifica se selectedDate é hoje
        const isToday = selectedDate ? (() => {
          const selected = new Date(selectedDate + 'T12:00:00');
          const now = new Date();
          const saoPauloTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
          const today = new Date(saoPauloTime.toISOString().split('T')[0] + 'T12:00:00');
          return selected.toDateString() === today.toDateString();
        })() : false;
        
        const shouldShowConditions = !selectedDate || isToday;
        
        return shouldShowConditions ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                {selectedHourData ? (
                  <>
                    <h3>Condições para {new Date(selectedHourData.time).toLocaleDateString('pt-BR', { 
                      weekday: 'short', 
                      day: '2-digit', 
                      month: 'short' 
                    })} às {selectedHourData.hour.toString().padStart(2, '0')}:00</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Horário fixo selecionado na previsão
                    </p>
                  </>
                ) : (
                  <>
                    <h3>Condições Atuais</h3>
                    {lastUpdate && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Atualizado às {lastUpdate.toLocaleTimeString('pt-BR')}
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="flex gap-2">
                {selectedHourData && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearHour}
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Voltar para agora
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadConditions(selectedDate)}
                  disabled={loading}
                  className="gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
              </div>
            </div>

            {loading && !conditions ? (
              <Card className="p-6">
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              </Card>
            ) : conditions ? (
              <>
                <WaveConditionsCard conditions={conditions} />

                <Card className="mt-4 p-6 rounded-[16px]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4>Qualidade das Ondas</h4>
                      <p className="text-muted-foreground mt-1">
                        Dados Open-Meteo Marine API
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 ${
                            star <= conditions.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </Card>

              </>
            ) : null}
          </div>
        ) : null;
      })()}

      {/* Previsões */}
      {!loading && (hourlyForecast.length > 0 || weeklyForecast.length > 0) && (
        <Tabs defaultValue="hourly" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="hourly">
              {selectedDate ? "Horários do Dia" : "Horários Futuros"}
            </TabsTrigger>
            <TabsTrigger value="weekly">Próximos 7 dias</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hourly" className="mt-6">
            {loadingDayChange ? (
              <Card className="p-8">
                <div className="flex flex-col items-center justify-center gap-3 py-8">
                  <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Carregando horários...</p>
                </div>
              </Card>
            ) : hourlyForecast.length > 0 ? (
              <>
                <HourlyForecast 
                  forecasts={hourlyForecast} 
                  selectedDate={selectedDate}
                  onClearDate={handleClearDate}
                  selectedHour={selectedHourData?.time}
                  onSelectHour={handleSelectHour}
                  spotName={spot.name}
                />
              </>
            ) : null}
          </TabsContent>
          
          <TabsContent value="weekly" className="mt-6">
            {weeklyForecast.length > 0 && (
              <WeeklyForecast 
                forecasts={weeklyForecast}
                onSelectDay={handleSelectDay}
                loadingDate={loadingDayChange ? selectedDate : undefined}
              />
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}