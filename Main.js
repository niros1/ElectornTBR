const {app, BrowserWindow, Menu } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win


function CreateMenu(){
  let template = [{
    label: 'Options',
    submenu: [{
      label: 'DevOps',
      click: function (item, focusedWindow) {
        win.webContents.openDevTools();
      }
    }]
  }]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu);
}




function GetReady(){
   


  SpawnServer();
  console.log('Waiting for server,');
  setTimeout(createWindow, 10000);
  
}


/////////////////Spawn server

const spawn = require('child_process').spawn;
var serverProc = null;
function SpawnServer(){
  var process = require('process');
  var pathPrefix = "";

  //Check if it's deployment package or dev, cmd.exe meaning dev
  if(!process.title.includes("cmd.exe")){
      pathPrefix = "resources\\app\\"
  }

  serverProc = spawn(pathPrefix + "Externals\\MultiPlat\\Debug\\PcPlatformSvc.exe");   
  serverProc.stdout.on('data', (data) => {
    console.log(data);
  });

  serverProc.stderr.on('data', (data) => {
    console.log(data);
  });

  serverProc.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });
}




/*
function StartTBRServer(){
  const exec = require('child_process').exec;
  exec("Resources\\MultiPlat\\Debug\\PcPlatformSvc.exe", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}*/



////////////////// END of Spawn server


function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  //win.loadURL(`file://${__dirname}/App/index.html`)
  win.loadURL("http://127.0.0.1:7681/");
  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  CreateMenu();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', GetReady)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  serverProc.kill('SIGINT');

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
