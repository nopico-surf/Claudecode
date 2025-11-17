import { DailyForecast } from "../types/surf";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Waves, Wind, Clock, TrendingUp, TrendingDown, ChevronRight, Loader2, Star } from "lucide-react";

interface WeeklyForecastProps {
  forecasts: DailyForecast[];
  onSelectDay?: (date: string) => void;
  loadingDate?: string;
}

export function WeeklyForecast({ forecasts, onSelectDay, loadingDate }: WeeklyForecastProps) {
  const getLevelColor = (level: "beginner" | "intermediate" | "advanced" | "nosurf") => {
    switch (level) {
      case "beginner":
        return "bg-green-600 text-white border-0";
      case "intermediate":
        return "bg-yellow-600 text-white border-0";
      case "advanced":
        return "bg-red-600 text-white border-0";
      case "nosurf":
        return "bg-primary text-white border-0";
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

  const formatDate = (dateStr: string) => {
    // Adicionar horário meio-dia para evitar problemas de timezone
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short',
      timeZone: 'America/Sao_Paulo'
    });
  };

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h3 className="mb-1">Previsão Semanal (7 dias)</h3>
        <p className="text-sm text-muted-foreground">
          Clique em um dia para ver a previsão horária completa
        </p>
      </div>

      {/* Grid de Cards - 7 dias */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {forecasts.map((forecast) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const forecastDate = new Date(forecast.date);
          forecastDate.setHours(0, 0, 0, 0);
          const isToday = forecastDate.getTime() === today.getTime();
          const isLoadingThisDay = loadingDate === forecast.date;

          return (
            <Card
              key={forecast.date}
              className={`p-5 transition-all md:hover:shadow-lg cursor-pointer active:scale-[0.98] relative h-full flex flex-col ${
                isLoadingThisDay ? 'opacity-75 pointer-events-none' : ''
              }`}
              onClick={() => !isLoadingThisDay && onSelectDay?.(forecast.date)}
              style={{ touchAction: 'manipulation' }}
            >
              {/* Loading overlay */}
              {isLoadingThisDay && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg backdrop-blur-sm z-10">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}

              {/* Cabeçalho do dia */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">{forecast.dayName}</p>
                  {isLoadingThisDay ? (
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDate(forecast.date)}
                </p>
              </div>

              {/* Ondas */}
              <div className="mb-3 pb-3 border-b border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Waves className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Ondas</p>
                </div>
                <p className="font-medium">
                  {forecast.waveHeightMin}-{forecast.waveHeightMax}m
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {forecast.waveDirection}
                </p>
              </div>

              {/* Vento */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <Wind className={`w-4 h-4 ${
                    forecast.windType === 'Fraco'
                      ? 'text-primary'
                      : forecast.windType === 'Terral'
                      ? 'text-green-600 dark:text-green-400'
                      : forecast.windType === 'Maral'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-amber-500'
                  }`} />
                  <p className="text-xs text-muted-foreground">Vento</p>
                </div>
                <p className={`text-xs mb-1.5 ${
                  forecast.windType === 'Fraco'
                    ? 'text-primary'
                    : forecast.windType === 'Terral'
                    ? 'text-green-600 dark:text-green-400'
                    : forecast.windType === 'Maral'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-amber-500'
                }`}>
                  {forecast.windDirection} - {forecast.windType}
                </p>
                <p className="text-xs text-muted-foreground">
                  até {forecast.windSpeedMax}km/h
                </p>
              </div>

              {/* Níveis */}
              <div className="mb-3">
                <p className={`text-xs mb-1.5 ${
                  forecast.bestFor.length === 1 && forecast.bestFor[0] === "nosurf"
                    ? "text-transparent"
                    : "text-muted-foreground"
                }`}>
                  Para surfistas
                </p>
                <div className="flex flex-wrap gap-1">
                  {forecast.bestFor.map((level) => (
                    <Badge key={level} className={`text-xs ${getLevelColor(level)}`}>
                      {getLevelLabel(level)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mt-auto">
                {getRatingStars(forecast.rating)}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}