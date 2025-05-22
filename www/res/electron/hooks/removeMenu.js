const fs = require('fs');
const path = require('path');

const ELECTRON_MAIN_PATH = path.join('platforms', 'electron', 'platform_www', 'cdv-electron-main.js');

// Verificação robusta do arquivo
if (!fs.existsSync(ELECTRON_MAIN_PATH)) {
  console.error('removeMenu: ❌ Arquivo principal do Electron não encontrado!');
  console.info('removeMenu: Execute primeiro: cordova prepare electron');
  process.exit(1);
}

// Conteúdo inejeta
const MENU_REMOVAL_CODE = `
// ===== MENU REMOVAL INJECTION =====
mainWindow.removeMenu();
mainWindow.setMenu(null);
// =================================
`;

let content = fs.readFileSync(ELECTRON_MAIN_PATH, 'utf8');

// Ponto de injeção seguro
const injectionPoint = 'mainWindow = new BrowserWindow(browserWindowOpts);';
if (!content.includes(injectionPoint)) {
  console.error('removeMenu: ❌ Não foi possível encontrar o ponto de injeção no arquivo');
  process.exit(1);
}

// Faz a substituição
content = content.replace(
  injectionPoint,
  `${injectionPoint}\n${MENU_REMOVAL_CODE}`
);

// Escreve de volta com tratamento de erro
try {
  fs.writeFileSync(ELECTRON_MAIN_PATH, content, 'utf8');
  console.log('removeMenu: ✅ Barra de menus removida com sucesso!');
  console.log('removeMenu: Recompile o projeto: cordova build electron');
} catch (error) {
  console.error('removeMenu: ❌ Falha ao escrever no arquivo:', error);
}