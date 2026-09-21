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

## Windows EXE

[Stáhnout instalátor pro Windows x64](https://github.com/Kvaltik/Kvaltik-GameTools/releases/download/v0.1.0/Kvaltik-GameTools-0.1.0-Setup-x64.exe)

Instalátor pro Windows x64 spustíš dvojklikem na
`Kvaltik-GameTools-0.1.0-Setup-x64.exe`. V průvodci vybereš cílovou složku,
například `D:\Aplikace\Kvaltik GameTools`. Instalátor vytvoří zástupce na ploše
i v nabídce Start. Aplikaci lze odinstalovat přes nastavení Windows.
Na cílovém počítači není potřeba Node.js.

Pro opakované sestavení ze zdrojů:

```bash
npm ci
npm run build:win
```

Výsledný soubor je ve složce `dist/`. Balíček není digitálně podepsaný.
Přenosnou verzi bez instalace lze sestavit příkazem `npm run build:portable`.

## Struktura souborů

- `main.js` – Electron hlavní proces
- `preload.js` – bezpečné IPC API
- `src/` – uživatelské rozhraní
- `plugins/manifest.json` – seznam herních pluginů a modulů

## Doporučený další krok

Začít s ETS2 Telemetry pluginem jako první skutečně živou integrací.
Potom sdílený Telemetry Core využijeme i pro další hry.
