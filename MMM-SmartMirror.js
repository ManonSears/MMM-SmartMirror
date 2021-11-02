/* Magic Mirror
 * MMM-SmartMirror.js
 *
 * Built off of SmartBuilds.io - Pratik and Eben
 * https://smartbuilds.io
 * MIT Licensed.
 */

const { fileURLToPath } = require("url");

Module.register("MMM-SmartMirror", {
  defaults: {
  },

  start: function () {
    Log.info(this.name + " has started...");
    this.sendSocketNotification("CONFIG", this.config);
  },

  getStyles: function () {
    return [this.file("css/mmm-smartmirror.css"), "font-awesome.css"];
  },

  // Load translations files
  getTranslations: function () {
    return {
      en: "translations/en.json",
      nb: "translations/nb.json",
    };
  },

  createContainerDiv: function () {
    const containerDiv = document.createElement("div");
    containerDiv.className = "st-container";

    return containerDiv;
  },

  toggleStandby: function () {
    const existingBodyClass = document.body.className;
    if (existingBodyClass === "st-standby show") {
      document.body.className = "st-standby fade";
    } else {
      document.body.className = "st-standby show";
    }
  },

  createStandByButtonDiv: function () {
    const standByButtonDiv = document.createElement("div");
    standByButtonDiv.className = "st-container__standby-button";

    standByButtonDiv.appendChild(document.createElement("span"))
    standByButtonDiv.addEventListener("click", () => this.toggleStandby());

    return standByButtonDiv;
  },

  toggleSideMenu: function () {
    const menuToggleDiv = document.getElementById("st-menu-toggle")
    menuToggleDiv.classList.toggle('show');

    const mainMenuDiv = document.getElementById("st-main-menu")
    mainMenuDiv.classList.toggle('show')
  },

  createMenuToggleButtonDiv: function () {
    const menuToggleButtonDiv = document.createElement("div");
    menuToggleButtonDiv.className = "st-container__menu-toggle";
    menuToggleButtonDiv.id = "st-menu-toggle";

    const hamburgerLineOne = document.createElement("div");
    hamburgerLineOne.className = "st-container__menu-toggle st-toggle__bar_one";

    const hamburgerLineTwo = document.createElement("div");
    hamburgerLineTwo.className = "st-toggle__bar_two";

    const hamburgerLineThree = document.createElement("div");
    hamburgerLineThree.className = "st-toggle__bar_three";

    menuToggleButtonDiv.appendChild(hamburgerLineOne);
    menuToggleButtonDiv.appendChild(hamburgerLineTwo);
    menuToggleButtonDiv.appendChild(hamburgerLineThree);

    menuToggleButtonDiv.addEventListener("click", () => this.toggleSideMenu());

    return menuToggleButtonDiv;
  },

  createShutdownButton: function () {
    const shutdownButtonItem = document.createElement("li");
    shutdownButtonItem.innerHTML = "<span class='fa fa-power-off fa-3x'></span>"
        + "<br>" +  this.translate('SHUTDOWN');
    shutdownButtonItem.className = "li-t"

    // Send shutdown notification when clicked
    shutdownButtonItem.addEventListener("click",
        () => this.sendSocketNotification("SHUTDOWN", {}));

    return shutdownButtonItem
  },

  createRestartButton: function () {
    const restartButtonItem = document.createElement("li");
    restartButtonItem.innerHTML = "<span class='fa fa-repeat fa-3x'></span>"
        + "<br>" + this.translate('RESTART');
    restartButtonItem.className = "li-t"

    // Send restart notification when clicked
    restartButtonItem.addEventListener("click",
        () => this.sendSocketNotification("RESTART", {}));

    return restartButtonItem
  },

  createBirdButton: function () {
    const birdButtonItem = document.createElement("li");
    birdButtonItem.innerHTML = "<span class='fa fa-twitter fa-3x'></span>"
        + "<br>" + this.translate('BIRD');
    birdButtonItem.className = "li-t"

    // Send bird notification when clicked
    birdButtonItem.addEventListener("click",
        () => {/*
          Module.register("MMM-HTMLBox",{
            defaults: {
              width: "100%",
              height: "inherit",
              refresh_interval_sec: 0,
              content: "There is nothing to display. <br>Put your HTML code into content field in 'config.js'.",
              file: "birds.html",
            },
          
            start: function() {
              this.timer = null
          
            },
          
            notificationReceived: function(noti, payload, sender) {
              if (noti == "DOM_OBJECTS_CREATED") {
                this.refresh()
              }
            },
          
            refresh: function() {
              if (this.config.file !== "") {
                this.readFileTrick("/modules/MMM-HTMLBox/" + this.config.file)
              }
              this.updateDom()
              if (this.config.refresh_interval_sec > 0) {
                var self = this
                this.timer = setTimeout(function(){
                  self.refresh()
                }, this.config.refresh_interval_sec * 1000)
              }
            },
          
            getDom: function() {
              var wrapper = document.createElement("div")
              wrapper.innerHTML = this.config.content
              wrapper.className = "HTMLBX"
              wrapper.style.width = this.config.width
              wrapper.style.height = this.config.height
              return wrapper
            },
          
            readFileTrick: function (url, callback) {
              var xmlHttp = new XMLHttpRequest()
              var self = this
              xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                  console.log("EEE!")
                  self.config.content = xmlHttp.responseText
                  self.updateDom()
                }
              }
              xmlHttp.open("GET", url, true)
              xmlHttp.send(null)
            }
          })*/
        })
  },

  createMainMenuDiv: function () {
    const mainMenuDiv = document.createElement("div");
    mainMenuDiv.className = "st-container__main-menu";
    mainMenuDiv.id = "st-main-menu";

    const shutdownButton = this.createShutdownButton();
    const restartButton = this.createRestartButton();
    const birdButton = this.createBirdButton();

    const buttonList = document.createElement("ul");
    buttonList.appendChild(shutdownButton);
    buttonList.appendChild(restartButton);
    buttonList.appendChild(birdButton);

    mainMenuDiv.appendChild(buttonList);

    return mainMenuDiv;
  },

  getDom: function () {
    // Initial standby state
    document.body.className = "st-standby show";

    const container = this.createContainerDiv();

    const standByButton = this.createStandByButtonDiv();
    container.appendChild(standByButton);

    const menuToggleButton = this.createMenuToggleButtonDiv();
    container.appendChild(menuToggleButton);

    const mainMenu = this.createMainMenuDiv();
    document.body.appendChild(mainMenu);

    return container;
  },

  notificationReceived: function (notification, payload, sender) {
  },

  // Recieve notification from sockets via nodehelper.js
  socketNotificationReceived: function (notification, payload) {
  },

});
