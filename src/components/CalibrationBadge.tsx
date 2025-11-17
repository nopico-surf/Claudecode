import { Badge } from './ui/badge';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { getObservationsBySpot } from '../data/calibration/observationLog';
import { calculateConfidence } from '../data/calibration/confidenceLevels';

interface CalibrationBadgeProps {
  spotId: string;
  showDetails?: boolean;
}

export function CalibrationBadge({ spotId, showDetails = false }: CalibrationBadgeProps) {
  const observations = getObservationsBySpot(spotId);
  const confidence = calculateConfidence(observations.length);
  
  if (observations.length === 0) {
    return showDetails ? (
      <Badge variant="outline" className="text-xs">
        <Clock className="w-3 h-3 mr-1" />
        Não calibrado
      </Badge>
    ) : null;
  }
  
  const Icon = confidence === 'high' ? CheckCircle : 
               confidence === 'medium' ? AlertCircle : Clock;
  
  const variant = confidence === 'high' ? 'default' :
                  confidence === 'medium' ? 'secondary' : 'outline';
  
  const label = confidence === 'high' ? 'Calibrado' :
                confidence === 'medium' ? 'Em calibração' : 'Poucos dados';
  
  return (
    <Badge variant={variant} className="text-xs">
      <Icon className="w-3 h-3 mr-1" />
      {showDetails ? `${label} (${observations.length} obs)` : label}
    </Badge>
  );
}
