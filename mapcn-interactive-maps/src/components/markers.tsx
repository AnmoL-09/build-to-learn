import { useState } from 'react'
import { Map, MapMarker, MarkerContent, MarkerPopup, MarkerTooltip, MarkerLabel } from './ui/map'
import { Card } from './ui/card'

interface Location {
  name: string
  longitude: number
  latitude: number
  description: string
  category: 'landmark' | 'restaurant' | 'park' | 'museum'
}

const locations: Location[] = [
  {
    name: 'Bangalore Palace',
    longitude: 77.5925,
    latitude: 12.9987,
    description: 'A beautiful palace built in the Tudor style architecture',
    category: 'landmark'
  },
  {
    name: 'Cubbon Park',
    longitude: 77.5956,
    latitude: 12.9716,
    description: 'A historic park in the heart of Bangalore',
    category: 'park'
  },
  {
    name: 'Vidhana Soudha',
    longitude: 77.5923,
    latitude: 12.9794,
    description: 'The seat of the state legislature of Karnataka',
    category: 'landmark'
  },
  {
    name: 'Lalbagh Botanical Garden',
    longitude: 77.5850,
    latitude: 12.9507,
    description: 'One of the oldest botanical gardens in India',
    category: 'park'
  },
  {
    name: 'ISKCON Temple',
    longitude: 77.5517,
    latitude: 12.9784,
    description: 'A famous Hindu temple and cultural center',
    category: 'landmark'
  }
]

const categoryIcons: Record<Location['category'], string> = {
  landmark: '🏛️',
  restaurant: '🍽️',
  park: '🌳',
  museum: '🏛️'
}

export default function Markers() {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className='h-[600px] w-full rounded-lg border overflow-hidden'>
        <Map center={[77.594566, 12.971599]} zoom={11}>
          {locations.map((location, index) => (
            <MapMarker
              key={index}
              longitude={location.longitude}
              latitude={location.latitude}
              onClick={() => setSelectedMarker(selectedMarker === location.name ? null : location.name)}
            >
              <MarkerContent className="text-2xl">
                {categoryIcons[location.category]}
              </MarkerContent>
              <MarkerLabel position="top">
                {location.name}
              </MarkerLabel>
              <MarkerTooltip>
                <div className="font-medium">{location.name}</div>
                <div className="text-xs text-muted-foreground">{location.category}</div>
              </MarkerTooltip>
              {selectedMarker === location.name && (
                <MarkerPopup closeButton onClose={() => setSelectedMarker(null)}>
                  <div className="space-y-2 min-w-[200px]">
                    <h3 className="font-semibold text-lg">{location.name}</h3>
                    <p className="text-sm text-muted-foreground">{location.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground">
                        {location.category}
                      </span>
                      <span className="text-muted-foreground">
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </MarkerPopup>
              )}
            </MapMarker>
          ))}
        </Map>
      </div>
      <Card>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold">Interactive Features</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Hover over markers to see tooltips</li>
            <li>Click markers to open detailed popups</li>
            <li>Each marker shows category icons and labels</li>
            <li>Total locations: {locations.length}</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}