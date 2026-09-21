# Kvaltík GameTools 0.1.0

První základ společné platformy pro herní externí aplikace.

## Obsah
- Train Simulator Classic
- Euro Truck Simulator 2
- Farming Simulator 22
- OMSI 2
- Minecraft
- Supporter/Patreon sekce
- pluginový manifest
- připravené místo pro Telemetry Core, Mobile Companion, Cloud a Update Center

## Spuštění

1. Nainstaluj Node.js LTS.
2. Otevři složku projektu v terminálu.
3. Spusť:

```bash
npm install
npm start
```

## Struktura

- `main.js` – Electron hlavní proces
- `preload.js` – bezpečné IPC API
- `src/` – uživatelské rozhraní
- `plugins/manifest.json` – seznam herních pluginů a modulů

## Doporučený další krok

Začít s ETS2 Telemetry pluginem jako první skutečně živou integrací.
Potom sdílený Telemetry Core využijeme i pro další hry.
