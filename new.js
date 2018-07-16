const{remote, ipcRenderer} = require('electron');

const loginButton = document.getElementById("login");
loginButton.addEventListener('click', (event) =>{
   ipcRenderer.send('btnlogin')
})