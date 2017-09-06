"use strict"

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
 *   .then ((data) =>
 *      // do stuff with data
 *   )
 *   .catch ((err) =>
 *      // do stuff on error
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
 */
export function ajax_as_promise (url, method = "GET", data) {
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
    req.send (data)
  })
}

/**
 * Makes an ajax call to UKDE to post score data and potentially get a MCBKT
 * calculation done.
 *
 * @returns {} A <tt>Promise</tt> object.  The returned object can be
 *   used as shown in the example.  When the promise is successfully
 *   fulfilled, the returned data may not contain any MCBKT analysis result.
 *   Only when the accumulated data merit a new MCBKT analysis, data will
 *   contain MCBKT analysis result.
 * @example
 * ajax_as_promise ('https://...', ...)
 *   .then ((data) =>
 *      // do stuff with data
 *   )
 *   .catch ((err) =>
 *      // do stuff on error
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
      url = 'https://ukde.physicsfront.com/mcbkt/codapproxy_stub') {
   return ajax_as_promise (url, 'post', data)
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
 * ajax_as_promise ('https://...', ...)
 *   .then ((data) =>
 *      // do stuff with data
 *   )
 *   .catch ((err) =>
 *      // do stuff on error
 *
 * @param {} [logdata] - This must be the logdata in the form of a hashmap.
 * @param {String} [url] - The URL for the MCBKT analysis.  For security,
 *   no sensitive information must appear in the URL (or logdata).  The
 *   current default value is a temporary one that should work "for a while".
 *   However, it may stop working at some point, e.g., if better proxy URLs
 *   are available.
 */
export default function post_logdata_for_mcbkt_analysis (logdata,
      url = 'https://ukde.physicsfront.com/logdata/codapproxy_stub') {
   return ajax_as_promise (url, 'post', logdata)
}
