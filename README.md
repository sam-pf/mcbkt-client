# Javascript library for mcbkt client

The `mcbkt-client` module can be used by clients of the MCBKT engine of UKDE
by Physics Front.

The javascript module `mcbkt-client` can be found in folder `src`.  This
module is written in pure javascript without using any external library.
However, the library is written using some features of ECMAScript6 (AKA ES6
or ECMAScript 2015; [see here](http://es6-features.org) for a nice list of
ES6 features).

While the source module is written in ES6, the distribution module is
compiled by babel to work with any reasonably recent browsers.

The API docs in javascript source files are written within the ES6 framework.
Therefore, some of the ES6 terms/features that are compiled away by babel
will not apply if the library is used in pre-ES6 environment.
