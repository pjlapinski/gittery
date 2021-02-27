import { app, BrowserWindow, ipcMain, Menu, MenuItemConstructorOptions } from 'electron';
import isDev from 'electron-is-dev';

declare global {
  const MAIN_WINDOW_WEBPACK_ENTRY: string;
}

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: null | BrowserWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minHeight: 700,
    minWidth: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const appMenu = Menu.buildFromTemplate(appMenuTemplate);
  Menu.setApplicationMenu(appMenu);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const appMenuTemplate: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform === 'darwin') {
  appMenuTemplate.unshift({});
}

if (isDev) {
  appMenuTemplate.push({
    label: 'Dev Tools',
    submenu: [
      {
        label: 'Toggle Dev Tools',
        accelerator: 'CmdOrCtrl+Shift+I',
        click() {
          mainWindow?.webContents.toggleDevTools();
        },
      },
      {
        label: 'Clear Local Storage',
        click() {
          mainWindow?.webContents.send('clear-local-storage');
        },
      },
      {
        label: 'Reload',
        accelerator: 'F5',
        click() {
          mainWindow?.reload();
        },
      },
      {
        label: 'Force Reload',
        accelerator: 'Shift+F5',
        click() {
          mainWindow?.webContents.reloadIgnoringCache();
        },
      },
    ],
  });
}

ipcMain.on('request-reload', () => {
  mainWindow?.webContents.reloadIgnoringCache();
});
