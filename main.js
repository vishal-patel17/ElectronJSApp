const {app, BrowserWindow} = require('electron');
const { ipcMain } = require('electron');
const path = require('path');
const url = require('url');

// init win
let win;
let loginWin;

function createWindow()
{
	// Create browser window
	win = new BrowserWindow({
		width:400,
		height:400
	});

	// Load index.html
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true 
	}));

	// Open devtools
	// win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
		loginWin = null;
		app.quit();
	})
}

function createLoginWindow()
{
	loginWin = new BrowserWindow({
		width: 500,
		height: 400
	});
	loginWin.loadURL(url.format({
		pathname: path.join(__dirname, 'login.html'),
		protocol: 'file',
		slashes: true
	}));
	loginWin.on('closed', () => {
		loginWin = null;
	});
}

ipcMain.on('btnlogin', function(){
	createLoginWindow();
});

// Run Created Window
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () =>{
	if(process.platform !== 'darwin')
	{
		app.quit();
	}
})

// For MacOS Reopen window
app.on('activate', () => {
	if(win === null)
	{
		createWindow();
	}
})