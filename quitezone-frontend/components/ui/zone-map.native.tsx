import MapView, { Circle, Marker } from "react-native-maps";

import { ZoneMapProps } from "@/components/ui/zone-map-types";

export function ZoneMap({ coordinate, onChangeCoordinate, radiusMeters, region }: ZoneMapProps) {
  return (
    <MapView
      initialRegion={region}
      onPress={(event) => {
        onChangeCoordinate(event.nativeEvent.coordinate);
      }}
      region={region}
      style={{ height: 300, width: "100%" }}
    >
      <Circle
        center={coordinate}
        fillColor="rgba(31,106,80,0.18)"
        radius={radiusMeters}
        strokeColor="rgba(31,106,80,0.65)"
        strokeWidth={2}
      />
      <Marker
        coordinate={coordinate}
        draggable
        onDragEnd={(event) => onChangeCoordinate(event.nativeEvent.coordinate)}
      />
    </MapView>
  );
}
