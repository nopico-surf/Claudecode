import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin } from "lucide-react";
import { Spot } from "../types/surf";

interface SpotCardProps {
  spot: Spot;
  onClick: () => void;
}

export function SpotCard({ spot, onClick }: SpotCardProps) {
  return (
    <Card 
      className="p-5 md:hover:border-accent md:hover:shadow-lg transition-all cursor-pointer active:scale-[0.98] rounded-[16px]"
      onClick={onClick}
      style={{ touchAction: 'manipulation' }}
    >
      <div>
        <h3 className="text-foreground mb-2">{spot.name}</h3>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4" />
          <span className="text-base">{spot.beach}</span>
        </div>
      </div>
    </Card>
  );
}