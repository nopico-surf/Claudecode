import { HourlyForecast as HourlyForecastType } from "../types/surf";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Waves, Wind, Clock, Calendar, X, Navigation, Thermometer, TrendingUp, TrendingDown, Star } from "lucide-react";
import { getDirectionFromDegrees } from "../services/waveApi";

interface HourlyForecastProps {
  forecasts: HourlyForecastType[];
  selectedDate?: string;
  onClearDate?: () => void;
  selectedHour?: string;
  onSelectHour?: (hourData: HourlyForecastType) => void;
  spotName?: string;
}

export function HourlyForecast({ forecasts, selectedDate, onClearDate, selectedHour, onSelectHour, spotName }: HourlyForecastProps) {
  const getLevelColor = (level: "beginner" | "intermediate" | "advanced" | "nosurf") => {
    switch (level) {
      case "beginner":
        return "bg-green-600 text-white border-0";
      case "intermediate":
        return "bg-yellow-600 text-white border-0";
      case "advanced":
        return "bg-red-600 text-white border-0";
      case "nosurf":
        return "bg-gray-600 text-white border-0";
    }
  };

  const getLevelLabel = (level: "beginner" | "intermediate" | "advanced" | "nosurf") => {
    switch (level) {
      case "beginner":
        return "Iniciantes";
      case "intermediate":
        return "Intermediários";
      case "advanced":
        return "Avançados";
      case "nosurf":
        return "Sem Surf";
    }
  };

  const getLevelColorLight = (level: "beginner" | "intermediate" | "advanced" | "nosurf") => {
    switch (level) {
      case "beginner":
        return "bg-green-100 dark:bg-green-900/30 border-green-500";
      case "intermediate":
        return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500";
      case "advanced":
        return "bg-red-100 dark:bg-red-900/30 border-red-500";
      case "nosurf":
        return "bg-gray-100 dark:bg-gray-900/30 border-gray-500";
    }
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating
              ? "fill-yellow-500 text-yellow-500"
              : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
          }`}
        />
      );
    }
    return stars;
  };

  const formatDateHeader = (dateStr?: string) => {
    if (!dateStr) return "Horários Futuros";
    
    // Adicionar horário meio-dia para evitar problemas de timezone
    const date = new Date(dateStr + 'T12:00:00');
    
    // Obter data atual em São Paulo
    const now = new Date();
    const saoPauloTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const today = new Date(saoPauloTime.toISOString().split('T')[0] + 'T12:00:00');
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Hoje - " + date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long',
        timeZone: 'America/Sao_Paulo'
      });
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Amanhã - " + date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long',
        timeZone: 'America/Sao_Paulo'
      });
    } else {
      const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      return weekdays[date.getDay()] + " - " + date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long',
        timeZone: 'America/Sao_Paulo'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3>Previsão Horária - {formatDateHeader(selectedDate)}</h3>
          </div>
          {selectedDate && onClearDate && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearDate}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Voltar para hoje
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {selectedDate 
            ? "Todas as 24 horas do dia selecionado (00:00 - 23:00)."
            : "Próximas 24 horas a partir de agora - cada horário classificado por nível."
          }
        </p>
      </div>

      {/* Timeline de todas as horas */}
      <div className="space-y-3">
        {forecasts.map((forecast, index) => {
          const time = new Date(forecast.time);
          const isNow = index === 0 && !selectedDate;
          const isSelected = selectedHour === forecast.time;
          
          return (
            <Card
              key={forecast.time}
              className="p-4"
            >
              {/* Layout Desktop */}
              <div className="hidden lg:block">
                <div className="flex items-start justify-between gap-6 mb-4">
                  {/* Horário e Rating */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {forecast.hour.toString().padStart(2, "0")}:00
                        </p>
                        {isNow && (
                          <p className="text-xs text-yellow-700 dark:text-yellow-500">Agora</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {getRatingStars(forecast.rating)}
                    </div>
                  </div>

                  {/* Níveis recomendados */}
                  <div className="flex flex-col gap-1">
                    <p className={`text-xs text-muted-foreground ${(forecast.bestFor.length === 1 && forecast.bestFor[0] === "nosurf") ? 'invisible' : ''}`}>
                      Para surfistas
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {forecast.bestFor.map((level) => (
                        <Badge
                          key={level}
                          className={getLevelColor(level)}
                        >
                          {getLevelLabel(level)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Condições em Grid */}
                <div className="grid grid-cols-5 gap-4">
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ondas</p>
                      <p className="font-medium">{forecast.waveHeight}m</p>
                      <p className="text-xs text-muted-foreground">{getDirectionFromDegrees(forecast.waveDirection)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Wind className={`w-4 h-4 flex-shrink-0 ${
                      forecast.windType === 'Fraco'
                        ? 'text-primary'
                        : forecast.windType.includes('Terral')
                        ? 'text-green-600 dark:text-green-400'
                        : forecast.windType.includes('Maral')
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-amber-500'
                    }`} />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Vento</p>
                      <p className="font-medium">{forecast.windSpeed}km/h</p>
                      <p className={`text-xs truncate ${
                        forecast.windType === 'Fraco'
                          ? 'text-primary'
                          : forecast.windType.includes('Terral')
                          ? 'text-green-600 dark:text-green-400'
                          : forecast.windType.includes('Maral')
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-amber-500'
                      }`}>
                        {getDirectionFromDegrees(forecast.windDirection)} - {forecast.windType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Água</p>
                      <p className="font-medium">{forecast.waterTemp}°C</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {forecast.tide === "subindo" ? (
                      <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Maré</p>
                      <p className="font-medium capitalize">{forecast.tide}</p>
                      <p className="text-xs text-muted-foreground">{forecast.tideHeight}m</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Período</p>
                      <p className="font-medium">{forecast.wavePeriod}s</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Layout Mobile */}
              <div className="lg:hidden space-y-4">
                {/* Cabeçalho: Horário e Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {forecast.hour.toString().padStart(2, "0")}:00
                      </p>
                      {isNow && (
                        <p className="text-xs text-yellow-700 dark:text-yellow-500">Agora</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {getRatingStars(forecast.rating)}
                  </div>
                </div>

                {/* Condições em Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Ondas</p>
                      <p className="font-medium">{forecast.waveHeight}m</p>
                      <p className="text-xs text-muted-foreground truncate">{getDirectionFromDegrees(forecast.waveDirection)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Wind className={`w-4 h-4 flex-shrink-0 ${
                      forecast.windType === 'Fraco'
                        ? 'text-primary'
                        : forecast.windType.includes('Terral')
                        ? 'text-green-600 dark:text-green-400'
                        : forecast.windType.includes('Maral')
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-amber-500'
                    }`} />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Vento</p>
                      <p className="font-medium">{forecast.windSpeed}km/h</p>
                      <p className={`text-xs truncate ${
                        forecast.windType === 'Fraco'
                          ? 'text-primary'
                          : forecast.windType.includes('Terral')
                          ? 'text-green-600 dark:text-green-400'
                          : forecast.windType.includes('Maral')
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-amber-500'
                      }`}>
                        {getDirectionFromDegrees(forecast.windDirection)} - {forecast.windType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Água</p>
                      <p className="font-medium">{forecast.waterTemp}°C</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {forecast.tide === "subindo" ? (
                      <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Maré</p>
                      <p className="font-medium capitalize">{forecast.tide}</p>
                      <p className="text-xs text-muted-foreground">{forecast.tideHeight}m</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Período</p>
                      <p className="font-medium">{forecast.wavePeriod}s</p>
                    </div>
                  </div>
                </div>

                {/* Níveis recomendados */}
                <div className="flex items-center gap-2 flex-wrap">
                  {!(forecast.bestFor.length === 1 && forecast.bestFor[0] === "nosurf") && (
                    <p className="text-xs text-muted-foreground">Para surfistas</p>
                  )}
                  {forecast.bestFor.map((level) => (
                    <Badge
                      key={level}
                      className={getLevelColor(level)}
                    >
                      {getLevelLabel(level)}
                    </Badge>
                  ))}
                </div>


              </div>
            </Card>
          );
        })}
      </div>

      {/* Resumo por nível */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {/* Iniciantes */}
        <Card className="p-5 bg-green-50 dark:bg-green-900/10 border-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <h4>Iniciante</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Melhores horários para iniciantes:
          </p>
          <div className="space-y-2">
            {forecasts
              .filter((f) => f.bestFor.includes("beginner"))
              .slice(0, 5)
              .map((f) => (
                <div
                  key={f.time}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{f.hour.toString().padStart(2, "0")}:00</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {f.waveHeight}m
                    </span>
                    <div className="flex gap-0.5">
                      {getRatingStars(f.rating)}
                    </div>
                  </div>
                </div>
              ))}
            {forecasts.filter((f) => f.bestFor.includes("beginner")).length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhum horário ideal hoje
              </p>
            )}
          </div>
        </Card>

        {/* Intermediários */}
        <Card className="p-5 bg-yellow-50 dark:bg-yellow-900/10 border-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <h4>Intermediário</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Melhores horários para intermediários:
          </p>
          <div className="space-y-2">
            {forecasts
              .filter((f) => f.bestFor.includes("intermediate"))
              .slice(0, 5)
              .map((f) => (
                <div
                  key={f.time}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{f.hour.toString().padStart(2, "0")}:00</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {f.waveHeight}m
                    </span>
                    <div className="flex gap-0.5">
                      {getRatingStars(f.rating)}
                    </div>
                  </div>
                </div>
              ))}
            {forecasts.filter((f) => f.bestFor.includes("intermediate")).length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhum horário ideal hoje
              </p>
            )}
          </div>
        </Card>

        {/* Avançados */}
        <Card className="p-5 bg-red-50 dark:bg-red-900/10 border-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <h4>Avançado</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Melhores horários para avançados:
          </p>
          <div className="space-y-2">
            {forecasts
              .filter((f) => f.bestFor.includes("advanced"))
              .slice(0, 5)
              .map((f) => (
                <div
                  key={f.time}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{f.hour.toString().padStart(2, "0")}:00</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {f.waveHeight}m
                    </span>
                    <div className="flex gap-0.5">
                      {getRatingStars(f.rating)}
                    </div>
                  </div>
                </div>
              ))}
            {forecasts.filter((f) => f.bestFor.includes("advanced")).length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhum horário ideal hoje
              </p>
            )}
          </div>
        </Card>

        {/* Sem Surf */}
        <Card className="p-5 bg-gray-50 dark:bg-gray-900/10 border-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <h4>Sem Surf</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Horários sem condições favoráveis:
          </p>
          <div className="space-y-2">
            {forecasts
              .filter((f) => f.bestFor.includes("nosurf"))
              .slice(0, 5)
              .map((f) => (
                <div
                  key={f.time}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{f.hour.toString().padStart(2, "0")}:00</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {f.waveHeight}m
                    </span>
                    <div className="flex gap-0.5">
                      {getRatingStars(f.rating)}
                    </div>
                  </div>
                </div>
              ))}
            {forecasts.filter((f) => f.bestFor.includes("nosurf")).length === 0 && (
              <p className="text-sm text-muted-foreground">
                Todas as horas têm condiçes
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Legenda */}
      <Card className="p-4 bg-muted/50 border-0">
        <p className="text-sm mb-3">
          <strong>Como funciona a classificação:</strong>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <strong>Iniciantes</strong>
            </div>
            <p className="text-muted-foreground">
              Ondas de 0.3 a 0.7m com vento fraco, terral ou maral até 16km/h
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <strong>Intermediários</strong>
            </div>
            <p className="text-muted-foreground">
              Ondas de 0.5 a 1.7m com vento fraco, terral ou maral até 16km/h
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <strong>Avançados</strong>
            </div>
            <p className="text-muted-foreground">
              Ondas acima de 1.0m ou condições desafiadoras
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <strong>Sem Surf</strong>
            </div>
            <p className="text-muted-foreground">
              Ondas menores que 0.3m ou vento maral acima de 16km/h
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}