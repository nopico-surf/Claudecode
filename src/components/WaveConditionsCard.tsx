import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Waves, Wind, TrendingUp, Thermometer, Mountain } from "lucide-react";
import { WaveConditions } from "../types/surf";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { getDirectionFromDegrees } from "../services/waveApi";

interface WaveConditionsCardProps {
  conditions: WaveConditions;
}

export function WaveConditionsCard({ conditions }: WaveConditionsCardProps) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 rounded-[16px]">
          <div className="text-center">
            <div className="inline-flex p-3 bg-primary rounded-lg mb-3">
              <Waves className="w-6 h-6 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground mb-2">Ondas</p>
            <p className="text-3xl font-black text-primary">{conditions.height.toFixed(1)}m</p>
            <p className="text-xs text-muted-foreground mt-2">
              {conditions.period}s • {conditions.direction}
            </p>
          </div>
        </Card>

      <Card className="p-5 rounded-[16px]">
        <div className="text-center">
          <div className={`inline-flex p-3 rounded-lg mb-3 ${
            conditions.windType === 'Fraco'
              ? 'bg-primary'
              : conditions.windType.includes('Terral')
              ? 'bg-green-600'
              : conditions.windType.includes('Maral')
              ? 'bg-red-600'
              : 'bg-amber-500'
          }`}>
            <Wind className="w-6 h-6 text-white" />
          </div>
          <p className="text-xs text-muted-foreground mb-2">Vento</p>
          <p className="text-3xl font-black text-primary">{conditions.windSpeed} <span className="text-base">km/h</span></p>
          <p className={`mt-3 text-xs ${
            conditions.windType === 'Fraco'
              ? 'text-primary'
              : conditions.windType.includes('Terral')
              ? 'text-green-600'
              : conditions.windType.includes('Maral')
              ? 'text-red-600'
              : 'text-amber-500'
          }`}>
            {conditions.windDirection} - {conditions.windType}
          </p>
        </div>
      </Card>

        <Card className="p-5 rounded-[16px]">
          <div className="text-center">
            <div className="inline-flex p-3 bg-purple-600 rounded-lg mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-xs text-muted-foreground mb-2">Maré</p>
            <p className="text-2xl font-black text-primary capitalize">{conditions.tide}</p>
            <p className="text-xs text-muted-foreground mt-2">{conditions.tideHeight.toFixed(1)}m</p>
          </div>
        </Card>

        <Card className="p-5 rounded-[16px]">
          <div className="text-center">
            <div className="inline-flex p-3 bg-orange-600 rounded-lg mb-3">
              <Thermometer className="w-6 h-6 text-white" />
            </div>
            <p className="text-xs text-muted-foreground mb-2">Água</p>
            <p className="text-3xl font-black text-primary">{conditions.waterTemp}°C</p>
            <p className="text-xs text-muted-foreground mt-2">Temperatura</p>
          </div>
        </Card>
      </div>
    </>
  );
}