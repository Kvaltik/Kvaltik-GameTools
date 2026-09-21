const navItems = document.querySelectorAll('.nav-item');
const pages = {
  home: document.getElementById('page-home'),
  game: document.getElementById('page-game'),
  supporter: document.getElementById('page-supporter'),
  updates: document.getElementById('page-updates'),
  settings: document.getElementById('page-settings')
};

let plugins = [];

function showPage(pageName) {
  Object.values(pages).forEach(p => p.classList.remove('active'));
  pages[pageName].classList.add('active');
}

function setActiveNav(id) {
  navItems.forEach(item => item.classList.toggle('active', item.dataset.page === id));
}

function openGame(plugin) {
  document.getElementById('gameIcon').textContent = plugin.icon;
  document.getElementById('gameName').textContent = plugin.name;
  document.getElementById('gameStatus').textContent = 'Plugin připravený pro další vývoj a napojení na živá data.';

  const grid = document.getElementById('moduleGrid');
  grid.innerHTML = '';

  plugin.modules.forEach((moduleName, index) => {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.innerHTML = `
      <strong>${moduleName}</strong>
      <p>${moduleDescription(plugin.id, moduleName)}</p>
      <div class="module-footer">
        <span class="badge">${index === 0 ? 'PRIORITA' : 'PLÁN'}</span>
        <button disabled>Připravujeme</button>
      </div>
    `;
    grid.appendChild(card);
  });

  showPage('game');
  setActiveNav(plugin.id);
  document.getElementById('pageTitle').textContent = plugin.name;
  document.getElementById('pageSubtitle').textContent = 'Moduly, telemetrie a rozšíření pro tuto hru.';
}

function moduleDescription(gameId, name) {
  const map = {
    'Telemetry Dashboard': 'Živá rychlost, otáčky, palivo, tempomat, náklad a další data z ETS2.',
    'Kniha jízd': 'Automatický záznam tras, kilometrů, zakázek a statistik.',
    'Virtuální firma': 'Vozidla, řidiči, finance a historie celé virtuální firmy.',
    'GPS Companion': 'Navigace a informace o trase na druhém monitoru nebo mobilu.',
    'Servis': 'Servisní intervaly, poškození a provozní statistiky.',
    'Driver Assistant': 'Rychlost, další stanice, rychlostní profil a upozornění pro strojvedoucího.',
    'Sešitový jízdní řád': 'Kompletní vlakový jízdní řád v českém stylu.',
    'Brzdicí procenta': 'Výpočet brzdicích procent s databází vozidel a režimy P/G/R.',
    'Route Manager': 'Správa tratí, závislostí a instalovaného obsahu.',
    'Scenario Manager': 'Přehled scénářů a kontrola chybějících vozidel.',
    'Universal Display': 'Externí displej pro traktory, kombajny a další stroje.',
    'Field Manager': 'Přehled polí, plodin, stavu růstu a práce.',
    'Harvest Monitor': 'Výnos, hektary, průběh sklizně a výkon stroje.',
    'Machine Manager': 'Motohodiny, servis a provozní data techniky.',
    'Silo Monitor': 'Stav zásob v silech a skladových místech.',
    'IBIS Companion': 'Externí IBIS panel s linkou, kurzem, cílem a zastávkami.',
    'Route Assistant': 'Další zastávka, čas, vzdálenost a zpoždění.',
    'HOF Manager': 'Správa a převod HOF souborů.',
    'Passenger Monitor': 'Přehled cestujících a provozních dat autobusu.',
    'Server Manager': 'Start, stop, konzole a základní správa Minecraft serveru.',
    'Dashboard': 'TPS, RAM, hráči online, ping a stav serveru.',
    'Backup Manager': 'Ruční i automatické zálohy světů a konfigurace.',
    'Mod Manager': 'Přehled a správa modů nebo pluginů.'
  };
  return map[name] || `Modul ${name} pro ${gameId.toUpperCase()}.`;
}

async function init() {
  const appInfo = await window.kvaltikAPI.getAppInfo();
  document.getElementById('appVersion').textContent = appInfo.version;

  const manifest = await window.kvaltikAPI.listPlugins();
  plugins = manifest.plugins || [];
  document.getElementById('pluginCount').textContent = plugins.length;

  const cardGrid = document.getElementById('gameCards');
  cardGrid.innerHTML = '';

  plugins.forEach(plugin => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <div class="icon">${plugin.icon}</div>
      <strong>${plugin.name}</strong>
      <small>${plugin.modules.length} plánovaných modulů</small>
    `;
    card.addEventListener('click', () => openGame(plugin));
    cardGrid.appendChild(card);
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.page;
      setActiveNav(id);

      if (['tsc','ets2','fs22','omsi2','minecraft'].includes(id)) {
        const plugin = plugins.find(p => p.id === id);
        if (plugin) openGame(plugin);
        return;
      }

      showPage(id);
      const titles = {
        home: ['Kvaltík GameTools','Všechny tvoje herní nástroje na jednom místě.'],
        supporter: ['Supporter Center','Patreon, beta funkce a odměny.'],
        updates: ['Aktualizace','Stable/Beta kanál a budoucí auto-update.'],
        settings: ['Nastavení','Chování aplikace, telemetrie a vývojové volby.']
      };
      const [title, subtitle] = titles[id];
      document.getElementById('pageTitle').textContent = title;
      document.getElementById('pageSubtitle').textContent = subtitle;
    });
  });

  document.querySelectorAll('[data-jump]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.jump;
      document.querySelector(`.nav-item[data-page="${id}"]`)?.click();
    });
  });
}

init();
