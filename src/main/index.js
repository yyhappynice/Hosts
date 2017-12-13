const url = require('url')
const path = require('path')
const {app, BrowserWindow} = require('electron')

let win
// const winURL = path.join(__dirname, '../renderer/index.html')
const winURL = `http://127.0.0.1:8090/`

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 560,
    resizable: false,
    useContentSize: true,
    darkTheme: true,
    backgroundColor: '#FFF'
  })

  // and load the index.html of the app.
  win.loadURL(winURL)

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})