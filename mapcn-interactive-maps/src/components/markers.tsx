import {Map, MapMarker, MarkerContent} from './ui/map';

export default function Markers(){
    return(
        <div className='h-100 w-full'>
            <Map center={[77.594566, 12.971599]} zoom={9}>
                <MapMarker longitude={77.5945} latitude={12.971}>
                    <MarkerContent>🔖</MarkerContent>
                </MapMarker>
            </Map>
        </div>
    )
}