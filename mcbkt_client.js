function ajax_as_promise (url, method = "GET", data) {
  /*
   * Makes an asynchronous ajax call to url, and returns a Promise object.
   *
   * Arguments:
   *
   * method:  'get' or 'post' (case-independent).  This argument is
   *          meaningful only if url uses http(s) protocol.
   *
   * data:  Any data that will be passed as JSON.  If data is passed a value,
   *        then "Content-Type" header is set as JSON for the XMLHttpRequest.
   *
   * The return value (Promise object) can be used as follows.
   *
   *    ajax_as_promise ('https://...')
   *    .then ((data) => {
   *      // Do stuff with data, if foo.txt was successfully loaded.
   *    })
   *    .catch ((err) => {
   *      // Do stuff on error...
   *    })
   *
   * Reference: https://stackoverflow.com/questions/8567114/
   */
  method = method.toUpperCase ()
  if (! /^(GET|POST)$/.test (method))
    throw Error (`Unsupported method: ${method}`)
  return new Promise ((resolve, reject) => {
    const req = new XMLHttpRequest ()
    req.open (method, url)
    req.onload = () => req.status === 200 ? resolve (req.response) :
      reject (Error (req.statusText))
    req.onerror = (e) => reject (Error (`Network Error: ${e}`))
    if ( data != undefined ) {
      req.setRequestHeader ("Content-Type", "application/json;charset=UTF-8")
      data = JSON.stringify (data)
    }
    req.send (data)
  })
}
