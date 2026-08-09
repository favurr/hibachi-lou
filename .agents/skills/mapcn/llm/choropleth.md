# Choropleth

World choropleth map shading countries by a metric, with a hover tooltip and legend.

Type: `registry:block`
Registry item: <https://mapcn.dev/r/choropleth.json>

## Install

```bash
npx shadcn@latest add @mapcn/choropleth
```

## Dependencies

- maplibre-gl
- next-themes

## Registry Dependencies

- @mapcn/map

## Files

- src/registry/blocks/choropleth/page.tsx -> app/choropleth/page.tsx (registry:page)
- src/registry/blocks/choropleth/data.ts -> app/choropleth/data.ts (registry:component)
- src/lib/use-world-data.ts -> @lib/use-world-data.ts (registry:lib)
