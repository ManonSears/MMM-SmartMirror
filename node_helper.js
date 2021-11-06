/* Magic Mirror
 * MMM-SmartMirror.js
 *
 * Built off of SmartBuilds.io - Pratik and Eben
 * https://smartbuilds.io
 * MIT Licensed.
 */
const NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function () {
    this.started = false;
    this.config = {};
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'CONFIG') {
      if (!this.started) {
        this.config = payload;
        this.started = true;
        console.log("Smart Mirror module has started")
        this.sendSocketNotification("SHUTIT", payload);
      }
    }

    if (notification === "SHUTDOWN") {
      console.log("Shutting down Rpi...")
      require('child_process').exec('shutdown -h now', console.log)
    }

    if (notification === "RESTART") {
      console.log("Restarting Rpi...")
      require('child_process').exec('sudo reboot', console.log)
    }

    if (notification === "BIRD") {
      Module.register("MMM-Birds",{

        defaults: {
            height:"270px",
            width:"480px",
            animationSpeed: "0",
            updateInterval: 60 * 60 * 1000,
        },
      
          start: function () {
          self = this;
      
          setInterval(function() {
          self.updateDom(self.config.animationSpeed || 0);
          }, this.config.updateInterval);
      
        },
      
        getStyles: function() {
              return ["css/mmm-birds.css"];
          },
      
        getDom: function() {
      
          var iframe = document.createElement("IFRAME");
          iframe.classList.add("iframe");
          iframe.style = "border: 0 none transparent";
          iframe.width = this.config.width;
          iframe.height = this.config.height;
          type="text/javascript";
          iframe.src="http://kayla.manonx.com/birds.html";

          // <iframe width="480" height="270" src="http://www.ustream.tv/embed/17074538?html5ui" scrolling="no" allowfullscreen webkitallowfullscreen frameborder="0" style="border: 0 none transparent;"></iframe>

          return iframe;
        },
      
         /////  Add this function to the modules you want to control with voice //////
      
          notificationReceived: function(notification, payload) {
              if (notification === 'HIDE_EARTH') {
                  this.hide(1000);
              }  else if (notification === 'SHOW_EARTH') {
                  this.show(1000);
              }
      
          },
      
      });
    }
  },
});
