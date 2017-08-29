(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("mcbktclient", [], factory);
	else if(typeof exports === 'object')
		exports["mcbktclient"] = factory();
	else
		root["mcbktclient"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileOverview This module, <tt>mcbkt_client</tt>, contains utility
 *   functions for accessing MCBKT engine of <a
 *   href="https://ukde.physicsfront.com">UKDE by Physics Front</a>.
 * @author Sam Gweon (email: Sam at physicsfront.com)
 * @license <a href="https://opensource.org/licenses/BSD-3-Clause">
 *   BSD-3-Clause</a>
 * @version 0.1.0
 * @module mcbkt_client
 */

/**
 * Makes an ajax call to <tt>url</tt> and returns a <tt>Promise</tt> object.
 *
 * @returns {} A <tt>Promise</tt> object.  The returned object can be
 *   used as shown in the example.
 * @example
 * ajax_as_promise ('https://...', ...)
 *   .then ((data) => {
 *      // do stuff with data
 *   })
 *   .catch ((err) => {
 *      // do stuff on error
 *   })
 * @see https://stackoverflow.com/questions/8567114/
 *
 * @param {String} url - URL to connect to.
 * @param {String} [method="get"] - Http(s) method such as "get" or "post"
 *   (case-independent).  If <tt>url</tt> does not use http(s) protocol, then
 *   this argument is ignored.
 * @param {JSON.stringfy-able} [data] - Any data that will be sent as
 *   <tt>JSON</tt> along with the URL request.  Any false value of
 *   this argument means no <tt>JSON</tt> data.  Any true value will be
 *   converted to <tt>JSON</tt> to be sent.  Naturally, such value also
 *   causes the "Content-Type" header to be set to "json" for the
 *   <tt>XMLHttpRequest</tt> object that opens request to <tt>url</tt>.  Type
 *   requirement: <tt>JSON.stringify</tt> is called on <tt>data</tt> in order
 *   to prepare <tt>JSON</tt> to send and so the value of this argument
 *   should be <tt>JSON.stringify</tt>-able.
 */
var ajax_as_promise = function ajax_as_promise(url) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";
  var data = arguments[2];

  method = method.toUpperCase();
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open(method, url);
    req.onload = function () {
      return req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
    };
    req.onerror = function (e) {
      return reject(Error("Network Error: " + e));
    };
    if (data) {
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      data = JSON.stringify(data);
    }
    req.send(data);
  });
};

// export default function () {}

exports.ajax_as_promise = ajax_as_promise;

/***/ })
/******/ ]);
});