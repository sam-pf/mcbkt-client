/**
 * @file This module contains utility functions for accessing MCBKT engine of
 *    <a href="https://ukde.physicsfront.com">UKDE by Physics Front</a>.
 *    By design, the utility functions contained in this module are
 *    content-agnostic and merely make generic ajax calls.  So, this module
 *    has no knowledge about how UKDE connections actually work.  The actual
 *    work is to be carried out by the (hidden and hard-coded) URLs
 *    referenced in this file.  Such work should be carried out in a secure
 *    manner in the backend: this is the job left for the users of this
 *    module.
 * @copyright (c) 2017, Sam Gweon (Sam@physicsfront.com)
 * @license <a href="https://www.apache.org/licenses/LICENSE-2.0">
 *    Apache License, Version 2.0</a> (also, see file NOTICE).
 * @author Sam Gweon (Sam@physicsfront.com)
 * @version 0.1.0
 * @module mcbkt-client
 */

"use strict"

/**
 * Makes an ajax call to <tt>url</tt> and returns a <tt>Promise</tt> object.
 *
 * @returns {} A <tt>Promise</tt> object.  The returned object can be
 *   used as shown in the example.
 * @example
 * // This example is meant to be a pseudo-code, not a valid javascript
 * // code.  For instance, square brackets ([ ... ]) are used to denote
 * // optional content.
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
export function ajax_as_promise (url, method = "GET", data, header) {
   method = method.toUpperCase ()
   // console.log ("** url = " + url + "; method = " + method + "; data = " +
   //              JSON.stringify (data))
   return new Promise ((resolve, reject) => {
      const req = new XMLHttpRequest ()
      req.open (method, url)
      req.onload = () => (req.status === 200) ? resolve (req.response) :
      reject (Error (req.statusText))
      req.onerror = (e) => reject (Error (`Network Error: ${e}`))
      if (data) {
         req.setRequestHeader ("Content-Type", "application/json;charset=UTF-8")
         data = JSON.stringify (data)
      }
      if (header !== undefined)
         for (const key in header)
            req.setRequestHeader (key, header [key])
      req.send (data)
   })
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
 * // This example is meant to be a pseudo-code, not a valid javascript
 * // code.  For instance, square brackets ([ ... ]) are used to denote
 * // optional content.
 * post_scores_for_mcbkt_analysis (scores, ...)
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
 * @param {} scores - This must be a hashmap with an entry "scores", which
 *   must hold an array of numbers, normally bound within the [0,1] range.
 *   Optional entries include "score-max' and "times".
 */
// eslint-disable-next-line no-unused-vars
export function post_scores_for_mcbkt_analysis (scores) {
   // let args = Array.prototype.splice.call (arguments, 1)
   return ajax_as_promise (scores_url, 'post',
                           Array.prototype.slice.call (arguments))
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
 * // This example is meant to be a pseudo-code, not a valid javascript
 * // code.  For instance, square brackets ([ ... ]) are used to denote
 * // optional content.
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
 * @param {} logdata - This must be the logdata in the form of a hashmap.
 */
// eslint-disable-next-line no-unused-vars
export function post_logdata_for_mcbkt_analysis (logdata) {
   // let args = Array.prototype.splice.call (arguments, 1)
   return ajax_as_promise (logdata_url, 'post',
                           Array.prototype.slice.call (arguments))
}

const base_url = (function () {
   let l = window.location
   return l.protocol + '//' + l.host + (l.port? (':' + l.port): '')
})() + '/_up'

const logdata_url = base_url + '/logdata'
const scores_url = base_url + '/scores'

/**
 * <b>default export:</b> <a
 * href="#.post_logdata_for_mcbkt_analysis">post_logdata_for_mcbkt_analysis</a>
 */
export default post_logdata_for_mcbkt_analysis
