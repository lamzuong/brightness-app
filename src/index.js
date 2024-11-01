const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");
const path = require("node:path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 550,
    height: 200,
    icon: path.join(__dirname, "assets/icons/brightness-icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: true,
      nodeIntegration: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

ipcMain.handle("set-brightness", async (event, brightnessValue) => {
  return new Promise((resolve, reject) => {
    exec(`xrandr -q | grep " connected"`, (error, stdout, stderr) => {
      if (stdout) {
        const arrayStdout = stdout.split(" ");
        const indexPrimary = arrayStdout.indexOf("primary");
        const device = arrayStdout[indexPrimary - 2]; // eDP-1
        const brightness = brightnessValue.toFixed(2);

        exec(
          `xrandr --output ${device} --brightness ${brightness}`,
          (error, stdout, stderr) => {
            if (error) {
              reject(`Error executing xrandr: ${error.message}`);
            } else if (stderr) {
              reject(`stderr: ${stderr}`);
            } else {
              resolve(`Brightness set to ${brightness}`);
            }
          }
        );
      }
    });
  });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
