import { Card } from "./ui/card"
import { Map, MapControls } from "./ui/map"

interface BangloreMapProps {
  onError?: (message: string) => void
  onSuccess?: (message: string) => void
}

export const BangloreMap = ({ onError, onSuccess }: BangloreMapProps) => {
  return (
    <div className="h-[600px] w-full rounded-lg border overflow-hidden shadow-inner bg-muted/20">
      <Map center={[77.594566, 12.971599]} zoom={9}>
        <MapControls 
          position="top-left"
          showZoom
          showCompass
          showFullscreen
          showLocate
          onError={onError}
          onSuccess={onSuccess}
        />
      </Map>
    </div>
  );
}
