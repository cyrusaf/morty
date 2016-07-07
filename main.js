const electron = require('electron');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;
const windowStateKeeper = require('electron-window-state');
const fs = require('fs')

// Check if root_dir exists, and make if not
const root_dir = process.env.HOME + "/.morty"
if (!fs.existsSync(root_dir)){
  fs.mkdirSync(root_dir);
}
// Check if config exists and create/load
let config = null
if (!fs.existsSync(`${root_dir}/config.json`)){
  config = {
  }
  fs.writeFileSync(`${root_dir}/config.json`, JSON.stringify(config))
} else {
  config = JSON.parse(fs.readFileSync(`${root_dir}/config.json`, 'utf8'))
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 500
  });

  // Create the browser window.
  win = new BrowserWindow({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height,
    frame: false
  });

  mainWindowState.manage(win);

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/public/index.html`);

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.

    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
    app.quit();
  // }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
