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
function ajax_as_promise (url, method = "GET", data) {
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

// export default function () {}

exports.ajax_as_promise = ajax_as_promise

function ukde_api_key_please (url, handler) {
  if ( url == undefined )
    url = 'https://ukde.physicsfront.home/ukde_api_key_please'
  ajax_as_promise (url).then (data => handler (data))
}

exports.ukde_api_key_please = ukde_api_key_please
