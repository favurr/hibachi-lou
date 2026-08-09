# Map

A MapLibre-powered map component with markers, popups, tooltips, routes, and controls.

Type: `registry:ui`
Registry item: <https://mapcn.dev/r/map.json>

## Install

```bash
npx shadcn@latest add @mapcn/map
```

## Dependencies

- maplibre-gl
- lucide-react

## Registry Dependencies

None

## Files

- src/registry/map.tsx -> components/ui/map.tsx (registry:ui)

## Basemap Selection

- Use `<Map>` without `blank` for the default free CARTO basemap tiles. This is best for store locators, delivery tracking, logistics maps, address maps, and any UI where users need streets, place labels, or geographic context.
- Use `<Map blank>` for a transparent, tile-less canvas. Used alone it renders nothing; add your own layers such as `MapGeoJSON`, `MapArc`, markers, clusters, or custom MapLibre layers. This is best for choropleths, arc maps, dot maps, dashboards, and data visualizations where the data should define the geography.
- If the user wants a blank map with only countries or country borders, use `<Map blank>` with `<MapGeoJSON data={WORLD_GEOJSON} />`. For world countries, a Natural Earth GeoJSON source works well: `https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@v5.1.2/geojson/ne_110m_admin_0_countries.geojson`. Users can also provide their own GeoJSON URL or GeoJSON object to `MapGeoJSON`.
- Use the `styles` prop for custom MapLibre-compatible style URLs or style objects, for example MapTiler, OpenFreeMap, CARTO, or a self-hosted style. Explicit `styles` override `blank`.
