# Uptime Monitor

Status-page style map of edge network locations with live health, latency, and uptime.

Type: `registry:block`
Registry item: <https://mapcn.dev/r/uptime-monitor.json>

## Install

```bash
npx shadcn@latest add @mapcn/uptime-monitor
```

## Dependencies

- maplibre-gl

## Registry Dependencies

- @mapcn/map

## Files

- src/registry/blocks/uptime-monitor/page.tsx -> app/uptime-monitor/page.tsx (registry:page)
- src/registry/blocks/uptime-monitor/data.ts -> app/uptime-monitor/data.ts (registry:component)
- src/registry/blocks/uptime-monitor/components/edge-node-marker.tsx -> app/uptime-monitor/components/edge-node-marker.tsx (registry:component)
- src/registry/blocks/uptime-monitor/components/status-sidebar.tsx -> app/uptime-monitor/components/status-sidebar.tsx (registry:component)
