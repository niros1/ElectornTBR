"use strict";
var Main = (function () {
    function Main() {
    }
    Main.onWindowAllClosed = function () {
        if (process.platform !== 'darwin')
            Main.application.quit();
    };
    Main.onClose = function () {
        // Dereference the window object.
        Main.mainWindow = null;
    };
    Main.onReady = function () {
        Main.mainWindow =
            new Main.BrowserWindow({ width: 800, height: 600 });
        Main.mainWindow
            .loadURL('http://ynet.co.il');
        Main.mainWindow.on('closed', Main.onClose);
    };
    Main.main = function (app, browserWindow) {
        // we pass the Electron.App object and the 
        // Electron.BrowserWindow into this function
        // so this class has no dependencies.  This
        // makes the code easier to write tests for
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    };
    return Main;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Main;
//# sourceMappingURL=ElectronWrapper.js.map