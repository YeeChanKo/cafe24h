/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var Map = function () {
    function Map() {
        var _this = this;
        this.mapContainer = document.getElementById("map");
        this.mapOption = {
            center: new daum.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        this.zoomControl = new daum.maps.ZoomControl();
        this.infowindow = new daum.maps.InfoWindow({
            zIndex: 1
        });
        this.setCenter = function (position) {
            var moveLatLon = new daum.maps.LatLng(position.coords.latitude, position.coords.longitude);
            _this.map.setCenter(moveLatLon);
            _this.searchCafe();
        };
        this.panTo = function (position) {
            var moveLatLon = new daum.maps.LatLng(position.coords.latitude, position.coords.longitude);
            _this.map.panTo(moveLatLon);
        };
        this.placesSearchCB = function (status, data, pagination) {
            if (status === daum.maps.services.Status.OK) {
                for (var i = 0; i < data.places.length; i++) {
                    _this.displayMarker(data.places[i]);
                }
            }
        };
        this.initBinding();
        this.createMap();
    }
    Map.prototype.initBinding = function () {
        var _this = this;
        $("#search-box").on("click", "#current-location-button", function () {
            _this.getLocation(_this.setCenter);
        });
    };
    Map.prototype.createMap = function () {
        this.map = new daum.maps.Map(this.mapContainer, this.mapOption);
        this.map.addControl(this.zoomControl, daum.maps.ControlPosition.RIGHT);
        this.ps = new daum.maps.services.Places(this.map);
    };
    Map.prototype.getLocation = function (cb) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cb);
        } else {
            alert("geolocation is not supported in current browser!");
        }
    };
    Map.prototype.searchCafe = function () {
        this.ps.categorySearch("CE7", this.placesSearchCB, {
            useMapBounds: true
        });
    };
    Map.prototype.displayMarker = function (place) {
        var _this = this;
        var marker = new daum.maps.Marker({
            map: this.map,
            position: new daum.maps.LatLng(place.latitude, place.longitude)
        });
        daum.maps.event.addListener(marker, 'click', function () {
            _this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.title + '</div>');
            _this.infowindow.open(_this.map, marker);
        });
    };
    return Map;
}();
exports.Map = Map;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html lang=\"ko_KR\">\n\n<head>\n    <meta charset=\"utf-8\">\n    <title>Café 24H</title>\n    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">\n    <link href=\"https://fonts.googleapis.com/css?family=Yrsa:300\" rel=\"stylesheet\">\n    <link rel=\"stylesheet\" href=\"./base.css\">\n</head>\n\n<body>\n    <div id=\"body-wrapper\">\n        <header>\n            <h1>Café 24H</h1>\n            <p id=\"intro-description\">hello world</p>\n        </header>\n        <div class=\"input-group\" id=\"search-box\">\n            <span id=\"current-location-button\" class=\"btn btn-default input-group-addon glyphicon glyphicon-map-marker\"></span>\n            <input type=\"text\" class=\"form-control\" placeholder=\"지금 어디에 계신가요?\" aria-describedby=\"basic-addon1\">\n            <span class=\"btn btn-default input-group-addon\" id=\"basic-addon1\">찾기</span>\n        </div>\n        <div id=\"map\"></div>\n    </div>\n    <div id=\"navbar-wrapper\">\n        <div class=\"navbar-right\">\n            <a href=\"#\" class=\"list-group-item active\">Cras justo odio</a>\n            <a href=\"#\" class=\"list-group-item\">Dapibus ac facilisis in</a>\n            <a href=\"#\" class=\"list-group-item\">Morbi leo risus</a>\n            <a href=\"#\" class=\"list-group-item\">Porta ac consectetur ac</a>\n            <a href=\"#\" class=\"list-group-item\">Vestibulum at eros</a>\n        </div>\n    </div>\n\n    <!-- 여기 src //로 바꿔줄 것 -->\n    <script type=\"text/javascript\" src=\"https://apis.daum.net/maps/maps3.js?apikey=34d97112082d89fb861ca33f543ad02c&libraries=services\"></script>\n    <script type=\"text/javascript\" src=\"../node_modules/jquery/dist/jquery.min.js\"></script>\n    <script type=\"text/javascript\" src=\"./bundle.js\"></script>\n</body>\n\n</html>\n"

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
__webpack_require__(1);
var map_ts_1 = __webpack_require__(0);
var map = new map_ts_1.Map();
map.createMap();

/***/ })
/******/ ]);