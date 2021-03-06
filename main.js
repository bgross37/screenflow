const { app, BrowserWindow } = require('electron')
global.windows = {'main': null, 'overlay1': null};
function createWindow () {
  // Create the browser window.
  global.windows.main = new BrowserWindow({ width: 800, height: 600 })
  global.windows.overlay1 = new BrowserWindow({ width: 800, height: 600, frame: false })

  // and load the index.html of the app.
  global.windows.main.loadFile('main/pages/presenter.html')
  global.windows.overlay1.loadFile('overlay/pages/overlay.html')

  global.windows.main.openDevTools();
  global.windows.overlay1.openDevTools();

  global.windows.overlay1.setFullScreen(true);

  // Emitted when the window is closed.
  global.windows.main.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    global.windows = null
  })
  // Emitted when the window is closed.
  global.windows.overlay1.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    global.windows.overlay1 = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (windows.main === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
