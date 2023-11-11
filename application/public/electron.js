const { app, BrowserWindow, autoUpdater, dialog } = require("electron");
const path = require("path");

const server = "https://update.electronjs.org";
const feed = `${server}/atk21009/senior-project/${process.platform}-${
  process.arch
}/${app.getVersion()}`;

autoUpdater.setFeedURL(feed);

setInterval(() => {
  autoUpdater.checkForUpdates();
}, 10 * 60 * 1000);

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
    autoHideMenuBar: true,
    icon: __dirname + "/icons/icon128.png",
  });
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);
