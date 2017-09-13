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

"use strict"

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
export function ajax_as_promise (url, method = "GET", data, header) {
   // temporary measure
   if (! /^https?:\/\/codap.concord.org/.test (window.top.location)) return
   method = method.toUpperCase ()
   return new Promise ((resolve, reject) => {
      const req = new XMLHttpRequest ()
      req.open (method, url)
      req.onload = () => (req.status === 200) ? resolve (req.response) :
      reject (Error (req.statusText))
      req.onerror = (e) => reject (Error (`Network Error: ${e}`))
      if ( data ) {
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
export function post_scores_for_mcbkt_analysis (data,
      url = 'https://ukde.physicsfront.com/mcbkt/codapproxy_stub',
      header) {
   // temporary measure
   if (! /^https?:\/\/codap.concord.org/.test (window.top.location)) return
   return ajax_as_promise (url, 'post', data, header)
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
export function post_logdata_for_mcbkt_analysis (logdata,
      url = 'https://ukde.physicsfront.com/logdata/codapproxy_stub',
      header) {
   // temporary measure
   if (! /^https?:\/\/codap.concord.org/.test (window.top.location)) return
   return ajax_as_promise (url, 'post', logdata, header)
}

/**
 * <b>default export:</b> <a
 * href="#.post_logdata_for_mcbkt_analysis">post_logdata_for_mcbkt_analysis</a>
 */
export default post_logdata_for_mcbkt_analysis
