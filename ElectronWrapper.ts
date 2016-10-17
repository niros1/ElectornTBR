//namespace TBR{
import * as impElectron from 'electron';

    
    export default class Main{
        static mainWindow: Electron.BrowserWindow;
        static application: Electron.App;
        static BrowserWindow;



        private static onWindowAllClosed() {
        if (process.platform !== 'darwin')
            Main.application.quit();
        }
        private static onClose(){
            // Dereference the window object.
            Main.mainWindow = null;
        }


        private static onReady(){
            Main.mainWindow = 
                new Main.BrowserWindow({width: 800, height: 600})
            Main.mainWindow
                .loadURL('file://' + __dirname + '/index.html');
            Main.mainWindow.on('closed', Main.onClose);
        }
        static main(
            app: Electron.App,
            browserWindow: typeof Electron.BrowserWindow){
            // we pass the Electron.App object and the 
            // Electron.BrowserWindow into this function
            // so this class has no dependencies.  This
            // makes the code easier to write tests for
    
            Main.BrowserWindow = browserWindow;
            Main.application = app;
            Main.application.on('window-all-closed',
                Main.onWindowAllClosed);
            Main.application.on('ready', 
                Main.onReady);
        }
    
    }

    // class Main {
    //     fullName: string;
    //     //myWin: BrowserWindow();
        
    //     //private mainWin : Electron.BrowserWindow;
        
    //     constructor(public firstName, public middleInitial, public lastName) {
    //         this.fullName = firstName + " XXX" + middleInitial + " " + lastName;

    //         var win1 = new impElectron.BrowserWindow();  
              
    //         console.log("test");
    //     }
    // }

    // export default class Main{
    //     //private mainWin : Electron.BrowserWindow;        
    //     private str1 : string;

    //     static main(){
    //         console.log("test");
    //     }


    // }
    // function greeter(person) {
    //     var mainWIn : Electron.BrowserWindow;
    
    
    //     return "Hello, " + person;
    // }

//}