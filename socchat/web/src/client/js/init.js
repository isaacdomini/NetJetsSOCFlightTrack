(function(global) {

    "use strict;"

    var Config = {};


    Config.apiBaseUrl = "http://localhost:3001/socchat/v1";
    Config.socketUrl = "http://localhost:3001/socchat";

    Config.googleMapAPIKey = "";

    Config.defaultContainer = "#spika-container";
    Config.lang = "en";
    Config.showSidebar = true;
    Config.showTitlebar = true;
    Config.useBothSide = false;
    Config.thumbnailHeight = 256;

    // Exports ----------------------------------------------
    module["exports"] = Config;

})((this || 0).self || global);
