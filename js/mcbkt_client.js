function ajax_as_promise (url, method = "GET", data) {
  if (! ( method in ["GET", "POST"] )) throw Error
    ("method must be one of GET and POST")
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

get('foo.txt')
.then((data) => {
  // Do stuff with data, if foo.txt was successfully loaded.
})
.catch((err) => {
  // Do stuff on error...
});
