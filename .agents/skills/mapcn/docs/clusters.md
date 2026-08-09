Clusters
Visualize large datasets with automatic point clustering.

The MapClusterLayercomponent uses MapLibre's built-in clustering to efficiently render large numbers of points. Points are automatically grouped into clusters at low zoom levels, and expand as you zoom in.

Basic Example
Click on clusters to zoom in. Click individual points to see details in a popup.

© CARTO, © OpenStreetMap contributors



"use client";

import { useState } from "react";
import { Map, MapClusterLayer, MapPopup, MapControls } from "@/components/ui/map";

interface EarthquakeProperties {
  mag: number;
  place: string;
  tsunami: number;
}

export default function ClusterExample() {
  const [selectedPoint, setSelectedPoint] = useState<{
    coordinates: [number, number];
    properties: EarthquakeProperties;
  } | null>(null);

  return (
    <div className="h-[420px] w-full">
      <Map center={[-103.59, 40.66]} zoom={3.4} fadeDuration={0}>
        <MapClusterLayer<EarthquakeProperties>
          data="https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson"
          clusterRadius={50}
          clusterMaxZoom={14}
          onPointClick={(feature, coordinates) => {
            setSelectedPoint({
              coordinates,
              properties: feature.properties,
            });
          }}
        />

        {selectedPoint && (
          <MapPopup
            key={`${selectedPoint.coordinates[0]}-${selectedPoint.coordinates[1]}`}
            longitude={selectedPoint.coordinates[0]}
            latitude={selectedPoint.coordinates[1]}
            onClose={() => setSelectedPoint(null)}
            closeOnClick={false}
            focusAfterOpen={false}
            closeButton
            className="w-34"
          >
            <div className="text-[13px]">
              <p className="text-muted-foreground">
                Magnitude:{" "}
                <span className="text-foreground font-medium">
                  {selectedPoint.properties.mag}
                </span>
              </p>
              <p className="text-muted-foreground">
                Tsunami:{" "}
                <span className="text-foreground">
                  {selectedPoint.properties?.tsunami === 1 ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </MapPopup>
        )}

        <MapControls />
      </Map>
    </div>
  );
}