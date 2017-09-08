# Javascript library for mcbkt client

The `mcbkt-client` module can be used by clients of the MCBKT engine of UKDE
by Physics Front.  Or, it can be used as a lightweight ajax library.

The javascript module `mcbkt-client` can be found in folder `src`.

This library is written in ES6 (ECMAScript6 or ECMAScript 2015; [see
here](http://es6-features.org)).

The distribution version of the module is found in folder `dist`.

* `dist/mcbkt-client.js`: ES6 module
* `dist/mcbkt-client_compiled_umd.js`: Compiled as a UMD module.  The
  compilation is through `babel`.  This module includes `babel-polyfill`.
* `dist/mcbkt-client_compiled_umd_nobp.js`: Compiled as a UMD module but
  without `babel-polyfill`.

The documentation can be found in folder `doc`.  The API docs are written
in the ES6 style and some parts will not be applicable for pre-ES6
javascript environment.

# Installation

At the top directory of this repo, run the following two commands to build
both development (`dev`) and distribution (`dist`) libraries.

```
npm install
make
```

Run the following to run unit testing (karma test suite).

```
make test
```

In order for the make command to work, `bash` (as `/bin/bash`) and GNU `make`
are required.  If these are not installed in your system, one way could be
that you would want/need to look inside of `GNUmakefile`, extract desired
commands, and run them by hand.
