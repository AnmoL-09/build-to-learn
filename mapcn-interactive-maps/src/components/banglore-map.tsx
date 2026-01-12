import { Card } from "./ui/card"
import { Map, MapControls } from "./ui/map"

interface BangloreMapProps {
  onError?: (message: string) => void
  onSuccess?: (message: string) => void
}

export const BangloreMap = ({ onError, onSuccess }: BangloreMapProps) => {
  return (
    <Card className="h-[600px] p-0 overflow-hidden">
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
    </Card>
  );
}
