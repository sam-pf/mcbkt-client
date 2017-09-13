(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("mcbkt-client", [], factory);
	else if(typeof exports === 'object')
		exports["mcbkt-client"] = factory();
	else
		root["mcbkt-client"] = factory();
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
 * @file This module contains utility functions for accessing MCBKT engine of
 *    <a href="https://ukde.physicsfront.com">UKDE by Physics Front</a>.
 * @copyright (c) 2017, Sam Gweon (Sam@physicsfront.com)
 * @license <a href="https://www.apache.org/licenses/LICENSE-2.0">
 *    Apache License, Version 2.0</a> (also, see file NOTICE).
 * @author Sam Gweon (Sam@physicsfront.com)
 * @version 0.1.0
 * @module mcbkt-client
 */



/**
 * Makes an ajax call to <tt>url</tt> and returns a <tt>Promise</tt> object.
 *
 * @returns {} A <tt>Promise</tt> object.  The returned object can be
 *   used as shown in the example.
 * @example
 * ajax_as_promise ('https://...', ...)
 *   .then ((data) =>
 *      // do stuff with return data on successfully resolved promise
 *      [, (reason) =>
 *      // do stuff with reason on rejected promise
 *      ]
 *   )
 *   .catch ((err) =>
 *      // deal with any errror thrown
 *   )
 * @see https://stackoverflow.com/questions/8567114/
 *
 * @param {String} url - URL to connect to.
 * @param {String} [method="get"] - Http(s) method such as "get" or "post"
 *   (case-independent).  If <tt>url</tt> does not use http(s) protocol, then
 *   this argument is ignored.
 * @param {} [data] - Any data that will be sent as
 *   <tt>JSON</tt> along with the URL request.  Any false value of
 *   this argument means no <tt>JSON</tt> data.  Any true value will be
 *   converted to <tt>JSON</tt> to be sent.  Naturally, such value also
 *   causes the "Content-Type" header to be set to "json" for the
 *   <tt>XMLHttpRequest</tt> object that opens request to <tt>url</tt>.
 * @param {Object} [header] - A hashmap that will be set as request header.
 */

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.ajax_as_promise = ajax_as_promise;
exports.post_scores_for_mcbkt_analysis = post_scores_for_mcbkt_analysis;
exports.post_logdata_for_mcbkt_analysis = post_logdata_for_mcbkt_analysis;
function ajax_as_promise(url) {
   var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";
   var data = arguments[2];
   var header = arguments[3];

   // temporary measure
   if (!/^https?:\/\/codap.concord.org/.test(window.top.location)) return;
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
      if (header !== undefined) for (var key in header) {
         req.setRequestHeader(key, header[key]);
      }req.send(data);
   });
}

/**
 * Makes an ajax call to UKDE to post score data and potentially get a MCBKT
 * calculation done.
 *
 * @returns {} A <tt>Promise</tt> object.  The returned object can be
 *   used as shown in the example.  Just because the promise is successfully
 *   fulfilled does not mean that the returned data will contain MCBKT
 *   analysis result.  If <tt>error</tt> field does not exist, data will
 *   contain valid MCBKT analysis result.
 * @example
 * post_scores_for_mcbkt_analysis (data, ...)
 *   .then ((data) =>
 *      // do stuff with return data on successfully resolved promise
 *      [, (reason) =>
 *      // do stuff with reason on rejected promise
 *      ]
 *   )
 *   .catch ((err) =>
 *      // deal with any errror thrown
 *   )
 *
 * @param {} [data] - This must be a hashmap with an entry "scores", which
 *   must hold an array of numbers, normally bound within the [0,1] range.
 *   Optional entries include "score-max' and "times".
 * @param {String} [url] - The URL for the MCBKT analysis.  For security,
 *   no sensitive information must appear in the URL (or data).  The current
 *   default value is a temporary one that should work "for a while".
 *   However, it may stop working at some point, e.g., if better proxy URLs
 *   are available.
 */
function post_scores_for_mcbkt_analysis(data) {
   var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://ukde.physicsfront.com/mcbkt/codapproxy_stub';
   var header = arguments[2];

   // temporary measure
   if (!/^https?:\/\/codap.concord.org/.test(window.top.location)) return;
   return ajax_as_promise(url, 'post', data, header);
}

/**
 * Makes an ajax call to UKDE to post logdata and potentially get a MCBKT
 * calculation done.
 *
 * @returns {} A <tt>Promise</tt> object.  The returned object can be
 *   used as shown in the example.  When the promise is successfully
 *   fulfilled, the returned data may not contain any MCBKT analysis result.
 *   Only when the accumulated data merit a new MCBKT analysis, data will
 *   contain MCBKT analysis result.
 * @example
 * post_logdata_for_mcbkt_analysis (logdata, ...)
 *   .then ((data) =>
 *      // do stuff with return data on successfully resolved promise
 *      [, (reason) =>
 *      // do stuff with reason on rejected promise
 *      ]
 *   )
 *   .catch ((err) =>
 *      // deal with any errror thrown
 *   )
 *
 * @param {} [logdata] - This must be the logdata in the form of a hashmap.
 * @param {String} [url] - The URL for the MCBKT analysis.  For security,
 *   no sensitive information must appear in the URL (or logdata).  The
 *   current default value is a temporary one that should work "for a while".
 *   However, it may stop working at some point, e.g., if better proxy URLs
 *   are available.
 */
function post_logdata_for_mcbkt_analysis(logdata) {
   var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://ukde.physicsfront.com/logdata/codapproxy_stub';
   var header = arguments[2];

   // temporary measure
   if (!/^https?:\/\/codap.concord.org/.test(window.top.location)) return;
   return ajax_as_promise(url, 'post', logdata, header);
}

/**
 * <b>default export:</b> <a
 * href="#.post_logdata_for_mcbkt_analysis">post_logdata_for_mcbkt_analysis</a>
 */
exports.default = post_logdata_for_mcbkt_analysis;

/***/ })
/******/ ]);
});
//# sourceMappingURL=mcbkt-client_compiled_umd_nobp.js.map